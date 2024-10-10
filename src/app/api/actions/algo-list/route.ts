import UserModel from "@/model/user";
import dbConnect from "@/dbConnect";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const getAlgoList = async (req: Request) => {
  const user = await req.json();

  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: "user session expires! Try loging in again" },
        { status: 400 }
      );
    }

    const { email } = session.user;

    // Database connection
    await dbConnect();
    const reqUser = await UserModel.findOne({ email });

    // Response if user doesn't exist
    if (!reqUser) {
      return NextResponse.json(
        { message: "Internal serval error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Successful Request", algoList: reqUser.modules },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
};

export { getAlgoList as POST };
