import { NextResponse } from 'next/server';

const NOTIFY_TO = process.env.LEADS_NOTIFY_EMAIL || 'truvenix@gmail.com';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const {
      haulierName,
      dispatchPhone,
      basePostcode,
      vehicleTypes,
      preferredLanes,
    } = payload;

    if (!haulierName || !dispatchPhone || !basePostcode || !vehicleTypes) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error(
        '[carrier-registration] RESEND_API_KEY not configured, submission was NOT emailed:',
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
        from: process.env.LEADS_FROM_EMAIL || 'Truvenix Carrier Network <onboarding@resend.dev>',
        to: NOTIFY_TO,
        subject: `Haulier registration: ${haulierName}`,
        text: [
          `Haulier / company: ${haulierName}`,
          `Dispatch phone: ${dispatchPhone}`,
          `Base postcode: ${basePostcode}`,
          `Vehicle types: ${vehicleTypes}`,
          `Preferred lanes: ${preferredLanes || 'n/a'}`,
        ].join('\n'),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[carrier-registration] Resend API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to send notification email' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error('[carrier-registration] Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
