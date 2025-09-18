import { NextResponse as res } from "next/server";
import type { NextRequest } from "next/server";
import { IModule } from "@/interfaces/algorithms.interface";
import { getUserFromDatabase } from "@/helpers/user";

async function saveModuleStatus(req: NextRequest) {
  const { algoName, status } = await req.json();

  try {
    const user = await getUserFromDatabase();

    if (!user) {
      return res.json({ error: "User not found" }, { status: 404 });
    }

    const reqModule = user.modules.find(
      (mod: IModule) => mod?.algorithm?.title.toLowerCase() === algoName
    );

    if (!reqModule) {
      return res.json(
        { message: "Algorithm not found in user's history" },
        { status: 404 }
      );
    }

    // set state
    reqModule.state = status;

    await user.save();

    return res.json(
      { message: "Congratulations! Module completed successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log("Internal Server error!", error);

    return res.json(
      { message: "Failed to save chat history", error },
      { status: 500 }
    );
  }
}

export { saveModuleStatus as POST };
