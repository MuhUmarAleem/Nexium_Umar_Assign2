import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { extract } from '@extractus/article-extractor';
import { createClient } from '@supabase/supabase-js';

const mongoClient = new MongoClient(process.env.MONGODB_URI!);
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
const dbName = 'blogs';

// Scrape content from blog
async function extractTextFromURL(url: string): Promise<string> {
  const result = await extract(url);
  if (!result?.content) throw new Error("Could not extract article.");
  return result.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

// Call Groq chat endpoint
async function getGroqResponse(message: string, baseUrl: string): Promise<string> {
  const res = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  return data.response;
}

export async function POST(req: NextRequest) {
  const { url, lang } = await req.json();
  const baseUrl = req.nextUrl.origin;

  if (!url || !lang) {
    return NextResponse.json({ error: "Missing URL or language" }, { status: 400 });
  }

  try {
    // 1. Scrape full blog text
    const fullText = await extractTextFromURL(url);

    // 2. Generate English summary
    const englishSummary = await getGroqResponse(
      `Summarize the following blog content:\n\n${fullText}`,
      baseUrl
    );

    // 3. Translate only if lang is Urdu
    let finalSummary: string;
    if (lang === "urdu") {
      finalSummary = await getGroqResponse(
        `Translate the following summary to Urdu:\n\n${englishSummary}`,
        baseUrl
      );
    } else {
      finalSummary = englishSummary;
    }

    // 4. Save full blog text in MongoDB
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    await db.collection("fulltexts").insertOne({ url, text: fullText });

    // 5. Save summary in Supabase
    await supabase.from("summaries").insert([
      { time: new Date().toISOString(), text: finalSummary }
    ]);

    // 6. Return selected summary only
    return NextResponse.json({ summary: finalSummary });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
