import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export const LogOutButton = ({
  showIcon = false,
  className,
}: {
  showIcon?: boolean;
  className?: string;
}) => {
  const { status } = useSession();
  return (
    <div className={status == "authenticated" ? "" : "hidden"}>
      <Button
        className={`text-red-500  ${className}`}
        variant={"link"}
        onClick={() => signOut({ redirectTo: "/login" })}
      >
        {showIcon && <LogOut />} Logout
      </Button>
    </div>
  );
};
