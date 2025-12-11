"use client";
import Link from 'next/link'
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import AlgoMentorMockup from "@/assets/images/mockup.png";
import AlgoMentorMockupDark from "@/assets/images/mockup-dark.png";
import BackgroundImage from "@/assets/images/background.png"
import BtnDecoration from "@/assets/illustrations/btn-decoration.svg"
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const {theme} = useTheme();
  const [mockup, setMockup] = useState(AlgoMentorMockup);
  useEffect(()=>{
    if(theme == "dark") setMockup(AlgoMentorMockupDark);
    else setMockup(AlgoMentorMockup);
  },[theme])
  
  return (
    <section className='py-6'>
        <div className='max-w-3xl text-center space-y-6 mx-auto mt-10'>
          <h1 className='font-bold text-4xl md:text-5xl'>Learn Smarter and Think Deeper with Socratic AI</h1>
          <p className='dark:text-gray-300'>AlgoMentor simplifies learning by guiding you through algorithms using Socratic method, ensuring clarity, confidence, and continuous progress in your coding journey</p>
        </div>
        <div className='flex sm:flex-row flex-col gap-6 sm:gap-10 items-center justify-center mt-16'>
          <Link href={"/signup"}>
          <Button className='bg-black hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 rounded-full h-12 relative'>Start Learning Free
          <Image src={BtnDecoration} alt="btn decoration" className='absolute -top-8 -left-8 dark:invert' />
          </Button>
          </Link>
          <Link href="https://github.com/jatinkaushik-jk/algo-mentor">
          <Button variant={"outline"} className='border-2 border-black dark:border-gray-300 rounded-full font-semibold h-12 bg-transparent hover:bg-white/20 dark:hover:bg-white/10'>Explore Socratic AI</Button>
          </Link>
        </div>
        <div className='flex justify-center items-center xl:-translate-y-6 mt-10 xl:mt-0 relative z-[-1]'>
          <Image src={mockup} alt='AlgoMentor Mockup' className='translate-x-3 sm:translate-x-10' />
          <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-screen aspect-[0.9] z-[-1]' style={{backgroundImage: `url(${BackgroundImage.src})`, backgroundSize: "contain", backgroundRepeat: "no-repeat"}}></div>
        </div>
    </section>
  )
}

export default HeroSection