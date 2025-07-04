import { NextResponse as res } from "next/server";
import type { NextRequest } from "next/server";
import UserModel, { Module } from "@/models/user.model";
import dbConnect from "@/dbConnect";
import { auth } from "@/auth";

async function getHistory(req: NextRequest) {
  const algoName = req.nextUrl.searchParams.get("algoName");

  try {
    const session = await auth();
    if (!session?.user) {
      return res.json(
        { message: "user session expires! Try loging in again" },
        { status: 400 }
      );
    }
    await dbConnect();
    const user = await UserModel.findOne({ email: session?.user?.email });

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

    return res.json({ data: history }, { status: 200 });
  } catch (error) {
    return res.json(
      { message: "Failed to fetch history", error },
      { status: 500 }
    );
  }
}

export { getHistory as GET };
