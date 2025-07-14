"use client";

import { useUserContext } from "@/context/UserProvider";
import { FlameIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieLabelProps } from "recharts/types/polar/Pie";

export default function Analytics() {
  const { getAlgoStats } = useUserContext(); /// add getLoginHistory if needed
  // const [loginDates, setLoginDates] = useState<Date[]>([]);
  const [categoryStats, setCategoryStats] = useState<
    { name: string; value: number }[]
  >([]);
  const [difficultyStats, setDifficultyStats] = useState<
    { name: string; value: number }[]
  >([]);

  const COLORS = ["#34d399", "#60a5fa", "#facc15", "#f87171", "#c084fc"];

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // const loginData = await getLoginHistory(); // e.g., ["2024-06-01", "2024-06-03"]
        const algoStats = await getAlgoStats(); // Format below assumed

        // setLoginDates(loginData.map((dateStr: string) => new Date(dateStr)));

        // Example structure:
        // { category: "Sorting", count: 4, difficulty: "Easy" }
        const categoryMap: { [key: string]: number } = {};
        const difficultyMap: { [key: string]: number } = {
          Easy: 0,
          Medium: 0,
          Hard: 0,
        };

        algoStats.forEach((item: { category: string; difficulty: string }) => {
          categoryMap[item.category] = (categoryMap[item.category] || 0) + 1;
          difficultyMap[item.difficulty] += 1;
        });

        setCategoryStats(
          Object.keys(categoryMap).map((key) => ({
            name: key,
            value: categoryMap[key],
          }))
        );

        setDifficultyStats(
          Object.keys(difficultyMap).map((key) => ({
            name: key,
            value: difficultyMap[key],
          }))
        );
        
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchAnalyticsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Log the stats whenever they change
    console.log("Category Stats:", categoryStats);
    console.log("Difficulty Stats:", difficultyStats);
  }, [categoryStats, difficultyStats]);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Algorithm Category Chart */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          📊 Algorithms by Category
        </h2>
        {categoryStats.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                dataKey="value"
                data={categoryStats}
                cx="50%"
                cy="50%"
                outerRadius={80}
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {categoryStats.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  padding: "6px 12px",
                  fontSize: "12px",
                }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-300 w-full h-32 flex items-center justify-center">
            No data available
          </div>
        )}
      </div>

      {/* Difficulty Chart */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          📈 Difficulty Progress
        </h2>
        {difficultyStats.every((stat) => stat.value > 0) ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                dataKey="value"
                data={difficultyStats}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                labelLine={false}
                label={renderCustomizedLabelForRingPieChart}
              >
                {difficultyStats.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  padding: "6px 12px",
                  fontSize: "12px",
                }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-300 w-full h-32 flex items-center justify-center">
            No data available
          </div>
        )}
      </div>

      {/* Login Streak Heatmap */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-md col-span-1 md:col-span-2">
        <h2 className="text-lg font-semibold mb-4 text-foreground">
          📅 Daily Login Streak
        </h2>
        <div className="w-full h-64 flex items-center justify-center rounded-lg">
          <StreakWidget />
        </div>
      </div>
    </div>
  );
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelProps) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const renderCustomizedLabelForRingPieChart = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelProps) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.25;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={14}
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

function StreakWidget() {
  const { user } = useUserContext();

  return (
    <div className="rounded-md border shadow-lg shadow-[rgba(23,20,20,0.04)] max-w-[16rem] w-full p-4 aspect-auto mx-auto text-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="p-2 bg-orange-200 dark:bg-orange-400/90 dark:shadow-[0_0_10px_rgba(255,165,0,0.5)] rounded-full">
          <FlameIcon
            className="text-orange-500 dark:text-white drop-shadow-[0_0_10px_rgba(255,165,0,0.5)]"
            size={50}
          />
        </div>
        <div className="flex flex-row items-center justify-evenly w-full">
          <div>
            <p className="text-2xl font-bold">{user?.streak.current}</p>
            <p className="text-sm">Current Streak</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{user?.streak.highest}</p>
            <p className="text-sm">Best Streak</p>
          </div>
        </div>
      </div>
    </div>
  );
}
