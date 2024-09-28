import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.SECRET,
  // pages: {
  //   signIn: "/login",
  //   signUp: "/signup",
  // },
  // callbacks: {
  //   async session({ session, token }) {
  //     session.user.id = token.sub;
  //     return session;
  //   },
  // },
};
