import { NextResponse as res } from "next/server";
import type { NextRequest } from "next/server";
import UserModel, { Module } from "@/models/user.model";
import dbConnect from "@/dbConnect";

async function getHistory(req: NextRequest) {
  const { userEmail, algoName } = await req.json();

  try {
    await dbConnect();
    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return res.json({ error: "User not found" }, { status: 404 });
    }

    const reqModule = user.modules.find(
      (mod: Module) => mod?.algorithm?.title.toLowerCase() === algoName
    );

    if (!reqModule) {
      return res.json(
        { message: "Algorithm not found in user's history" },
        { status: 404 }
      );
    }
    const history = reqModule.conversation || [];

    return res.json(history, { status: 200 });
  } catch (error) {
    return res.json(
      { message: "Failed to fetch history", error },
      { status: 500 }
    );
  }
}

export { getHistory as POST };
