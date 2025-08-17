import { GoogleGenerativeAI } from "@google/generative-ai";

export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);
    const text = body.text;
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent(`Summarize this text:\n\n${text}`);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ summary: result.response.text() }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}