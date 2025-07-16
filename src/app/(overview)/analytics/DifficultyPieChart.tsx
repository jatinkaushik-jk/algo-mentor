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

const DIFFICULTY_COLORS = ["#22c55e", "#eab308", "#ef4444"];

const chartConfig = {
  Easy: {
    label: "Easy",
    color: "#22c55e",
  },
  Medium: {
    label: "Medium",
    color: "#eab308",
  },
  Hard: {
    label: "Hard",
    color: "#ef4444",
  },
} satisfies ChartConfig;

export function DifficultyPieChart({
  difficultyStats,
  totalAlgos,
}: {
  difficultyStats: { name: string; value: number }[];
  totalAlgos: number;
}) {
  difficultyStats = difficultyStats.map((stat, index) => ({
    ...stat,
    fill: DIFFICULTY_COLORS[index % DIFFICULTY_COLORS.length],
  }));
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Difficulty Progress</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {difficultyStats.some((stat) => stat.value > 0) ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <Pie
                dataKey={(stat) => stat.value}
                data={difficultyStats}
                innerRadius={55}
                strokeWidth={5}
              >
                <Label
                  content={(props: LabelProps) =>
                    LabelForRingPieChart(props, totalAlgos)
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

const LabelForRingPieChart = ({ viewBox }: LabelProps, totalAlgos: number) => {
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
          {totalAlgos.toLocaleString()}
        </tspan>
        <tspan
          x={viewBox.cx}
          y={(viewBox.cy || 0) + 24}
          className="fill-muted-foreground"
        >
          Algorithms
        </tspan>
      </text>
    );
  }
};
