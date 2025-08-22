import { NextResponse } from "next/server";
import dbConnect from "@/helpers/dbConnect";
import bcrypt from "bcryptjs";
import UserModel from "@/models/user.model";

const registerUser = async (req: Request) => {
  const { email, username, password } = await req.json();

  try {
    // Connect to the database
    await dbConnect();

    // Check if the user already exists
    let user = await UserModel.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 400 }
      );
    }
    user = await UserModel.findOne({ username });
    if (user) {
      return NextResponse.json(
        { message: "Username is already taken" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create a new user
    user = new UserModel({
      email,
      password: hashedPassword,
      username,
      profile: {
        firstName: username.split(" ")[0] || "",
        lastName: username.split(" ")[1] || "",
        email: email,
        phone: "",
        bio: "",
        avatar: "",
        location: "",
        website: "",
        learningGoals: "",
      },
    });

    // Save the user to the database
    await user.save();

    // Return success response
    console.log("User registered successfully!");

    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in registering user", err);
    return NextResponse.json(
      { message: "Error registering user" },
      { status: 500 }
    );
  }
};

export { registerUser as POST };
