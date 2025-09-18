import UserModel from "@/models/user.model";
import { NextResponse } from "next/server";
import { getUserFromDatabase } from "@/helpers/user";
import {
  IAlgorithm,
  IModule,
  StateValues,
} from "@/interfaces/algorithms.interface";

const sendAlgoData = async (req: Request) => {
  const algorithm = (await req.json()) as IAlgorithm;

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

    const { _id, modules }: { _id: string; modules: IModule[] } = reqUser;

    // check for algorithm access
    const algoAccessFlag = algorithm.access;
    const userSubscriptionPlan = reqUser.subscription.plan.name;
    let isAuthorized = false;

    switch (algoAccessFlag) {
      case "FREE":
        isAuthorized = true;
        break;
      case "PRO":
        if (userSubscriptionPlan === "PRO" || userSubscriptionPlan === "MASTER")
          isAuthorized = true;
        break;
      case "MASTER":
        if (userSubscriptionPlan === "MASTER") isAuthorized = true;
        break;

      default:
        break;
    }

    if (!isAuthorized) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 403 }
      );
    }

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

    return NextResponse.json(
      { message: "Successful Request" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export { sendAlgoData as POST };
