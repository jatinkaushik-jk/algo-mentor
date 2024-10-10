import { auth } from "@/auth";
import dbConnect from "@/dbConnect";
import UserModel from "@/model/user";
import { NextResponse } from "next/server";

const getUserDetails = async () => {
  try {
    const session = await auth();
    const email = session?.user?.email;
    await dbConnect();
    const user = await UserModel.findOne({ email });

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
