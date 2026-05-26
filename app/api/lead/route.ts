import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const address = String(formData.get('address') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();

  const url = new URL('/thank-you', request.url);
  if (address) url.searchParams.set('address', address);
  if (phone) url.searchParams.set('phone', phone);
  if (email) url.searchParams.set('email', email);

  return NextResponse.redirect(url, 303);
}
