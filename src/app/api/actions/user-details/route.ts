import { getUserFromDatabase } from "@/helpers/user";
import { NextResponse } from "next/server";

const getUserDetails = async () => {
  try {
    const user = await getUserFromDatabase();

    if (!user) {
      return NextResponse.json({ message: "User not Found!" }, { status: 400 });
    }

    return NextResponse.json(
      { message: "User Found!", data: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", data: error },
      { status: 500 }
    );
  }
};

export { getUserDetails as POST };
