// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(req: Request) {
  const body = await req.json();
  const userMessage = body.message;

  const client = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  try {
    const completion = await client.chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    return NextResponse.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Groq error:', error);
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 });
  }
}
