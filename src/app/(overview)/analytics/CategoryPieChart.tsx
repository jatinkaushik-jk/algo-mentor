"use client";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const CATEGORY_COLORS = ["#4c1b99", "#7c3edd", "#9969e4", "#a855f7"];

export function CategoryPieChart({
  categoryStats,
}: {
  categoryStats: { name: string; value: number }[];
}) {
  categoryStats = categoryStats.map((stat, index) => ({
    ...stat,
    fill: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
  }));

  const chartConfig = {
    Sorting: {
      label: "Sorting",
    },
    Searching: {
      label: "Searching",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Algorithms by Category</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {categoryStats.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <Pie dataKey={(stat) => stat.value} data={categoryStats}>
                <LabelList
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: number) => value}
                />
              </Pie>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-300 w-full h-32 flex items-center justify-center">
            No data available
          </div>
        )}
      </CardContent>
    </Card>
  );
}
