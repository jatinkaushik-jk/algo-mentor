"use client";
import { useEffect, useState } from "react";
import AlgorithmTable from "@/components/algorithms/ui/algorithm-table";
import { AccessValues, Algorithm, DifficultyValues } from "@/models/user.model";
import { algorithms } from "@/components/algorithms/data/algorithms";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ChevronLeft,
  Star,
  Award,
  PlayCircle,
  BookmarkCheck,
} from "lucide-react";

const EasyAlgorithmsPage = () => {
  const [algos, setAlgos] = useState<Algorithm[]>([]);
  const [tab, setTab] = useState("overview");
  const completed = algos.filter((r) => r.description.length <= 35).length;
  const progressPct = Math.round((completed / algos.length) * 100);
  useEffect(() => {
    const fetchAlgorithms = async () => {
      const easyAlgos = algorithms
        .filter((algo) => algo.difficulty === "Easy")
        .map((algo) => ({
          ...algo,
          difficulty: algo.difficulty as DifficultyValues,
          access: algo.access as AccessValues,
        }));
      setAlgos(easyAlgos);
    };
    fetchAlgorithms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[radial-gradient(50%_50%_at_50%_0%,rgba(99,102,241,0.20),transparent_60%),linear-gradient(180deg,rgba(2,6,23,0.04),transparent)]">
      {/* Header / Hero */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/60 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="gap-2">
              <Link href="/dashboard">
                <ChevronLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Image src="/images/logo.png" alt="logo" width={40} height={40}/>
            <div>
              <div className="text-xs text-slate-500">
                Learn basics with guided tasks
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                Easy Algorithms Track
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant={"outline"} className="cursor-context-menu">
              Beginner Friendly
            </Badge>
            <Button asChild className="gap-2">
              <Link href="#start">
                <PlayCircle className="h-4 w-4" />
                Start
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Plan + Table */}
        <section className="lg:col-span-2 space-y-6">
          {/* Plan Intro Card */}
          <div className="rounded-xl p-px bg-gradient-to-br from-indigo-200/60 via-fuchsia-200/40 to-transparent">
            <Card className="rounded-[calc(0.75rem-1px)] shadow-md hover:shadow-lg transition-all bg-white/80 backdrop-blur">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Study Plan</CardTitle>
                    <CardDescription>
                      Master essential “Easy” problems across core topics.
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Progress</div>
                      <div className="font-semibold">{progressPct}%</div>
                    </div>
                    <div className="w-28">
                      <Progress value={progressPct} />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Alert className="bg-amber-50 border-amber-200 text-amber-900">
                  <AlertDescription>
                    Complete the Socratic session for each problem to count it
                    as finished.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Table Section (shadcn table, TanStack-ready) */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Closures & Basics</CardTitle>
              <CardDescription className="text-xs">
                Handpicked easy problems to build confidence.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="rounded-lg border overflow-hidden">
                <AlgorithmTable algos={algos} />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Right: Summary / Award / Related */}
        <aside className="space-y-6">
          {/* Summary */}
          <Card className="bg-white/85 backdrop-blur border-slate-200 shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookmarkCheck className="h-5 w-5 text-indigo-600" />
                Summary
              </CardTitle>
              <CardDescription>
                What you’ll achieve in this track
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <ul className="space-y-2">
                <li className="leading-relaxed">
                  Designed for absolute beginners to build strong intuition.
                </li>
                <li className="leading-relaxed">
                  Master patterns: two-pointers, hashing, stacks, and arrays.
                </li>
                <li className="leading-relaxed">
                  Each problem includes an AI-guided Socratic session to ensure
                  deep understanding.
                </li>
              </ul>
              <Separator className="my-2" />
              <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="tips">Tips</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="pt-3">
                  Expect 30–45 minutes to finish this set. Use the Socratic mode
                  to validate concepts and close knowledge gaps quickly.
                </TabsContent>
                <TabsContent value="tips" className="pt-3">
                  Read the prompt, predict an approach, then use Socratic
                  guidance. Write quick notes after each session to reinforce
                  memory.
                </TabsContent>
                <TabsContent value="faq" className="pt-3">
                  You can retake Socratic sessions anytime. Completion requires
                  finishing the chat for each problem.
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Award */}
          <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-400" />
                Award
              </CardTitle>
              <CardDescription className="text-slate-300">
                Earn your badge
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <div className="relative h-14 w-14">
                <Image
                  alt="Easy Track Badge"
                  src="/images/cardImg01.webp"
                  fill
                  className="object-contain drop-shadow"
                />
              </div>
              <div>
                <div className="font-semibold">Easy Algorithms Badge</div>
                <div className="text-sm text-slate-300">
                  Complete all tasks and Socratic sessions.
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="secondary" className="w-full">
                <Link href="#start">Complete this plan</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Related */}
          <Card className="bg-white/85 backdrop-blur shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Related
              </CardTitle>
              <CardDescription>Continue your journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="#"
                className="block rounded-lg border p-3 hover:bg-slate-50 transition"
              >
                Arrays & Strings Essentials
              </Link>
              <Link
                href="#"
                className="block rounded-lg border p-3 hover:bg-slate-50 transition"
              >
                HashMaps in Practice
              </Link>
              <Link
                href="#"
                className="block rounded-lg border p-3 hover:bg-slate-50 transition"
              >
                Two Pointers Deep Dive
              </Link>
            </CardContent>
          </Card>
        </aside>
      </main>

      {/* Anchor for Start button */}
      <div id="start" className="mx-auto max-w-7xl px-4 pb-12">
        <Card className="bg-white/80 backdrop-blur-lg">
          <CardHeader>
            <CardTitle>How to use this page</CardTitle>
            <CardDescription>
              Finish the AI session for each problem to mark it complete.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            - Click a row’s menu to open details or jump directly into Socratic
            mode. Progress updates automatically when the AI session is
            completed. Keep notes and revisit weak topics for mastery.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EasyAlgorithmsPage;
