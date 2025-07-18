import UserModel, { Module } from "@/models/user.model";
import { NextResponse as response } from "next/server";
import dbConnect from "@/helpers/dbConnect";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.email) {
      return response.json({ message: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();
    const user = await UserModel.findOne({email: session?.user?.email});
    if (!user) {
      return response.json({ message: "User not found" }, { status: 404 });
    }
    const modules = user?.modules as Module[];
    return response.json({ data: modules }, { status: 200 });
  } catch (error) {
    console.error("Error fetching algorithms:", error);
    return response.json({ message: "Error fetching algorithms" }, { status: 500 });
    }
}
