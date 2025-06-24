import UserModel, { Algorithm, Module } from "@/models/user.model";
import dbConnect from "@/dbConnect";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const sendAlgoData = async (req: Request) => {
  const algorithm = (await req.json()) as Algorithm;

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

    const { _id, modules }: { _id: string; modules: Module[] } = reqUser;

    let isAlgoExist = false;

    // Checking whether requested Algorithm already visited or not
    if (modules.length > 0) {
      const existingAlgo = modules.filter((module) => {
        return module?.algorithm?.algoID == algorithm.algoID;
      });

      if (existingAlgo.length === 1) {
        isAlgoExist = true;
      }
    }

    // Responding when requesting new Algorithm
    if (!isAlgoExist) {
      const pendingStates = modules.filter((module) => {
        return module.state === "pending";
      });

      if (pendingStates.length >= 3) {
        return NextResponse.json(
          {
            message:
              "You have too many pending modules! \nPlease complete the previous Modules First",
          },
          { status: 400 }
        );
      }

      modules.push({ algorithm, state: "pending", conversation: [] });
      await UserModel.findOneAndUpdate({ _id }, { modules });
    }

    // console.log("User: ", session?.user, "\n Algorithm data: ", algorithm);

    return NextResponse.json(
      { message: "Successful Request" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
};

export { sendAlgoData as POST };
