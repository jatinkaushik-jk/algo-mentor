// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// // export { default } from "next-auth/middleware";
export { auth as middleware } from "@/auth";
// import { getToken } from "next-auth/jwt";

// const secret = process.env.AUTH_SECRET;

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request, secret });
//   const url = request.nextUrl;
//   if (token) {
//     if (url.pathname.startsWith("/login") || url.pathname.startsWith("/signup"))
//       return NextResponse.rewrite(new URL("/dashboard", request.url));
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     "/",
//     "/login",
//     "/signup",
//     "/dashboard/:path*",
//     "/socratic-ai/:path*",
//   ],
// };
