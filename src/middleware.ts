import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
const secret = process.env.AUTH_SECRET;
// import type { NextRequest } from "next/server";

// const secret = process.env.AUTH_SECRET; // Not used with next-auth/middleware
const publicRoutes = [
  "/",
  "/pricing",
  "/privacy-policy",
  "/terms-of-service",
  "/pricing",
  "/contact",
  "/login",
  "/signup",
];

export async function middleware(req:any) {
  const token = await getToken({ req, secret });
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    const isPublic = publicRoutes.some((path) => req.nextUrl.pathname === path);
    if (!isPublic) {
      const newUrl = new URL("/login", req.nextUrl.origin);
      return NextResponse.rewrite(newUrl);
    }
  } else {
    const authPages = ["/login", "/signup", "/forgot-password"];
    if (
      authPages.some((path) => req.nextUrl.pathname.startsWith(path)) &&
      isAuthenticated
    ) {
      // If the user is authenticated and tries to access an auth page, redirect them to the dashboard page
      return NextResponse.rewrite(new URL("/dashboard", req.nextUrl.origin));
    }
    if (isAuthenticated && req.nextUrl.pathname === "/community/create") {
      // If the user is authenticated and tries to access the community's create post page, check for access
      if (token?.subscriptionPlan === "Basic") {
        return NextResponse.rewrite(new URL("/pricing", req.nextUrl.origin));
      }
    }
    return NextResponse.next();
  }
}

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request, secret });
//   const url = request.nextUrl;
//   if (token) {
//     if (url.pathname.startsWith("/login") || url.pathname.startsWith("/signup"))
//       return NextResponse.rewrite(new URL("/dashboard", request.url));
//   }
// }

// // See "Matching Paths" below to learn more
// middleware should be applied to values in matcher in config
// export const config = {
//   matcher: [
//     "/",
//     "/login",
//     "/signup",
//     "/dashboard/:path*",
//     "/socratic-ai/:path*",
//   ],
// };

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
