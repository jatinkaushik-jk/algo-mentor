import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const LogInButton = ({ className }: { className?: string }) => {
  const { status } = useSession();
  return (
    <div className={status == "authenticated" ? "hidden" : ""}>
      <Button className={className}>
        <Link href="/login">Log in</Link>
      </Button>
    </div>
  );
};

export default LogInButton;
