"use client";

// steps type
interface StepTypes{
    target: string,
    content: string,
}

const GuideTour = ({steps}:{steps: StepTypes[] }) => {
    console.log(steps)
  return (
    <div>GuideTour</div>
  )
}

export default GuideTour