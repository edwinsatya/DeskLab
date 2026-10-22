import { PRODUCTS } from "@/constants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, setup = [], rentalMonths } = await req.json();

    if (!process.env.OPENROUTER_API_KEY || !process.env.OPENROUTER_BASE_URL) {
      return NextResponse.json({ error: "AI assistant is not configured" }, { status: 503 });
    }

    // Create a catalog string for the system prompt
    const catalog = PRODUCTS.map(p => `- ${p.name} (${p.category}): $${p.price}/mo — ${p.tagline}`).join("\n");
    const currentSetup = Array.isArray(setup) && setup.length
      ? setup.map((item: string) => `- ${item}`).join("\n")
      : "- Nothing selected yet";

    const response = await fetch(`${process.env.OPENROUTER_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: [
          {
            role: "system",
            content: "You are DeskLab AI, a helpful assistant for digital workspace design in Bali. " +
                     "You help users design their dream workspace. You know about ergonomics and Bali vibes. " +
                     "You MUST suggest specific products from our catalog when relevant, using their exact names. " +
                     "Longer rentals are discounted: 3 months 5%, 6 months 10%, 12 months 15%. " +
                     "Keep answers short (under 120 words) and easy to scan; short bullet lists are welcome. " +
                     "Keep your tone fun, professional, and helpful.\n\n" +
                     "OUR CATALOG:\n" + catalog + "\n\n" +
                     `THE USER'S CURRENT SETUP (${rentalMonths ?? 1}-month term):\n` + currentSetup
          },
          ...messages
        ],
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.ok ? 200 : response.status });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Failed to fetch response from AI" }, { status: 500 });
  }
}
