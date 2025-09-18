import { NextResponse as res } from "next/server";
import type { NextRequest } from "next/server";
import { getUserFromDatabase } from "@/helpers/user";
import { IModule, IConversation } from "@/interfaces/algorithms.interface";

async function saveHistory(req: NextRequest) {
  const { algoName, message }: { algoName: string; message: IConversation } =
    await req.json();

  try {
    const user = await getUserFromDatabase();

    if (!user) {
      return res.json({ error: "User not found" }, { status: 404 });
    }

    const reqModule = user.modules.find(
      (mod: IModule) => mod?.algorithm?.title.toLowerCase() === algoName
    );

    if (!reqModule) {
      return res.json(
        { message: "Algorithm not found in user's history" },
        { status: 404 }
      );
    }

    // // check duplicate response
    // const userChats = reqModule.conversation.filter(
    //   (chat:Conversation) =>
    //     chat.role === "user" &&
    //     messages.content === chat.content
    // );
    // if (userChats.length > 1) {
    //   return res.json({ message: "Duplicate chats cleared!" }, { status: 400 });
    // }

    // Save new message
    reqModule.conversation.push(message);
    await user.save();
    return res.json({ message: "Chat history saved" }, { status: 200 });
  } catch (error) {
    console.log("Pta nhi kya error hai", error);

    return res.json(
      { message: "Failed to save chat history", error },
      { status: 500 }
    );
  }
}

export { saveHistory as POST };
