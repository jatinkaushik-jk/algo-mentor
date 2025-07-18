import UserModel, { Algorithm, Module, StateValues } from "@/models/user.model";
import { NextResponse } from "next/server";
import { getUserFromDatabase } from "@/helpers/user";

const sendAlgoData = async (req: Request) => {
  const algorithm = (await req.json()) as Algorithm;

  try {
    // Fetching user from database
    const reqUser = await getUserFromDatabase();

    // Response if user doesn't exist
    if (!reqUser) {
      return NextResponse.json(
        { message: "Internal server error" },
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
        return module.state === "PENDING";
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

      modules.push({ algorithm, state: StateValues.pending, conversation: [] });
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
