import { NextResponse as response } from "next/server";
import { getUserFromDatabase } from "@/helpers/user";
import { ISubscription } from "@/interfaces/subscription.interface";

export async function GET() {
  try {
    const user = await getUserFromDatabase();
    if (!user) {
      return response.json({ message: "User not found" }, { status: 404 });
    }
    const subscription = user?.subscription as ISubscription;
    return response.json({ data: subscription }, { status: 200 });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return response.json(
      { message: "Error fetching subscription" },
      { status: 500 }
    );
  }
}
