import { NextResponse as res } from "next/server";
import { getUserFromDatabase } from "@/helpers/user";

export async function POST() {

  try {

    const reqUser = await getUserFromDatabase();

    // Response if user doesn't exist
    if (!reqUser) {
      return res.json({ message: "Internal server error" }, { status: 500 });
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const yesterday = new Date(today - 86400000).setHours(0, 0, 0, 0);
    const last = reqUser.streak.lastLoginDate?.setHours(0, 0, 0, 0);

    if (!last || last < yesterday) reqUser.streak.current = 1;
    else if (last === yesterday) reqUser.streak.current += 1;

    if (reqUser.streak.current > reqUser.streak.highest) {
      reqUser.streak.highest = reqUser.streak.current;
    }

    reqUser.streak.lastLoginDate = new Date();
    await reqUser.save();

    return res.json({
      current: reqUser.streak.current,
      highest: reqUser.streak.highest,
    });
  } catch (error) {
    console.error("Error updating streak:", error);
    return res.json({ message: "Internal server error" }, { status: 500 });
  }
}
