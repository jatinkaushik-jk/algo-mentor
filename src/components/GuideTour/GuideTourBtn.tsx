"use client";
import { useNextStep } from 'nextstepjs';
import { Button } from '../ui/button';
import { GrCircleQuestion } from "react-icons/gr";

const GuideTourBtn = ({tourName}:{tourName: string }) => {
    const { startNextStep } = useNextStep();
    const handleStartTour = () => {
      console.log("Starting tour")
    startNextStep(tourName);
  };
  return (
    <Button onClick={handleStartTour} className='flex gap-2'><GrCircleQuestion /> Guide</Button>
  )
}

export default GuideTourBtn