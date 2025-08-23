import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { paramsToSign } = await req.json();

  try {
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );
    return NextResponse.json({ signature }, { status: 200 });
  } catch (error) {
    console.log("Error signing parameters:", error);
    return NextResponse.json(
      {
        error: "Failed to sign parameters",
      },
      { status: 500 }
    );
  }
}
