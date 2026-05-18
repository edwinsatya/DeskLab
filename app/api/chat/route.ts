import { PRODUCTS } from "@/constants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Create a catalog string for the system prompt
    const catalog = PRODUCTS.map(p => `- ${p.name} (${p.category}): $${p.price}/mo`).join("\n");

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
                     "You MUST suggest specific products from our catalog when relevant. " +
                     "Keep your tone fun, professional, and helpful.\n\n" +
                     "OUR CATALOG:\n" + catalog
          },
          ...messages
        ],
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Failed to fetch response from AI" }, { status: 500 });
  }
}
