import { Module } from "@/models/user.model";
import { NextResponse as response } from "next/server";
import { getUserFromDatabase } from "@/helpers/user";

export async function GET() {
  try {
    const user = await getUserFromDatabase();
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
