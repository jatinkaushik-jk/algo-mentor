import { SOCRATIC_AI_GUIDELINES } from "@/helpers/systemInstructions";
import { getUserFromDatabase } from "@/helpers/user";
import { IConversation, IModule } from "@/interfaces/algorithms.interface";
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
  const userMessage: IConversation = {
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
      const assistantMessage: IConversation = {
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
  message: IConversation;
  algoName: string;
}): Promise<void> => {
  // Saving the message to the database
  try {
    const reqUser = await getUserFromDatabase();
    if (!reqUser) {
      console.error("User not found");
      return;
    }
    const { modules }: { modules: IModule[] } = reqUser;
    if (!modules) {
      console.error("Modules not found for user");
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
