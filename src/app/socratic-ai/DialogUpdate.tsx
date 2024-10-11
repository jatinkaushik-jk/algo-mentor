import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogUpdate({ children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || <Button variant="outline">Click me!</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Feature Update!</DialogTitle>
          <DialogDescription>
            We are working on this feature and will update soon.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
