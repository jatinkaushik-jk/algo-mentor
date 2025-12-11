import Image from "next/image";
import AboutImage from "@/assets/illustrations/about-img.png";
import SocratesImage from "@/assets/illustrations/3d-socrates.png";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="p-4 px-6 space-y-20 lg:space-y-40 my-20"
    >
      <div className="flex lg:flex-row flex-col items-center justify-center gap-20 xl:gap-32">
        <div className="group relative w-full lg:w-2/5 aspect-[1.62] rounded-3xl before:content-[''] before:absolute before:md:top-6 before:xs:top-4 before:top-2 before:md:right-6 before:xs:right-4 before:right-2 before:w-full before:h-full before:rounded-3xl before:bg-[#52269E] before:z-[-1] border border-gray-200 -rotate-1 hover:rotate-0 duration-300">
        <Image
          src={AboutImage}
          alt="AlgoMentor Illustration"
          className="object-cover rounded-3xl group-hover:scale-105 duration-300"
        />
      </div>
      <div className="lg:w-1/2 w-full">
        <div>
          <div className="text-xl md:text-2xl font-medium text-[#7C3AED] mb-1 ml-1">
            About
          </div>
          <h2 className="text-4xl xl:text-5xl font-semibold">What is AlgoMentor?</h2>
          <p className="xl:text-lg mt-6 max-w-2xl text-zinc-600 dark:text-zinc-400">
            AlgoMentor is an AI-powered learning platform designed to simplify
            Data Structures and Algorithms using personalized, conversational
            guidance. With interactive explanations and adaptive learning, it
            helps beginners build strong fundamentals with clarity and
            confidence.
          </p>
        </div>
      </div>
      </div>

      <div className="flex lg:flex-row flex-col-reverse items-center justify-center gap-20 xl:gap-24">
        
      <div className="lg:w-3/5 w-full text-pretty">
        <div>
          <h2 className="text-4xl xl:text-5xl font-semibold">What is Socratic AI?</h2>
          <p className="xl:text-lg mt-6 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Socratic AI teaches through thoughtful questioning rather than direct answers, helping learners actively think, reason, and understand concepts more deeply. It turns learning into an engaging, step-by-step exploration.
          </p>
          <p className="xl:text-lg mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Inspired by the methods of the Greek philosopher Socrates, it uses guided dialogue to encourage reflection and insight. Socratic AI brings this approach into modern digital learning, making knowledge discovery more interactive and intuitive.
          </p>
        </div>
      </div>
        <div className="w-full lg:w-3/5">
        <Image
          src={SocratesImage}
          alt="Socrates Illustration"
          className="object-cover rounded-3xl hover:-translate-y-2 hover:scale-105 duration-300"
        />
      </div>
      </div>
    </section>
  );
};

export default AboutSection;
