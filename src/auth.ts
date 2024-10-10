import NextAuth, { AuthError } from "next-auth";
import { z } from "zod";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import UserModel from "./model/user";
import bcrypt from "bcryptjs";
import dbConnect from "./dbConnect";
import { LoginSchema } from "./schemas/loginSchema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "user-login",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text ",
          placeholder: "email@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      authorize: async (credentials: z.infer<typeof LoginSchema>) => {
        const email = credentials.email.toLowerCase() as string;
        const password = credentials.password as string;
        console.log("User data from client : ", email, password);

        // database connection
        await dbConnect();

        // logic to verify if the user exists
        const user = await UserModel.findOne({ email });

        if (!user) {
          throw new Error("User not found!");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
          throw new Error("Invalid Credentials!");
        }

        console.log({ ...user, password: "hidden" });
        return { ...user, password: "hidden" };
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
          let existingUser = await UserModel.findOne({ email });
          if (!existingUser) {
            existingUser = await UserModel.create({
              email,
              username: name,
              password: await bcrypt.hash(id + "github", 8),
            });
          }
          return true;
        } catch (error) {
          throw new AuthError("Error Authenticating User!");
        }
      }
      return false;
    },
    // jwt({ token, user }) {
    //   if (user) {
    //     // User is available during sign-in
    //     token.id = user.id;
    //   }
    //   return token;
    // },
    // session({ session, token }) {
    //   session.user.id = token.id;
    //   return session;
    // },
  },
});
