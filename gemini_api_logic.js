import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables from the .env file so that `GEMINI_API_KEY` is available
dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function main() {
  try {
    // Prompt text for testing:
    // "what is capital of india"

    console.log("Calling Gemini API...");
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Note: you can change this to gemini-2.5-flash or another model if this preview model is no longer available
      contents: "What is the capital of india",
    });

    console.log("\n--- Response ---");
    console.log(response.text);
  } catch (error) {
    console.error("Error calling the API:", error.message);
  }
}

main();
