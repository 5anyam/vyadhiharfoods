const API_BASE = "https://cms.vyadhiharfoods.com/wp-json/wc/v3";
const CONSUMER_KEY = process.env.CONSUMER_KEY || "ck_88a2cfa5c504df33b4c4448fae557a339f26d3d4";
const CONSUMER_SECRET = process.env.CONSUMER_SECRET || "cs_0cb1dbdb63e2e75eb8053a72822470d8341f82ba";


export interface WCImage {
  id?: number;
  src: string;
  alt?: string;
}

export interface WCCategoryRef {
  id: number;
  name: string;
  slug?: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  description?: string;
  short_description?: string;
  images?: WCImage[];
  attributes?: { option: string }[];
  categories?: WCCategoryRef[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: WCImage | null;
  menu_order: number;
  count: number;
  _links: {
    self: Array<{ href: string }>;
    collection: Array<{ href: string }>;
  };
}

export interface Review {
  id: number;
  date_created: string;
  date_created_gmt: string;
  product_id: number;
  status: string;
  reviewer: string;
  reviewer_email: string;
  review: string;
  rating: number;
  verified: boolean;
  reviewer_avatar_urls: Record<string, string>;
  _links: {
    self: Array<{ href: string }>;
    collection: Array<{ href: string }>;
    up: Array<{ href: string }>;
  };
}

export type ReviewStatus = 'approved' | 'hold' | 'all' | 'spam' | 'unspam' | 'trash' | 'untrash';

export interface ReviewPayload {
  product_id: number;
  review: string;
  reviewer: string;
  reviewer_email?: string;
  rating: number;
  status?: Exclude<ReviewStatus, 'all'>;
}

export interface LineItem {
  product_id: number;
  quantity: number;
  name?: string;
  price?: string;
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'cancelled'
  | 'on-hold'
  | 'refunded'
  | 'failed';

export interface OrderPayload {
  lineItems: LineItem[];
  shipping_address: {
    name: string;
    address_1: string;
    city?: string;
    state?: string;
    postcode?: string;
    email?: string;
    phone?: string;
  };
  billing_address?: {
    name: string;
    address_1: string;
    city?: string;
    state?: string;
    postcode?: string;
    email?: string;
    phone?: string;
  };
  customer: { name: string; email: string };
  payment_id?: string;
  payment_method?: string;
  payment_method_title?: string;
  status?: OrderStatus;
  notes?: string;
  fee_lines?: Array<{ name: string; amount: string }>;
  coupon_discount?: number;
  applied_coupon?: string;
}


/* Utils */
const qs = (params: Record<string, string | number | boolean | undefined>): string =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');

const authParams = {
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
};

const isArray = <T,>(v: unknown): v is T[] => Array.isArray(v);

/* Category helpers */
const comboMatchers = [/combo/i, /duo/i, /set/i, /bundle/i];

export const looksLikeCombo = (p: Product): boolean => {
  const cats = p.categories ?? [];
  const catHit = cats.some((c) => comboMatchers.some((rx) => rx.test(`${c.name} ${c.slug ?? ''}`)));
  const nameHit = comboMatchers.some((rx) => rx.test(p.name));
  return catHit || nameHit;
};

export async function resolveCategoryBySlug(slug: string): Promise<Category | null> {
  const url = `${API_BASE}/products/categories?${qs({
    ...authParams,
    slug,
    per_page: 100,
    hide_empty: false,
  })}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data: unknown = await res.json();
  if (!isArray<Category>(data)) return null;
  return data[0] ?? null;
}

export async function resolveFirstComboCategoryId(): Promise<number | null> {
  for (const candidate of ['combo', 'combos', 'combo-perfumes', 'duo', 'set', 'bundle']) {
    // eslint-disable-next-line no-await-in-loop
    const cat = await resolveCategoryBySlug(candidate);
    if (cat?.id) return cat.id;
  }
  return null;
}

/* Products */
export async function fetchProducts(
  page = 1,
  perPage = 100,
  search?: string,
  opts?: {
    categoryId?: number;
    excludeCategoryId?: number;
    order?: 'asc' | 'desc';
    orderby?: 'date' | 'title' | 'price' | 'popularity' | 'rating';
    status?: 'publish' | 'draft' | 'pending' | 'private';
  }
): Promise<Product[]> {
  const url = `${API_BASE}/products?${qs({
    ...authParams,
    per_page: perPage,
    page,
    search,
    order: opts?.order,
    orderby: opts?.orderby,
    status: opts?.status,
    category: opts?.categoryId,
  })}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  const data: unknown = await res.json();
  if (!isArray<Product>(data)) return [];

  const list = data;
  if (opts?.excludeCategoryId) {
    return list.filter(
      (p) => !(p.categories ?? []).some((c) => c.id === opts.excludeCategoryId)
    );
  }
  return list;
}

export async function fetchSignatureProducts(page = 1, perPage = 12): Promise<Product[]> {
  const comboId = await resolveFirstComboCategoryId().catch(() => null);
  const list = await fetchProducts(page, perPage, undefined, {
    excludeCategoryId: comboId ?? undefined,
    order: 'desc',
    orderby: 'date',
    status: 'publish',
  });
  return list.filter((p) => !looksLikeCombo(p));
}

export async function fetchComboProducts(page = 1, perPage = 12): Promise<Product[]> {
  const comboId = await resolveFirstComboCategoryId().catch(() => null);
  if (comboId) {
    return fetchProducts(page, perPage, undefined, {
      categoryId: comboId,
      order: 'desc',
      orderby: 'date',
      status: 'publish',
    });
  }
  // Fallback by name/category matching
  const list = await fetchProducts(page, perPage, undefined, {
    order: 'desc',
    orderby: 'date',
    status: 'publish',
  });
  return list.filter(looksLikeCombo);
}

export async function fetchProduct(id: string | number): Promise<Product> {
  const url = `${API_BASE}/products/${id}?${qs(authParams)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
  const data: unknown = await res.json();
  return data as Product;
}

/* Reviews */
export async function fetchProductReviews(
  productId: number,
  page = 1,
  perPage = 100,
  status: ReviewStatus = 'approved'
): Promise<Review[]> {
  const url = `${API_BASE}/products/reviews?${qs({
    ...authParams,
    product: productId,
    per_page: perPage,
    page,
    status,
  })}`;

  try {
    const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
    if (!res.ok) return [];
    const data: unknown = await res.json();
    return isArray<Review>(data) ? data : [];
  } catch {
    return [];
  }
}

export async function createProductReview(payload: ReviewPayload): Promise<Review> {
  const url = `${API_BASE}/products/reviews?${qs(authParams)}`;
  const body = {
    product_id: payload.product_id,
    review: payload.review,
    reviewer: payload.reviewer,
    reviewer_email: payload.reviewer_email ?? '',
    rating: payload.rating,
    status: payload.status ?? 'approved',
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(`Review creation failed: ${err?.message ?? res.statusText}`);
  }
  return (await res.json()) as Review;
}

export async function updateProductReview(
  _productId: number,
  reviewId: number,
  updates: Partial<ReviewPayload>
): Promise<Review> {
  const url = `${API_BASE}/products/reviews/${reviewId}?${qs(authParams)}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(`Review update failed: ${err?.message ?? res.statusText}`);
  }
  return (await res.json()) as Review;
}

export async function deleteProductReview(_productId: number, reviewId: number): Promise<Review> {
  const url = `${API_BASE}/products/reviews/${reviewId}?${qs({
    ...authParams,
    force: true,
  })}`;
  const res = await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } });
  if (!res.ok) {
    const err = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(`Review deletion failed: ${err?.message ?? res.statusText}`);
  }
  return (await res.json()) as Review;
}

