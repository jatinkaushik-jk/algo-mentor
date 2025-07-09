import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EndChatDialog = ({ isOpen, onClose, endConversation, continueConversation }:{ isOpen: boolean, onClose: () => void, endConversation: () => void, continueConversation: () => void }) => {
  if (!isOpen) return null

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild className='hidden'>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] [&>button:last-child]:hidden">
        <DialogHeader>
          <DialogTitle>Yay! you almost made it!</DialogTitle>
          <DialogDescription>
            Do you have any further questions about the algorithm you just learned? If not, would you like to explore another algorithm?
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2 mt-1'>
            <Button onClick={()=> {continueConversation(); onClose();}} variant={"outline"}>Continue with this algorithm</Button>
            <Button onClick={()=> {endConversation(); onClose();}} >Explore another algorithm</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EndChatDialog