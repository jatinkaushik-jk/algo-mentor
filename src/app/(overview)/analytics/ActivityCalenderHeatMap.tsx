"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ActivityCalenderHeatMap = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Activity Calendar</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-64">
            {/* Placeholder for the heatmap component */}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCalenderHeatMap;
