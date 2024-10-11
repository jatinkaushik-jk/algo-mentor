import { NextResponse as res } from "next/server";
import type { NextRequest } from "next/server";
import UserModel, { ChatHistory } from "@/model/user";
import dbConnect from "@/dbConnect";

async function saveHistory(req: NextRequest) {
  const { userEmail, algoName, chatMessage } = await req.json();

  try {
    await dbConnect();

    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return res.json({ error: "User not found" }, { status: 404 });
    }

    const reqModule = user.modules.find((mod) =>
      mod.algos.some((algo) => algo.title.toLowerCase() === algoName)
    );

    if (!reqModule) {
      return res.json(
        { message: "Algorithm not found in user's history" },
        { status: 404 }
      );
    }

    // Save new message
    Array.from(chatMessage).forEach((msg) => {
      reqModule.chatHistory.push(msg);
    });
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
