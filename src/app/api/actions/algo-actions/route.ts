import UserModel from "@/models/user.model";
import { NextResponse } from "next/server";
import { getUserFromDatabase } from "@/helpers/user";
import {
  IAlgorithm,
  IModule,
  StateValues,
} from "@/interfaces/algorithms.interface";
import { algorithms } from "@/components/algorithms/data/algorithms";

const sendAlgoData = async (req: Request) => {
  const { algoID } = await req.json();

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

    // Fetching valid algorithm from user's algorithm list
    const reqAlgorithm = algorithms.find((algo) => algo.algoID === algoID);

    if (!reqAlgorithm) {
      return NextResponse.json(
        { message: "Algorithm not found" },
        { status: 404 }
      );
    }
    // check for algorithm access
    const algoAccessFlag = reqAlgorithm?.access;
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
      const existingAlgo = modules.find((module) => {
        return module?.algorithm?.algoID == algoID;
      });

      if (existingAlgo) {
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

      modules.push({
        algorithm: reqAlgorithm as IAlgorithm,
        state: StateValues.pending,
        conversation: [],
      });
      await UserModel.findOneAndUpdate({ _id }, { modules });
    }

    return NextResponse.json(
      { message: "Successful Request", algorithm: reqAlgorithm },
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
