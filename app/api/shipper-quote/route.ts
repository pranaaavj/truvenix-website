import { NextResponse } from 'next/server';

const NOTIFY_TO = process.env.LEADS_NOTIFY_EMAIL || 'ops@truvenix.co.uk';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const {
      companyName,
      contact,
      originPostcode,
      destinationPostcode,
      cargoDetails,
    } = payload;

    if (!companyName || !contact || !originPostcode || !destinationPostcode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error(
        '[shipper-quote] RESEND_API_KEY not configured — submission was NOT emailed:',
        payload
      );
      return NextResponse.json({ ok: true, delivered: false });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.LEADS_FROM_EMAIL || 'Truvenix Rate Requests <onboarding@resend.dev>',
        to: NOTIFY_TO,
        reply_to: contact,
        subject: `Lane quote request — ${companyName}`,
        text: [
          `Company: ${companyName}`,
          `Contact: ${contact}`,
          `Origin postcode: ${originPostcode}`,
          `Destination postcode: ${destinationPostcode}`,
          `Cargo details: ${cargoDetails || 'n/a'}`,
        ].join('\n'),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[shipper-quote] Resend API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to send notification email' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error('[shipper-quote] Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
