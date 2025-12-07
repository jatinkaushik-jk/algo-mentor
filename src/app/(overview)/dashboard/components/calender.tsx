"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const Calender = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="calender_tab rounded-md border shadow-lg shadow-[rgba(23,20,20,0.04)] max-w-full w-max aspect-auto mx-auto scale-90"
    />
  );
};

export default Calender;
