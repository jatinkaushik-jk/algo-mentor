import { NextResponse as response } from "next/server";
import { getUserFromDatabase } from "@/helpers/user";
import { IModule } from "@/interfaces/algorithms.interface";

export async function GET() {
  try {
    const user = await getUserFromDatabase();
    if (!user) {
      return response.json({ message: "User not found" }, { status: 404 });
    }
    const modules = user?.modules as IModule[];
    return response.json({ data: modules }, { status: 200 });
  } catch (error) {
    console.error("Error fetching algorithms:", error);
    return response.json(
      { message: "Error fetching algorithms" },
      { status: 500 }
    );
  }
}
