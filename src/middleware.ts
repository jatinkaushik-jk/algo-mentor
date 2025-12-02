import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import { auth } from "./app/api/auth/auth";

const secret = process.env.AUTH_SECRET;
const authPages = ["/login", "/signup", "/forgot-password"];
const publicRoutes = [
  "/",
  "/pricing",
  "/privacy-policy",
  "/terms-of-service",
  "/pricing",
  "/contact",
  ...authPages
];

export default auth(async function middleware(req:NextRequest) {
  const token = await getToken({ req, secret });
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    const isPublic = publicRoutes.some((path) => req.nextUrl.pathname === path);
    if (!isPublic) {
      const newUrl = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }
  } else {
    if (
      authPages.some((path) => req.nextUrl.pathname.startsWith(path)) &&
      isAuthenticated
    ) {
      // If the user is authenticated and tries to access an auth page, redirect them to the dashboard page
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }
    if (isAuthenticated && req.nextUrl.pathname === "/community/create") {
      // If the user is authenticated and tries to access the community's create post page, check for access
      if (token?.subscriptionPlan === "Basic") {
        return NextResponse.redirect(new URL("/pricing", req.nextUrl.origin));
      }
    }
    return NextResponse.next();
  }
})



export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
  unstable_allowDynamic: [
    "/node_modules/mongoose/dist/**"
  ]
};