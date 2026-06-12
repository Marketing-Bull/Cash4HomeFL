import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const field = (name: string) => String(formData.get(name) ?? '').trim();

  const address = field('address');
  const honeypot = field('company');

  // PII stays out of the redirect URL (and therefore out of logs/history).
  const thankYou = () => NextResponse.redirect(new URL('/thank-you', request.url), 303);

  // Bots that fill the hidden field get a fake success and no forwarding.
  if (honeypot) return thankYou();

  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('GHL_WEBHOOK_URL is not set — lead received but NOT forwarded', { address });
    return thankYou();
  }

  // Field names follow GoHighLevel inbound-webhook contact conventions.
  const payload = {
    source: 'cash4homefl.com lead form',
    page_url: request.headers.get('referer') ?? '',
    full_address: address,
    address1: field('address1') || address,
    city: field('city'),
    state: field('state'),
    postal_code: field('zip'),
    phone: field('phone'),
    email: field('email'),
    latitude: field('lat'),
    longitude: field('lng'),
    place_id: field('place_id'),
    submitted_at: new Date().toISOString(),
  };

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error(`GHL webhook responded ${res.status}`, await res.text());
    }
  } catch (err) {
    console.error('GHL webhook delivery failed', err);
  }

  return thankYou();
}
