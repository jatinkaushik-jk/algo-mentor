import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export const LogOutButton = () => {
  const { status } = useSession();
  return (
    <div>
      {status == "authenticated" ? (
        <Button
          className="text-red-500"
          variant={"link"}
          onClick={() => signOut({ redirectTo: "/login" })}
        >
          Logout
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};
