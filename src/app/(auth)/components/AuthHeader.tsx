import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

const AuthHeader = ({link='/login', label='Login'}: {link?: string, label?: string}) => {
  return (
    <div className="absolute right-8 top-8 sm:top-10 flex justify-center items-center gap-x-2">
      <Button asChild variant="ghost">
        <Link href={link}>{label}</Link>
      </Button>
      <ModeToggle></ModeToggle>
    </div>
  );
};

export default AuthHeader;
