import { SOCRATIC_AI_GUIDELINES } from "@/helpers/systemInstructions";
import { getUserFromDatabase } from "@/helpers/user";
import { IConversation } from "@/interfaces/algorithms.interface";
import UserModel from "@/models/user.model";
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
  const { messages, algorithmId } = await req.json();

  const lastUserMessage = messages[messages.length - 1];
  const id = lastUserMessage.id || generateId();
  const createdAt = lastUserMessage.createdAt || new Date();
  const userMessage: IConversation = {
    id,
    role: "user",
    content: lastUserMessage.content,
    createdAt,
  };
  await saveMessage({ message: userMessage, algoID: algorithmId });

  const result = await streamText({
    model: google("gemini-2.5-flash"),
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
      await saveMessage({ message: assistantMessage, algoID: algorithmId });
    },
  });

  return result?.toDataStreamResponse();
}

const saveMessage = async ({
  message,
  algoID,
}: {
  message: IConversation;
  algoID: string;
}): Promise<void> => {
  // Saving the message to the database
  try {
    const reqUser = await getUserFromDatabase();
    if (!reqUser) {
      console.error("User not found");
      return;
    }
    // Use atomic update to avoid version conflicts
    await UserModel.findOneAndUpdate(
      { 
        _id: reqUser._id,
        "modules.algorithm.algoID": algoID 
      },
      { 
        $push: { "modules.$.conversation": message } 
      },
      { new: true }
    );
  } catch (error) {
    console.error("Error saving message:", error);
  }
};
