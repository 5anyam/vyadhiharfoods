import { NextRequest, NextResponse } from 'next/server';

const BASE = process.env.WC_API_BASE      || 'https://cms.vyadhiharfoods.com/wp-json/wc/v3';
const CK   = process.env.WC_CONSUMER_KEY  || 'ck_88a2cfa5c504df33b4c4448fae557a339f26d3d4';
const CS   = process.env.WC_CONSUMER_SECRET || 'cs_0cb1dbdb63e2e75eb8053a72822470d8341f82ba';
const AUTH = `consumer_key=${CK}&consumer_secret=${CS}`;

export async function GET(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get('product_id');
  if (!productId) return NextResponse.json([], { status: 400 });

  const url = `${BASE}/products/reviews?product=${productId}&${AUTH}&per_page=100&status=approved`;
  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const url  = `${BASE}/products/reviews?${AUTH}`;

  const res = await fetch(url, {
    method : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
