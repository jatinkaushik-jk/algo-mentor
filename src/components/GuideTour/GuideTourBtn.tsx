"use client";
import { useNextStep } from 'nextstepjs';
import { Button } from '../ui/button';
import { GrCircleQuestion } from "react-icons/gr";
import { cn } from '@/lib/utils';

const GuideTourBtn = ({tourName, className}:{tourName: string, className?: string }) => {
    const { startNextStep } = useNextStep();
    const handleStartTour = () => {
      console.log("Starting tour")
    startNextStep(tourName);
  };
  return (
    <Button onClick={handleStartTour} className={cn('flex gap-2 justify-center items-center ', className)}><GrCircleQuestion /> Guide</Button>
  )
}

export default GuideTourBtn