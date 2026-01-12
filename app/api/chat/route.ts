import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an AI assistant for a freight forwarding company. Your role is to help customers understand freight forwarding services and processes.

YOU MUST:
- Answer general questions about freight forwarding
- Explain services offered by freight forwarding companies
- Educate users on shipping concepts (FCL, LCL, customs, incoterms, etc.)
- Explain processes at a high level
- Be friendly, professional, and helpful

YOU MUST NOT:
- Provide specific quotes or pricing information
- Commit to timelines, guarantees, or specific promises
- Claim to have real-time tracking capabilities
- Pretend to be human
- Book shipments or make reservations

If users ask for pricing, quotes, or want to book a shipment, politely inform them to contact the company directly via WhatsApp or phone for personalized assistance.

Keep responses concise and conversational, as this is a chat interface.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // Call Gemini API using Vercel AI Gateway
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY || '',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: SYSTEM_PROMPT }],
            },
            ...messages.map((msg: { role: string; content: string }) => ({
              role: msg.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: msg.content }],
            })),
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();

    const candidate = data?.candidates?.[0];
    const aiMessage = candidate?.content?.parts?.find(
      (p: any) => typeof p.text === 'string'
    )?.text;

    if (!aiMessage) {
      console.error('Invalid Gemini response:', JSON.stringify(data, null, 2));
      return NextResponse.json(
        { error: 'AI returned no usable response' },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error('[v0] Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
