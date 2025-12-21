"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../../lib/cart";
import { useAuth } from "../../../lib/auth-context";
import { toast } from "../../../hooks/use-toast";
import { useFacebookPixel } from "../../../hooks/useFacebookPixel";
import type { CartItem } from "../../../lib/facebook-pixel";
import Script from "next/script";
import { Truck, CreditCard, Banknote, Shield, CheckCircle2, User as UserIcon, LogIn } from "lucide-react";

const WOOCOMMERCE_CONFIG = {
  BASE_URL: 'https://cms.vyadhiharfoods.com',
  CONSUMER_KEY: 'ck_88a2cfa5c504df33b4c4448fae557a339f26d3d4',
  CONSUMER_SECRET: 'cs_0cb1dbdb63e2e75eb8053a72822470d8341f82ba',
};

const RAZORPAY_CONFIG = {
  KEY_ID: "rzp_live_RdcFqJgcF1fVQf",
  COMPANY_NAME: "Vyadhihar Foods",
  THEME_COLOR: "#D4A574"
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  notes: string;
}

interface WooCommerceOrder {
  id: number;
  order_key: string;
  status: string;
  total: string;
  payment_url?: string;
}

interface RazorpayHandlerResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayFailureResponse {
  error?: {
    description?: string;
    code?: string;
    metadata?: Record<string, string>;
  };
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: RazorpayHandlerResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  retry?: {
    enabled: boolean;
    max_count?: number;
  };
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { 
      open: () => void;
      on: (event: string, callback: (response: RazorpayFailureResponse) => void) => void;
    };
  }
}

const createWooCommerceOrder = async (orderData: Record<string, unknown>, userEmail?: string): Promise<WooCommerceOrder> => {
  const apiUrl = `${WOOCOMMERCE_CONFIG.BASE_URL}/wp-json/wc/v3/orders`;
  const auth = btoa(`${WOOCOMMERCE_CONFIG.CONSUMER_KEY}:${WOOCOMMERCE_CONFIG.CONSUMER_SECRET}`);

  if (userEmail) {
    try {
      const customerResponse = await fetch(
        `${WOOCOMMERCE_CONFIG.BASE_URL}/wp-json/wc/v3/customers?email=${userEmail}`,
        { headers: { 'Authorization': `Basic ${auth}` } }
      );
      const customers = await customerResponse.json();
      if (Array.isArray(customers) && customers.length > 0) {
        orderData.customer_id = customers[0].id;
      }
    } catch (error) {
      console.log('Customer linking skipped:', error);
    }
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      errorData = await response.text();
    }

    let errorMessage = `Order creation failed: ${response.status}`;
    if (response.status === 404) {
      errorMessage = 'WooCommerce API not found. Please contact support.';
    } else if (response.status === 401) {
      errorMessage = 'Authentication failed. Please contact support.';
    } else if (typeof errorData === 'object' && errorData && errorData !== null && 'message' in errorData) {
      const typedError = errorData as { message: string };
      errorMessage += ` - ${typedError.message}`;
    }

    throw new Error(errorMessage);
  }

  const order = await response.json();
  return order as WooCommerceOrder;
};

const updateWooCommerceOrderStatus = async (orderId: number, status: string, paymentData?: RazorpayHandlerResponse): Promise<WooCommerceOrder> => {
  const updateData: Record<string, unknown> = { status };

  if (paymentData) {
    updateData.meta_data = [
      { key: 'razorpay_payment_id', value: paymentData.razorpay_payment_id },
      { key: 'razorpay_order_id', value: paymentData.razorpay_order_id },
      { key: 'razorpay_signature', value: paymentData.razorpay_signature },
      { key: 'payment_method', value: 'razorpay' },
      { key: 'payment_captured_at', value: new Date().toISOString() },
    ];
  }

  const apiUrl = `${WOOCOMMERCE_CONFIG.BASE_URL}/wp-json/wc/v3/orders/${orderId}`;
  const auth = btoa(`${WOOCOMMERCE_CONFIG.CONSUMER_KEY}:${WOOCOMMERCE_CONFIG.CONSUMER_SECRET}`);

  const response = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`,
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update order: ${errorText}`);
  }

  const result = await response.json();
  return result as WooCommerceOrder;
};

