import { Subscription } from "@/models/user.model";
import { NextResponse as response } from "next/server";
import { getUserFromDatabase } from "@/helpers/user";

export async function GET() {
  try {
    const user = await getUserFromDatabase();
    if (!user) {
      return response.json({ message: "User not found" }, { status: 404 });
    }
    const subscription = user?.subscription as Subscription;
    return response.json({ data: subscription }, { status: 200 });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return response.json({ message: "Error fetching subscription" }, { status: 500 });
  }
}
