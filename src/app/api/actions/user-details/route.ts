import { getUserFromDatabase } from "@/helpers/user";
import { UserProfile } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

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

const updateUserDetails = async (req: NextRequest) => {
  const userProfileData = await req.json();
  try {
    const user = await getUserFromDatabase();

    if (!user) {
      return NextResponse.json({ message: "User not Found!" }, { status: 400 });
    }

    // update user details in the databse
    user.email = userProfileData.email;
    for (const key in userProfileData) {
      if (user.profile.hasOwnProperty(key)) {
        user.profile[key as keyof UserProfile] = userProfileData[key as keyof UserProfile];
      }
    }
    user.save();
    return NextResponse.json({ message: "User details updated successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", data: error },
      { status: 500 }
    );
  }
};

export { getUserDetails as GET, updateUserDetails as PATCH };
