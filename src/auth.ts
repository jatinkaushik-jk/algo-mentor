import NextAuth, { AuthError } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import UserModel from "./models/user.model";
import bcrypt from "bcryptjs";
import dbConnect from "./helpers/dbConnect";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // id: "user-login",
      // name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;
        const password = credentials.password as string;
        console.log("User data from client : ", email, password);

        try {
          // database connection
          await dbConnect();
          // logic to verify if the user exists
          const user = await UserModel.findOne({ email });
          if (!user) {
            throw new AuthError("User not found!");
          }
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new AuthError("Invalid Credentials!");
          }
          // if user exists, return user object
          return {
            id: user._id as string,
            email: user.email as string,
            name: user.username as string,
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    // signOut: "/auth/signout",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
    // newUser: "/auth/new-user",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "github") {
        try {
          const { email, name, id } = user;
          await dbConnect();
          const existingUser = await UserModel.findOne({ email });
          if (!existingUser) {
            await UserModel.create({
              email,
              username: name,
              password: await bcrypt.hash(id + "github", 8),
            });
          }
          return true;
        } catch (error) {
          console.error("Error during GitHub sign-in:", error);
          throw new AuthError("Error Authenticating User!");
        }
      }
      // Block sign-in for users with a specific email domain
      if (user.email?.endsWith("@example.com")) {
        return false; // Deny sign-in
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
