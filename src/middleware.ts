import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
import { auth } from "@/auth";
// export { auth as middleware } from "@/auth";
// import { getToken } from "next-auth/jwt";

// const secret = process.env.AUTH_SECRET;
const publicRoutes = [
    "/",
    "/pricing",
    "/privacy-policy",
    "/terms-of-service",
    "/pricing",
    "/login",
    "/signup",
]

export default auth(async function middleware(req) {
  // Your custom middleware logic goes here
  // req.nextUrl.pathname !== "/login"
  if (!req.auth) {
    const isPublic = publicRoutes.some((path) => req.nextUrl.pathname === path);
    if(!isPublic){
    const newUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.rewrite(newUrl);
    }
  }
})

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
  matcher: ['/((?!api|_next|.*\\..*).*)']}