export async function fetchAllReviews(
  page = 1,
  perPage = 100,
  status: ReviewStatus = 'approved'
): Promise<Review[]> {
  const url = `${API_BASE}/products/reviews?${qs({
    ...authParams,
    per_page: perPage,
    page,
    status,
  })}`;

  const res = await fetch(url);
  if (!res.ok) return [];
  const data: unknown = await res.json();
  return isArray<Review>(data) ? data : [];
}

/* Orders */
export async function createOrder(payload: OrderPayload): Promise<unknown> {
  const url = `${API_BASE}/orders?${qs(authParams)}`;

  const orderData = {
    payment_method: payload.payment_method ?? 'razorpay',
    payment_method_title: payload.payment_method_title ?? 'Razorpay',
    set_paid: false,
    status: payload.status ?? 'pending',
    billing: {
      first_name: payload.shipping_address.name,
      address_1: payload.shipping_address.address_1,
      city: payload.shipping_address.city ?? '',
      state: payload.shipping_address.state ?? '',
      postcode: payload.shipping_address.postcode ?? '',
      email: payload.shipping_address.email ?? payload.customer.email,
      phone: payload.shipping_address.phone ?? '',
      country: 'IN',
    },
    shipping: {
      first_name: payload.shipping_address.name,
      address_1: payload.shipping_address.address_1,
      city: payload.shipping_address.city ?? '',
      state: payload.shipping_address.state ?? '',
      postcode: payload.shipping_address.postcode ?? '',
      country: 'IN',
    },
    line_items: payload.lineItems.map((li) => ({
      product_id: li.product_id,
      quantity: li.quantity,
      name: li.name,
      price: li.price,
    })),
    fee_lines: payload.fee_lines ?? [],
    meta_data: [
      ...(payload.payment_id ? [{ key: 'razorpay_payment_id', value: payload.payment_id }] : []),
      ...(payload.applied_coupon
        ? [
            { key: 'coupon_code', value: payload.applied_coupon },
            { key: 'coupon_discount', value: payload.coupon_discount ?? 0 },
          ]
        : []),
      { key: 'shiprocket_address', value: payload.shipping_address.address_1 },
    ],
    customer_note: payload.notes ?? 'Order placed via site frontend',
    customer: { email: payload.customer.email },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(`Order creation failed: ${err?.message ?? res.statusText}`);
  }
  return res.json() as Promise<unknown>;
}

export async function updateOrderStatus(orderId: number, status: OrderStatus): Promise<unknown> {
  const url = `${API_BASE}/orders/${orderId}?${qs(authParams)}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const err = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(err?.message ?? 'Failed to update order status');
  }
  return res.json() as Promise<unknown>;
}

/* Categories */
export async function fetchProductCategories(perPage = 12, hideEmpty = true): Promise<Category[]> {
  const url = `${API_BASE}/products/categories?${qs({
    ...authParams,
    per_page: perPage,
    hide_empty: hideEmpty,
  })}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data: unknown = await res.json();
  return isArray<Category>(data) ? data : [];
}

export async function fetchSingleCategory(categoryId: number): Promise<Category> {
  const url = `${API_BASE}/products/categories/${categoryId}?${qs(authParams)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch category');
  const data: unknown = await res.json();
  return data as Category;
}

export async function fetchProductsByCategory(
  categoryId: number,
  page = 1,
  perPage = 12
): Promise<Product[]> {
  const url = `${API_BASE}/products?${qs({
    ...authParams,
    category: categoryId,
    per_page: perPage,
    page,
  })}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products by category');
  const data: unknown = await res.json();
  return isArray<Product>(data) ? data : [];
}
