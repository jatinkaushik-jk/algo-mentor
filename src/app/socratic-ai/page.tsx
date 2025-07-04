"use client";
import SidebarNavigations from "@/components/ui/sidebarNavigations";
import Header from "@/components/ui/header";
import AlgoNav from "./components/AlgoNav";

export default function SocraticAI() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SidebarNavigations></SidebarNavigations>
      <div className="flex flex-col gap-4 sm:pl-14">
        <Header pageHeading="Socratic AI" searchbar={false}></Header>
        <main>
          <div className=" w-full h-[calc(100vh-5.5rem)] flex flex-row gap-6 p-6 pt-0 ">
            <AlgoNav></AlgoNav>
            <div className="w-full h-full overflow-y-scroll rounded-xl bg-muted/100 dark:bg-muted/50 p-4 shadow-lg">
              {/* Content here */}
              <div className="flex flex-col w-full gap-4 text-sm sm:text-base leading-relaxed text-muted-foreground overflow-y-auto pr-2">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  🧠 What is Socratic Learning?
                </h2>
                <p>
                  The <strong>Socratic method</strong> is a form of learning
                  based on asking and answering thought-provoking questions.
                  Rather than providing direct answers, it encourages learners
                  to think critically and reason out solutions themselves. This
                  method:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Promotes deep understanding through guided discovery.</li>
                  <li>
                    Strengthens problem-solving and analytical thinking skills.
                  </li>
                  <li>Encourages curiosity and active participation.</li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-6 mb-2">
                  💡 How AlgoMentor Uses Socratic AI
                </h2>
                <p>
                  <strong>AlgoMentor</strong> integrates the Socratic technique
                  using AI-powered conversations tailored for Data Structures
                  and Algorithms (DSA). Here’s how:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    When you select an algorithm, the AI mentor initiates a
                    dialogue with a simple question instead of a lecture.
                  </li>
                  <li>
                    Based on your responses, it guides you through logical
                    steps, asking targeted questions to reinforce core concepts.
                  </li>
                  <li>
                    The conversation adapts to your level of
                    understanding—offering deeper insights or hints when needed.
                  </li>
                  <li>
                    By the end, you’ll have discovered the working, time
                    complexity, and use cases through your own reasoning.
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-foreground mt-6 mb-2">
                  🚀 Why It Works
                </h2>
                <p>
                  Traditional methods often rely on passive consumption.
                  Socratic AI flips that model—making you an active participant
                  in your learning journey. This leads to:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Better retention and conceptual clarity.</li>
                  <li>Confidence in articulating algorithmic thinking.</li>
                  <li>A more engaging and personalized learning experience.</li>
                </ul>

                <p className="mt-6 italic text-muted-foreground text-sm">
                  “Education is not the filling of a pail, but the lighting of a
                  fire.” – William Butler Yeats
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
