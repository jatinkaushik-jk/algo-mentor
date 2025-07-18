import { NextResponse as res } from "next/server";
import type { NextRequest } from "next/server";
import UserModel, { Module, StateValues } from "@/models/user.model";
import dbConnect from "@/helpers/dbConnect";
import { auth } from "@/auth";

export async function PATCH(req: NextRequest) {
  const { algoName, status }: { algoName: string; status: string } =
    await req.json();
  const state = status.toUpperCase();
  const session = await auth();

  try {
    if(!(Object.values(StateValues).includes(state as StateValues))){
      console.log(state);
      return res.json({ error: "Module value is incorrect!" }, { status: 400 });
    }

    await dbConnect();
    const user = await UserModel.findOne({ email: session?.user?.email || "" });
    if (!user) {
      return res.json({ error: "User not found" }, { status: 404 });
    }

    const reqModule = user.modules.find(
      (mod: Module) =>
        mod?.algorithm?.title.toLowerCase() === algoName.toLowerCase()
    );

    if (!reqModule) {
      return res.json(
        { message: "Algorithm not found in user's history" },
        { status: 404 }
      );
    }

    if(reqModule.state === state){
      return res.json(
      { message: `Module status is already ${state}.` },
      { status: 200 }
    );
    }
    // set state
    reqModule.state = state;

    await user.save();

    return res.json(
      { message: "Module status updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log("Internal Server error!", error);
    return res.json(
      { message: "Failed to update module status", error },
      { status: 500 }
    );
  }
}
