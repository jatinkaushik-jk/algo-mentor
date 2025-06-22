import { SOCRATIC_AI_GUIDELINES } from "@/helpers/systemInstructions";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateId, Message, streamText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

const buildGoogleGenAIPrompt = (messages: Message[]): Message[] => [
  // {
  //   id: generateId(),
  //   role: "user",
  //   content: AI_MENTOR_GUIDELINES,
  // },
  ...messages.map((message) => ({
    id: message.id || generateId(),
    role: message.role,
    content: message.content,
  })),
];

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google("gemini-2.0-flash-001"),
    messages: buildGoogleGenAIPrompt(messages),
    temperature: 0.8,
    system: SOCRATIC_AI_GUIDELINES,
  });

  return result?.toDataStreamResponse();
}
