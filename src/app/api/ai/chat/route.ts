import { auth } from "@/auth";
import dbConnect from "@/dbConnect";
import { SOCRATIC_AI_GUIDELINES } from "@/helpers/systemInstructions";
import UserModel, { Conversation, Module } from "@/models/user.model";
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
  // Getting the algorithm name from the referer header
  const algoNameParts = req.headers
    .get("referer")
    ?.split("/")
    .pop()
    ?.split("-");
  const algoName =
    algoNameParts
      ?.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ") || "";

  const lastUserMessage = messages[messages.length - 1];
  const id = lastUserMessage.id || generateId();
  const createdAt = lastUserMessage.createdAt || new Date();
  const userMessage: Conversation = {
    id,
    role: "user",
    content: lastUserMessage.content,
    createdAt,
  };
  await saveMessage({ message: userMessage, algoName });

  const result = await streamText({
    model: google("gemini-2.0-flash-001"),
    messages: buildGoogleGenAIPrompt(messages),
    temperature: 0.8,
    system: SOCRATIC_AI_GUIDELINES,
    onFinish: async (message) => {
      // store message in the database
      const assistantMessage: Conversation = {
        id: generateId(),
        role: "assistant",
        content: message.text,
        createdAt: new Date(),
      };
      await saveMessage({ message: assistantMessage, algoName });
    },
  });

  return result?.toDataStreamResponse();
}

const saveMessage = async ({
  message,
  algoName,
}: {
  message: Conversation;
  algoName: string;
}): Promise<void> => {
  const session = await auth();
  // Saving the message to the database
  try {
    await dbConnect();
    const reqUser = await UserModel.findOne({
      email: session?.user?.email || "",
    });
    if (!reqUser) {
      console.error("User not found:", session?.user?.email);
      return;
    }
    const { modules }: { modules: Module[] } = reqUser;
    if (!modules) {
      console.error("Modules not found for user:", session?.user?.email);
      return;
    }
    const algoModule = modules.find(
      (module) => module.algorithm?.title === algoName
    );
    if (!algoModule) {
      console.error("Algorithm module not found for:", algoName);
      return;
    }
    algoModule.conversation.push(message);
    await reqUser.save();
  } catch (error) {
    console.error("Error saving message:", error);
  }
};
