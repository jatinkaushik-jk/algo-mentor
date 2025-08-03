import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const data = [
  {
    title: 'AI-Powered Assistance',
    description: 'Get real-time help with coding problems and algorithms.'
  },
  {
    title: 'Interactive Coding',
    description: 'Practice algorithm problems in real-time with instant feedback.'
  },
  {
    title: 'Personalized Learning',
    description: 'Receive tailored content and resources based on your skill level.'
  }
];

const HeroSection = () => {
  return (
    <section>
        <div className="absolute w-full h-[600px] flex items-center justify-center  top-0 left-0 z-[-1]">
            <div className="relative  w-full h-4/5 flex justify-between items-center ">
              <div className="absolute top-[4%] md:top-[10%] lg:top-[10%] left-1/2 translate-x-[-50%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="md:size-14 size-10 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                  />
                </svg>
              </div>
              <div className="hidden md:block absolute top-[70%] lg:top-1/2 xl:left-[15%] left-[10%] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="md:size-14 size-10 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                  />
                </svg>
              </div>
              <div className="absolute xl:right-[30%] lg:right-[25%] md:right-[20%] right-[10%] top-[10%] xs:top-[15%] md:top-[22%] lg:top-[22%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="md:size-14 size-10 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                  />
                </svg>
              </div>
              <div className="absolute top-[10%] xs:top-[15%] md:top-[22%] lg:top-[22%] xl:left-[30%] lg:left-[25%] md:left-[20%] left-[10%] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="md:size-14 size-10 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M41 24c0 2.757 2.243 5 5 5s5-2.243 5-5-2.243-5-5-5c-.473 0-.922.087-1.356.211l-5.785-7.071C39.561 11.278 40 10.195 40 9c0-2.757-2.243-5-5-5s-5 2.243-5 5c0 1.195.439 2.278 1.141 3.139l-5.785 7.071A4.945 4.945 0 0 0 24 19c-2.757 0-5 2.243-5 5 0 1.195.439 2.278 1.141 3.139l-5.785 7.071A4.945 4.945 0 0 0 13 34c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5c0-1.551-.725-2.922-1.837-3.84l5.517-6.744c.051.027.106.047.158.072.115.056.228.112.348.159.222.087.448.158.679.211.109.026.22.042.332.061.199.032.399.053.6.061.07.002.134.02.203.02s.133-.018.202-.02a4.84 4.84 0 0 0 .6-.061c.112-.018.223-.035.332-.061.231-.054.458-.124.679-.211.12-.047.233-.103.348-.159.052-.025.106-.045.158-.072l5.517 6.744C30.725 36.078 30 37.449 30 39c0 1.195.439 2.278 1.141 3.139l-5.785 7.071A4.945 4.945 0 0 0 24 49c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5c0-1.551-.725-2.922-1.837-3.84l5.517-6.744c.051.027.106.047.158.072.115.056.228.112.348.159.222.087.448.158.679.211.109.026.22.042.332.061.199.032.399.053.6.061.07.002.134.02.203.02s.133-.018.202-.02a4.84 4.84 0 0 0 .6-.061c.112-.018.223-.035.332-.061.231-.054.458-.124.679-.211.12-.047.233-.103.348-.159.052-.025.106-.045.158-.072l5.517 6.744C41.725 51.078 41 52.449 41 54c0 2.757 2.243 5 5 5s5-2.243 5-5-2.243-5-5-5c-.473 0-.922.087-1.356.211l-5.785-7.071C39.561 41.278 40 40.195 40 39c0-2.757-2.243-5-5-5-.473 0-.922.087-1.356.211l-5.785-7.071C28.561 26.278 29 25.195 29 24c0-1.551-.725-2.922-1.837-3.84l5.517-6.744c.051.027.106.047.158.072.115.056.228.112.348.159.222.087.448.158.679.211.109.026.22.042.332.061.199.032.399.053.6.061.07.002.134.02.203.02s.133-.018.202-.02a4.84 4.84 0 0 0 .6-.061c.112-.018.223-.035.332-.061.231-.054.458-.124.679-.211.12-.047.233-.103.348-.159.052-.025.106-.045.158-.072l5.517 6.744C41.725 21.078 41 22.449 41 24zM13 42c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm11 15c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm25-3c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zM38 39c0 .929-.434 1.751-1.099 2.302l-.013.007c-.386.315-1.026.691-1.888.691s-1.502-.376-1.888-.691l-.013-.007A2.985 2.985 0 0 1 32 39c0-1.654 1.346-3 3-3s3 1.346 3 3zM24 21c1.654 0 3 1.346 3 3 0 .929-.434 1.751-1.099 2.302l-.013.007c-.386.315-1.026.691-1.888.691s-1.502-.376-1.888-.691l-.013-.007A2.985 2.985 0 0 1 21 24c0-1.654 1.346-3 3-3zM35 6c1.654 0 3 1.346 3 3 0 .929-.434 1.751-1.099 2.302l-.013.007c-.386.315-1.026.691-1.888.691s-1.502-.376-1.888-.691l-.013-.007A2.985 2.985 0 0 1 32 9c0-1.654 1.346-3 3-3zm14 18c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3z"
                  />
                </svg>
              </div>
              <div className="hidden md:block absolute top-[70%] lg:top-1/2 xl:right-[15%] right-[10%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="md:size-14 size-10 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* Hero Section */}
          <div className="sm:mt-16 lg:mt-20 flex flex-col items-center justify-center mb-8">
            <section id="hero" className="text-center">
              <h1 className="text-5xl font-bold mb-4">Welcome to AlgoMentor</h1>
              <p className="text-pretty text-gray-700 dark:text-gray-400 sm:text-lg mb-8">
                Your AI-powered
                <span className="text-primary"> Socratic Assistant </span> for
                mastering Algorithms.
              </p>
              <div className="flex flex-row justify-center items-center gap-x-6">
                <Button>
                  <Link href="/dashboard">Start Learning</Link>
                </Button>
                <Button variant="outline">
                  <Link
                    href="https://github.com/jatinkaushik-jk"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Let&apos;s Collab
                  </Link>
                </Button>
              </div>
            </section>
            {/* Hero Description Section */}
            <section className="mt-16 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-pretty">
              {data.map((item, index) => (
                <div key={index} className="p-6 border-2 rounded-lg">
                  <h2 className="text-2xl font-semibold">{item.title}</h2>
                  <p>
                    {item.description}
                  </p>
                </div>
              ))}
              <div className="p-6 border-2 rounded-lg bg-primary bg-gradient-to-r from-purple-500 to-purple-900 place-content-center hover:scale-95 transition duration-300 hidden sm:grid lg:hidden">
                <Image src={'/images/logoSVG.png'} alt='AlgoMentor Logo' width={100} height={100} />
              </div>
            </section>
          </div>
    </section>
  )
}

export default HeroSection