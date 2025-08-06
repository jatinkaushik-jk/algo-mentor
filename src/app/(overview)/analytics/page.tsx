"use client";
import { useUserContext } from "@/context/UserProvider";
import { FlameIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DifficultyPieChart } from "./DifficultyPieChart";
import { CategoryPieChart } from "./CategoryPieChart";
import { ModuleStatusPieChart } from "./ModuleStatusPieChart";
import AlgorithmTable from "@/components/algorithms/ui/algorithm-table";

export default function AnalyticsPage() {
  const { getAlgoStats } = useUserContext(); /// add getLoginHistory if needed
  // const [loginDates, setLoginDates] = useState<Date[]>([]);
  const [categoryStats, setCategoryStats] = useState<
    { name: string; value: number }[]
  >([]);
  const [difficultyStats, setDifficultyStats] = useState<
    { name: string; value: number }[]
  >([]);
  const [moduleStats, setModuleStats] = useState<
    { name: string; value: number }[]
  >([]);

  const totalAlgos = useMemo(() => {
    return categoryStats.reduce((acc, curr) => acc + curr.value, 0);
  }, [categoryStats]);

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
        const moduleMap: { [key: string]: number } = {
          COMPLETED: 0,
          PENDING: 0,
        };

        algoStats.forEach(
          (item: { category: string; difficulty: string; module: string }) => {
            categoryMap[item.category] = (categoryMap[item.category] || 0) + 1;
            difficultyMap[item.difficulty] += 1;
            moduleMap[item.module] += 1;
          }
        );

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

        setModuleStats(
          Object.keys(moduleMap).map((key) => ({
            name: key,
            value: moduleMap[key],
          }))
        );
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchAnalyticsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Module Status Chart */}
      <ModuleStatusPieChart
        moduleStats={moduleStats}
        totalModules={totalAlgos}
      />

      {/* Category Chart */}
      <CategoryPieChart categoryStats={categoryStats} />

      {/* Difficulty Chart */}
      <DifficultyPieChart
        difficultyStats={difficultyStats}
        totalAlgos={totalAlgos}
      />

      {/* Login Streak Heatmap */}
      <div className="col-span-1 md:col-span-2">
        {/* <ActivityCalenderHeatMap /> */}
        <AlgorithmTable algos={[]} />
      </div>

      {/* Daily Login Streak Widget */}
      <StreakWidget />
    </div>
  );
}

function StreakWidget() {
  const { user } = useUserContext();

  return (
    <div className="rounded-md border shadow-lg shadow-[rgba(23,20,20,0.04)] w-full p-4 aspect-auto mx-auto text-center">
      <div className="flex flex-col items-center justify-center w-full h-full gap-6">
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
