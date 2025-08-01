import Image from "next/image"

const AboutSection = () => {
  return (
    <section
            id="about"
            className="min-h-[40rem] p-4 flex lg:flex-row flex-col items-center justify-center gap-20 mb-10"
          >
            <div className="relative w-full md:w-[34rem] aspect-[4/3] bg-black rounded-lg before:content-[''] before:absolute before:md:top-6 before:xs:top-4 before:top-2 before:md:right-6 before:xs:right-4 before:right-2 before:w-full before:h-full before:rounded-lg before:bg-amber-100 before:z-[-1]">
              <Image src="/images/about-img.png" width={400} height={300} alt="AlgoMentor with Socrates"  className="object-cover rounded-lg w-full aspect-[4/3] object-top" />
            </div>
            <div className="lg:w-1/2 w-full">
              <h3 className="font-bold text-2xl sm:text-3xl mb-10">
                Master Algorithms <br /> with Your Socratic AI Mentor!
              </h3>
              <p className="sm:text-lg text-base">
                Welcome to AlgoMentor – your personalized Socratic AI mentor,
                designed to help you master algorithms effortlessly! With an
                intuitive, question-driven approach, AlgoMentor guides you
                step-by-step through key concepts like algorithm mechanics, time
                and space complexities, and practical applications. Whether
                you&apos;re a beginner or sharpening your skills, our AI mentor
                adapts to your learning pace, making algorithm learning more
                engaging and interactive.
              </p>
            </div>
          </section>
  )
}

export default AboutSection