export default function Checkout(): React.ReactElement {
  const { items, clear } = useCart();
  const router = useRouter();
  const { trackInitiateCheckout, trackAddPaymentInfo, trackPurchase } = useFacebookPixel();
  const { user } = useAuth();

  const total = items.reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0);
  const deliveryCharges = total >= 500 ? 0 : 50;

  const [couponCode, setCouponCode] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<string>("");
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");

  // ✅ ADDED - COD Charges
  const codCharges = paymentMethod === "cod" ? 50 : 0;

  const subtotalAfterCoupon = total - couponDiscount;
  // ✅ UPDATED - Include COD charges in final total
  const finalTotal = subtotalAfterCoupon + deliveryCharges + codCharges;

  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", whatsapp: "", address: "", 
    pincode: "", city: "", state: "", notes: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<"form" | "processing">("form");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
        city: user.city || prev.city,
        state: user.state || prev.state,
        pincode: user.pincode || prev.pincode,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (items.length > 0) {
      const cartItems: CartItem[] = items.map(item => ({
        id: item.id, 
        name: item.name, 
        price: parseFloat(item.price), 
        quantity: item.quantity
      }));
      trackInitiateCheckout(cartItems, finalTotal);
    }
  }, [items, finalTotal, trackInitiateCheckout]);

  const validateCoupon = (code: string): { valid: boolean; discount: number; message: string } => {
    const upperCode = code.toUpperCase().trim();
    if (upperCode === "FIRST30") {
      if (total >= 1000) {
        return { valid: true, discount: Math.round(total * 0.3), message: "30% discount applied" };
      } else {
        return { valid: false, discount: 0, message: "Minimum order ₹1000 required for FIRST30" };
      }
    }
    if (upperCode === "WELCOME100") {
      if (total >= 500) {
        return { valid: true, discount: 100, message: "Welcome discount applied" };
      } else {
        return { valid: false, discount: 0, message: "Minimum order ₹500 required for WELCOME100" };
      }
    }
    return { valid: false, discount: 0, message: "Invalid coupon code" };
  };

  const handleApplyCoupon = (): void => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }
    if (appliedCoupon === couponCode.toUpperCase()) {
      setCouponError("Coupon already applied");
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError("");

    setTimeout(() => {
      const validation = validateCoupon(couponCode);
      if (validation.valid) {
        setAppliedCoupon(couponCode.toUpperCase());
        setCouponDiscount(validation.discount);
        setCouponError("");
        toast({
          title: "Coupon Applied",
          description: `You saved ₹${validation.discount}`,
        });
      } else {
        setCouponError(validation.message);
        setAppliedCoupon("");
        setCouponDiscount(0);
      }
      setIsApplyingCoupon(false);
    }, 800);
  };

  const handleRemoveCoupon = (): void => {
    setAppliedCoupon("");
    setCouponDiscount(0);
    setCouponCode("");
    setCouponError("");
    toast({
      title: "Coupon Removed",
      description: "Coupon discount has been removed",
    });
  };

  function validateForm(): boolean {
    const newErrors: Partial<FormData> = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!form.whatsapp.trim()) newErrors.whatsapp = "WhatsApp number is required";
    if (!/^[0-9]{10}$/.test(form.whatsapp)) {
      newErrors.whatsapp = "Please enter a valid 10-digit WhatsApp number";
    }
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!/^[0-9]{6}$/.test(form.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";

    const isValid = Object.keys(newErrors).length === 0;

    if (isValid && items.length > 0) {
      const cartItems: CartItem[] = items.map(item => ({
        id: item.id, 
        name: item.name, 
        price: parseFloat(item.price), 
        quantity: item.quantity
      }));
      trackAddPaymentInfo(cartItems, finalTotal);
    }

    setErrors(newErrors);
    return isValid;
  }

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }

  function copyPhoneToWhatsApp(): void {
    if (form.phone) {
      setForm(f => ({ ...f, whatsapp: form.phone }));
      if (errors.whatsapp) {
        setErrors(prev => ({ ...prev, whatsapp: undefined }));
      }
    }
  }

  const handlePaymentSuccess = async (wooOrder: WooCommerceOrder, response: RazorpayHandlerResponse): Promise<void> => {
    try {
      await updateWooCommerceOrderStatus(wooOrder.id, 'processing', response);

      const orderItems: CartItem[] = items.map(item => ({
        id: item.id, 
        name: item.name, 
        price: parseFloat(item.price), 
        quantity: item.quantity
      }));
      trackPurchase(orderItems, finalTotal, response.razorpay_payment_id);

      clear();

      toast({
        title: "Payment Successful",
        description: `Order #${wooOrder.id} confirmed. You'll receive updates via WhatsApp.`,
      });

      router.push(`/order-confirmation?orderId=${response.razorpay_payment_id}&wcOrderId=${wooOrder.id}`);

    } catch {
      toast({
        title: "Payment Completed",
        description: "Your payment was successful. We'll contact you soon.",
      });
    } finally {
      setLoading(false);
      setStep("form");
    }
  };

  const handlePaymentFailure = async (wooOrder: WooCommerceOrder | null, response: RazorpayFailureResponse): Promise<void> => {
    if (wooOrder?.id) {
      try {
        await updateWooCommerceOrderStatus(wooOrder.id, 'failed');
      } catch {
        // Silently handle error
      }
    }

    toast({
      title: "Payment Failed",
      description: response?.error?.description || "Payment was not successful. Please try again.",
      variant: "destructive",
    });

    setLoading(false);
    setStep("form");
  };

  const handlePaymentDismiss = async (wooOrder: WooCommerceOrder | null): Promise<void> => {
    if (wooOrder?.id) {
      try {
        await updateWooCommerceOrderStatus(wooOrder.id, 'cancelled');
      } catch {
        // Silently handle error
      }
    }

    toast({
      title: "Payment Cancelled",
      description: "You cancelled the payment process",
      variant: "destructive",
    });

    setLoading(false);
    setStep("form");
  };

  async function handleCheckout(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
  
    let wooOrder: WooCommerceOrder | null = null;
  
    try {
      if (!validateForm()) {
        toast({
          title: "Please fix the errors",
          description: "Check all required fields",
          variant: "destructive",
        });
        return;
      }
  
      if (paymentMethod === "online") {
        if (typeof window === 'undefined' || !window.Razorpay) {
          toast({
            title: "Payment System Loading",
            description: "Please wait for payment system to load",
            variant: "destructive",
          });
          return;
        }
      }
  
      setLoading(true);
      setStep("processing");
  
      const fullAddress = `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`;
  
      const orderData = {
        payment_method: paymentMethod === "cod" ? 'cod' : 'razorpay',
        payment_method_title: paymentMethod === "cod" ? 'Cash on Delivery' : 'Online Payment (Razorpay)',
        status: paymentMethod === "cod" ? 'processing' : 'pending',
        billing: {
          first_name: form.name,
          last_name: '',
          address_1: form.address,
          address_2: '',
          city: form.city,
          state: form.state,
          postcode: form.pincode,
          country: 'IN',
          email: form.email,
          phone: form.phone,
        },
        shipping: {
          first_name: form.name,
          last_name: '',
          address_1: form.address,
          address_2: '',
          city: form.city,
          state: form.state,
          postcode: form.pincode,
          country: 'IN',
        },
        line_items: items.map((item) => ({
          product_id: parseInt(String(item.id), 10),
          quantity: item.quantity,
        })),
        shipping_lines: deliveryCharges > 0 ? [{
          method_id: 'flat_rate',
          method_title: 'Standard Delivery (4-6 Days)',
          total: deliveryCharges.toString(),
        }] : [],
        // ✅ ADDED - COD charges as fee line
        fee_lines: codCharges > 0 ? [{
          name: 'COD Charges',
          total: codCharges.toString(),
          tax_status: 'none',
        }] : [],
        coupon_lines: appliedCoupon ? [{
          code: appliedCoupon.toLowerCase(),
          discount: couponDiscount.toString(),
        }] : [],
        customer_note: form.notes + (form.notes ? '\n\n' : '') + 
          `WhatsApp: ${form.whatsapp}\n` +
          `Full Address: ${fullAddress}\n` +
          `Payment Method: ${paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}` +
          (appliedCoupon ? `\nCoupon Applied: ${appliedCoupon} (₹${couponDiscount} discount)` : ''),
        meta_data: [
          { key: 'whatsapp_number', value: form.whatsapp },
          { key: 'full_address', value: fullAddress },
          { key: 'original_subtotal', value: total.toString() },
          { key: 'delivery_charges', value: deliveryCharges.toString() },
          // ✅ ADDED - COD charges in metadata
          { key: 'cod_charges', value: codCharges.toString() },
          { key: 'final_total', value: finalTotal.toString() },
          { key: 'payment_type', value: paymentMethod },
          ...(appliedCoupon ? [
            { key: 'coupon_code', value: appliedCoupon },
            { key: 'coupon_discount', value: couponDiscount.toString() }
          ] : []),
        ],
      };
  
      wooOrder = await createWooCommerceOrder(orderData, user?.email);
  
      if (paymentMethod === "cod") {
        const orderItems: CartItem[] = items.map(item => ({
          id: item.id, 
          name: item.name, 
          price: parseFloat(item.price), 
          quantity: item.quantity
        }));
        trackPurchase(orderItems, finalTotal, `COD-${wooOrder.id}`);
  
        clear();
  
        toast({
          title: "Order Placed Successfully",
          description: `Order #${wooOrder.id} confirmed. Pay on delivery. You'll receive updates via WhatsApp.`,
        });
  
        router.push(`/order-confirmation?orderId=COD-${wooOrder.id}&wcOrderId=${wooOrder.id}&method=cod`);
        setLoading(false);
        setStep("form");
        return;
      }
  
      if (typeof window !== 'undefined' && window.Razorpay) {
        const razorpayOptions: RazorpayOptions = {
          key: RAZORPAY_CONFIG.KEY_ID,
          amount: Math.round(finalTotal * 100),
          currency: "INR",
          name: RAZORPAY_CONFIG.COMPANY_NAME,
          description: `Order #${wooOrder.id}`,
          handler: (response: RazorpayHandlerResponse) => {
            handlePaymentSuccess(wooOrder!, response);
          },
          modal: {
            ondismiss: () => {
              handlePaymentDismiss(wooOrder);
            },
          },
          prefill: { 
            name: form.name, 
            email: form.email, 
            contact: form.phone 
          },
          theme: { 
            color: RAZORPAY_CONFIG.THEME_COLOR 
          },
          retry: {
            enabled: true,
            max_count: 3
          }
        };
  
        const rzp = new window.Razorpay(razorpayOptions);
  
        rzp.on('payment.failed', (response: RazorpayFailureResponse) => {
          handlePaymentFailure(wooOrder, response);
        });
  
        rzp.open();
        setLoading(false);
      } else {
        throw new Error("Payment system not loaded");
      }
  
    } catch (err) {
      if (wooOrder?.id) {
        try {
          await updateWooCommerceOrderStatus(wooOrder.id, 'cancelled');
        } catch {
          // Silently handle cancellation error
        }
      }
  
      toast({
        title: "Checkout Failed",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
      setLoading(false);
      setStep("form");
    }
  }
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8DC] to-white">
        <div className="max-w-lg mx-auto text-center py-24 px-4">
          <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-12 shadow-xl">
            <div className="w-20 h-20 bg-gradient-to-br from-[#D4A574] to-[#C19A6B] rounded-full flex items-center justify-center mx-auto mb-6">
              <Banknote className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#5D4E37] mb-3">Your Cart is Empty</h2>
            <p className="text-gray-600 text-sm mb-8">Add some healthy items to get started</p>
            <button
              onClick={() => router.push("/")}
              className="inline-block px-8 py-3 text-sm text-white bg-gradient-to-r from-[#D4A574] to-[#C19A6B] hover:from-[#C19A6B] hover:to-[#8B7355] transition-all rounded-full font-semibold shadow-lg"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
        onError={() => {
          toast({
            title: "Payment System Error",
            description: "Failed to load payment system. Please refresh the page.",
            variant: "destructive",
          });
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#FFF8DC] via-white to-[#F5DEB3]/20 pb-10">
        <div className="max-w-4xl mx-auto py-12 px-4">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#8B7355] via-[#5D4E37] to-[#8B7355] bg-clip-text text-transparent mb-3">
              Secure Checkout
            </h1>
            <p className="text-gray-600">Complete your order in a few simple steps</p>
          </div>

          {/* User Status Banner */}
          {user ? (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Logged in as {user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/my-account')}
                  className="px-4 py-2 text-sm bg-white border-2 border-green-300 text-green-700 rounded-lg font-semibold hover:bg-green-50 transition-all"
                >
                  My Account
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg">
                    <LogIn className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Login to track your orders</p>
                    <p className="text-xs text-gray-600">Save time with saved addresses</p>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/login')}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white rounded-lg font-semibold hover:from-[#C19A6B] hover:to-[#8B7355] transition-all shadow-lg"
                >
                  Login
                </button>
              </div>
            </div>
          )}

          {/* Delivery Info Banner */}
          <div className="bg-gradient-to-r from-[#D4A574]/10 to-[#C19A6B]/10 border-2 border-[#D4A574]/30 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#D4A574] to-[#C19A6B] rounded-full shadow-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#5D4E37]">Fast Delivery</p>
                <p className="text-xs text-gray-600">Delivered in 4-6 Business Days</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              
              {/* Order Summary Mobile */}
              <div className="lg:hidden bg-white border-2 border-[#D4A574]/30 rounded-2xl p-6 mb-6 shadow-lg">
                <h2 className="text-lg font-bold text-[#5D4E37] mb-4">Order Summary</h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <span className="font-medium text-sm text-gray-900">{item.name}</span>
                        <span className="text-gray-500 text-xs ml-2">×{item.quantity}</span>
                      </div>
                      <span className="font-semibold text-sm text-[#5D4E37]">₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  {/* ✅ ADDED - Charges breakdown in mobile view */}
                  <div className="space-y-2 pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">₹{total.toFixed(2)}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">Coupon Discount</span>
                        <span className="font-medium text-green-600">-₹{couponDiscount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Charges</span>
                      <span className="font-medium text-gray-900">
                        {deliveryCharges === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `₹${deliveryCharges.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    {/* ✅ ADDED - COD Charges Line (Mobile) */}
                    {paymentMethod === "cod" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">COD Charges</span>
                        <span className="font-medium text-gray-900">₹{codCharges.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t-2 border-[#D4A574]/30">
                    <span className="text-base font-bold text-[#5D4E37]">Total</span>
                    <span className="text-lg font-bold text-[#5D4E37]">₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-6 mb-6 shadow-lg">
                <h2 className="text-lg font-bold text-[#5D4E37] mb-4">Payment Method</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("online")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "online"
                        ? "border-[#D4A574] bg-gradient-to-br from-[#D4A574]/10 to-[#C19A6B]/10 shadow-lg"
                        : "border-gray-200 hover:border-[#D4A574]/50"
                    }`}
                  >
                    <CreditCard className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === "online" ? "text-[#D4A574]" : "text-gray-400"}`} />
                    <p className={`text-sm font-semibold ${paymentMethod === "online" ? "text-[#5D4E37]" : "text-gray-600"}`}>
                      Online Payment
                    </p>
                    <p className="text-xs text-gray-500 mt-1">UPI, Card, NetBanking</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "cod"
                        ? "border-[#D4A574] bg-gradient-to-br from-[#D4A574]/10 to-[#C19A6B]/10 shadow-lg"
                        : "border-gray-200 hover:border-[#D4A574]/50"
                    }`}
                  >
                    <Banknote className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === "cod" ? "text-[#D4A574]" : "text-gray-400"}`} />
                    <p className={`text-sm font-semibold ${paymentMethod === "cod" ? "text-[#5D4E37]" : "text-gray-600"}`}>
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Pay when you receive + ₹50</p>
                  </button>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-6 mb-6 shadow-lg">
                <h2 className="text-lg font-bold text-[#5D4E37] mb-4">Have a Coupon?</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponError("");
                      }}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#D4A574] focus:outline-none transition-colors text-sm !text-black font-medium placeholder:text-gray-500"
                      disabled={!!appliedCoupon}
                    />
                    {couponError && (
                      <p className="text-red-500 text-xs mt-1">{couponError}</p>
                    )}
                    {appliedCoupon && (
                      <p className="text-green-600 text-xs mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Coupon {appliedCoupon} applied
                      </p>
                    )}
                  </div>
                  <button
                    onClick={appliedCoupon ? handleRemoveCoupon : handleApplyCoupon}
                    disabled={isApplyingCoupon}
                    className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all ${
                      appliedCoupon
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        : 'bg-gradient-to-r from-[#D4A574] to-[#C19A6B] hover:from-[#C19A6B] hover:to-[#8B7355] text-white shadow-lg'
                    } ${isApplyingCoupon ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    {isApplyingCoupon ? 'Applying...' : appliedCoupon ? 'Remove' : 'Apply'}
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleCheckout} className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-6 shadow-lg">
                <h2 className="text-lg font-bold text-[#5D4E37] mb-6">Delivery Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      name="name"
                      required
                      className={`w-full p-3 border-2 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none ${
                        errors.name 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-[#D4A574]'
                      }`}
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={onChange}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className={`w-full p-3 border-2 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-[#D4A574]'
                      }`}
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={onChange}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input
                      name="phone"
                      type="tel"
                      pattern="[0-9]{10}"
                      required
                      className={`w-full p-3 border-2 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none ${
                        errors.phone 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-[#D4A574]'
                      }`}
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      onChange={onChange}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      WhatsApp Number * 
                      <button
                        type="button"
                        onClick={copyPhoneToWhatsApp}
                        className="ml-2 text-xs bg-[#D4A574] text-white px-3 py-1 rounded-full hover:bg-[#C19A6B] transition-colors"
                      >
                        Same as phone
                      </button>
                    </label>
                    <input
                      name="whatsapp"
                      type="tel"
                      pattern="[0-9]{10}"
                      required
                      className={`w-full p-3 border-2 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none ${
                        errors.whatsapp 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-[#D4A574]'
                      }`}
                      placeholder="WhatsApp number"
                      value={form.whatsapp}
                      onChange={onChange}
                    />
                    {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Complete Address *</label>
                  <textarea
                    name="address"
                    rows={3}
                    required
                    className={`w-full p-3 border-2 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none resize-none ${
                      errors.address 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-[#D4A574]'
                    }`}
                    placeholder="House/Flat No., Street, Area, Landmark"
                    value={form.address}
                    onChange={onChange}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode *</label>
                    <input
                      name="pincode"
                      type="text"
                      pattern="[0-9]{6}"
                      required
                      className={`w-full p-3 border-2 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none ${
                        errors.pincode 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-[#D4A574]'
                      }`}
                      placeholder="6-digit pincode"
                      value={form.pincode}
                      onChange={onChange}
                    />
                    {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                    <input
                      name="city"
                      required
                      className={`w-full p-3 border-2 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none ${
                        errors.city 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-[#D4A574]'
                      }`}
                      placeholder="City"
                      value={form.city}
                      onChange={onChange}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                    <select
                      name="state"
                      required
                      className={`w-full p-3 border-2 rounded-lg text-sm text-gray-900 transition-colors focus:outline-none ${
                        errors.state 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-[#D4A574]'
                      }`}
                      value={form.state}
                      onChange={onChange}
                    >
                      <option value="" className="text-gray-400">Select State</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Assam">Assam</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                      <option value="Goa">Goa</option>
                    </select>
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Order Notes (Optional)</label>
                  <textarea
                    name="notes"
                    rows={2}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-[#D4A574] focus:outline-none transition-colors text-sm text-gray-900 placeholder:text-gray-400 resize-none"
                    placeholder="Any special instructions for your order"
                    value={form.notes}
                    onChange={onChange}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full bg-gradient-to-r from-[#D4A574] to-[#C19A6B] hover:from-[#C19A6B] hover:to-[#8B7355] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl ${
                    loading || step === "processing" || (paymentMethod === "online" && !razorpayLoaded)
                      ? "opacity-60 pointer-events-none" 
                      : ""
                  }`}
                  disabled={loading || step === "processing" || (paymentMethod === "online" && !razorpayLoaded)}
                >
                  {loading || step === "processing" ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Order...
                    </div>
                  ) : paymentMethod === "online" && !razorpayLoaded ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Loading Payment...
                    </div>
                  ) : paymentMethod === "cod" ? (
                    `Place Order - ₹${finalTotal.toFixed(2)} (Pay on Delivery)`
                  ) : (
                    `Pay ₹${finalTotal.toFixed(2)} Securely`
                  )}
                </button>

                {step === "processing" && (
                  <div className="text-center text-gray-600 text-sm mt-3">
                    {paymentMethod === "cod" ? "Creating your order..." : "Processing payment..."}
                  </div>
                )}
              </form>

              {/* Trust Signals */}
              <div className="mt-6 flex items-center justify-center gap-6 text-gray-600 text-xs">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-[#D4A574]" />
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A574]" />
                  <span>Encrypted Payment</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-[#D4A574]" />
                  <span>4-6 Days Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary (Desktop) */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-6 shadow-xl">
                  <h2 className="text-lg font-bold text-[#5D4E37] mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900 leading-tight mb-1">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{parseFloat(item.price).toFixed(2)}</p>
                        </div>
                        <span className="font-semibold text-sm text-[#5D4E37] ml-2">
                          ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 py-3 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">₹{total.toFixed(2)}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">Coupon Discount</span>
                        <span className="font-medium text-green-600">-₹{couponDiscount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Charges</span>
                      <span className="font-medium text-gray-900">
                        {deliveryCharges === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `₹${deliveryCharges.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    {/* ✅ ADDED - COD Charges Line (Desktop) */}
                    {paymentMethod === "cod" && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">COD Charges</span>
                        <span className="font-medium text-gray-900">₹{codCharges.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t-2 border-[#D4A574]/30">
                    <span className="text-base font-bold text-[#5D4E37]">Total Amount</span>
                    <span className="text-2xl font-bold text-[#D4A574]">₹{finalTotal.toFixed(2)}</span>
                  </div>

                  {deliveryCharges === 0 && (
                    <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-xs text-green-700 text-center font-medium">
                        🎉 You have got FREE delivery!
                      </p>
                    </div>
                  )}

                  {deliveryCharges > 0 && (
                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-blue-700 text-center">
                        Add ₹{(500 - total).toFixed(2)} more for FREE delivery
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
