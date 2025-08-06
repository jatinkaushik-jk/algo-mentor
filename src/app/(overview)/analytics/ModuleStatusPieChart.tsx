"use client";
import { Label, LabelProps, Pie, PieChart } from "recharts";

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

const STATUS_COLORS = ["#22c55e", "#eab308"];

const chartConfig = {
  COMPLETED: {
    label: "COMPLETED",
    color: "#22c55e",
  },
  PENDING: {
    label: "PENDING",
    color: "#eab308",
  },
} satisfies ChartConfig;

export function ModuleStatusPieChart({
  moduleStats,
  totalModules,
}: {
  moduleStats: { name: string; value: number }[];
  totalModules: number;
}) {
  moduleStats = moduleStats.map((stat, index) => ({
    ...stat,
    fill: STATUS_COLORS[index % STATUS_COLORS.length],
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Module Status Progress</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {moduleStats.some((stat) => stat.value > 0) ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <Pie
                dataKey={(stat) => stat.value}
                data={moduleStats}
                innerRadius={55}
                strokeWidth={5}
              >
                <Label
                  content={(props: LabelProps) =>
                    LabelForRingPieChart(props, totalModules)
                  }
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

const LabelForRingPieChart = ({ viewBox }: LabelProps, totalModules: number) => {
  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
    return (
      <text
        x={viewBox.cx}
        y={viewBox.cy}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <tspan
          x={viewBox.cx}
          y={viewBox.cy}
          className="fill-foreground text-3xl font-bold"
        >
          {totalModules.toLocaleString()}
        </tspan>
        <tspan
          x={viewBox.cx}
          y={(viewBox.cy || 0) + 24}
          className="fill-muted-foreground"
        >
          Modules
        </tspan>
      </text>
    );
  }
};
