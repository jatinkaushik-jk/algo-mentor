import { LoaderCircle } from "lucide-react";
import React from "react";

const Loader = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="w-full h-full min-h-40 grid gap-2 place-content-center text-center">
      <LoaderCircle className="animate-spin mx-auto" />
      {children || "Loading..."}
    </div>
  );
};

export default Loader;
