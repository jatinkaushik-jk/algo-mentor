"use client";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider {...props}>{children}</SessionProvider>;
}
