import dbConnect from "./dbConnect";
import UserModel from "@/models/user.model";
import { auth } from "@/auth";

export async function getUserFromDatabase() {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("User not authenticated");
    }
    const { email } = session.user;

    // Database connection
    await dbConnect();
    const reqUser = await UserModel.findOne({ email });

    // Response if user doesn't exist
    if (!reqUser) {
      throw new Error("User not found");
    }

    return reqUser;
  } catch (error) {
    console.error("Error fetching user from database", error);
    throw new Error("Failed to fetch user from database");
  }
}

