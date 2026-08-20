import { GoogleGenerativeAI } from "@google/generative-ai";

async function run() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  console.log("Fetching models...");
  try {
    // The SDK doesn't always expose listModels directly easily if it's an old version, 
    // but we can try fetching models or we'll just try another known name.
    // Actually, in the REST API, it's GET https://generativelanguage.googleapis.com/v1beta/models
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await res.json();
    console.log(data.models.map(m => m.name));
  } catch (e) {
    console.error(e);
  }
}
run();
