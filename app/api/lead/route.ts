import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const NOTIFY_TO = 'hello@getmarketingbull.com';

export async function POST(request: Request) {
  const formData = await request.formData();
  const field = (name: string) => String(formData.get(name) ?? '').trim();

  const address = field('address');
  const honeypot = field('company');

  // PII stays out of the redirect URL (and therefore out of logs/history).
  const thankYou = () => NextResponse.redirect(new URL('/thank-you', request.url), 303);

  // Bots that fill the hidden field get a fake success and no forwarding.
  if (honeypot) return thankYou();

  const phone = field('phone');
  const email = field('email');
  const city = field('city');
  const state = field('state');
  const zip = field('zip');
  const pageUrl = request.headers.get('referer') ?? '';
  const submittedAt = new Date().toISOString();

  const leadData = {
    source: 'cash4homefl.com lead form',
    page_url: pageUrl,
    full_address: address,
    address1: field('address1') || address,
    city,
    state,
    postal_code: zip,
    phone,
    email,
    latitude: field('lat'),
    longitude: field('lng'),
    place_id: field('place_id'),
    submitted_at: submittedAt,
  };

  // ── Resend email notification ──────────────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);
    const locationLine = [city, state, zip].filter(Boolean).join(', ');
    try {
      await resend.emails.send({
        from: 'Cash4HomeFL Leads <leads@cash4homefl.com>',
        to: NOTIFY_TO,
        subject: `New lead: ${address || '(no address)'}`,
        html: `
<h2 style="margin:0 0 16px;font-family:sans-serif">New Cash4HomeFL Lead</h2>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:15px;width:100%;max-width:560px">
  <tr><td style="padding:8px 12px;font-weight:600;background:#f1f5f9;width:130px">Address</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${address || '—'}</td></tr>
  ${locationLine ? `<tr><td style="padding:8px 12px;font-weight:600;background:#f1f5f9">City / ZIP</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${locationLine}</td></tr>` : ''}
  <tr><td style="padding:8px 12px;font-weight:600;background:#f1f5f9">Phone</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${phone ? `<a href="tel:${phone}">${phone}</a>` : '—'}</td></tr>
  <tr><td style="padding:8px 12px;font-weight:600;background:#f1f5f9">Email</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${email ? `<a href="mailto:${email}">${email}</a>` : '—'}</td></tr>
  <tr><td style="padding:8px 12px;font-weight:600;background:#f1f5f9">Source page</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${pageUrl || '—'}</td></tr>
  <tr><td style="padding:8px 12px;font-weight:600;background:#f1f5f9">Submitted</td><td style="padding:8px 12px">${submittedAt}</td></tr>
</table>
        `.trim(),
      });
    } catch (err) {
      console.error('Resend email failed:', err);
    }
  } else {
    console.warn('RESEND_API_KEY is not set — lead email not sent', { address });
  }

  // ── GoHighLevel webhook (optional) ────────────────────────────────────────
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) {
        console.error(`GHL webhook responded ${res.status}`, await res.text());
      }
    } catch (err) {
      console.error('GHL webhook delivery failed', err);
    }
  }

  return thankYou();
}
