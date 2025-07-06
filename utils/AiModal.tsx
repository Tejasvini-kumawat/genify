import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!);

export async function generateGeminiContent(prompt: string) {
  console.log("📤 Sending Prompt to Gemini:", prompt);

  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" }); // ✅ correct model path

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const response = result.response;
  const text = await response.text();

  console.log("📥 Gemini response:", text);
  return text;
}
