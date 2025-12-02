import { NextResponse } from "next/server";
import { auth } from "./app/api/auth/auth";

const authRoutes = ["/login", "/signup", "/forgot-password"];
const publicRoutes = [
  "/",
  "/pricing",
  "/privacy-policy",
  "/terms-of-service",
  "/contact",
];

export default auth((req) => {
  const isAuthenticated = !!req.auth;

  const { pathname, origin } = req.nextUrl;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", origin));
  }

  // Redirect unauthenticated users to login for protected routes
  if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", origin));
  }

  // Subscription check for community create
  if (
    isAuthenticated &&
    pathname === "/community/create" &&
    req.auth?.user?.subscriptionPlan === "Basic"
  ) {
    return NextResponse.redirect(new URL("/pricing", origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
  unstable_allowDynamic: ["/node_modules/mongoose/dist/**"],
};
