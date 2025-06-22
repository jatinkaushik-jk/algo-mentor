import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { recommendSkillsPrompt } from "./systemInstructions";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: recommendSkillsPrompt,
  safetySettings: safetySettings,
});

export async function runGemini(userInput: string) {
  const result = await model.generateContent(userInput);
  const data = result.response
    .text()
    .replace(/^```json\s*/, "")
    .replace("```", "")
    .trim();
  return data;
}
