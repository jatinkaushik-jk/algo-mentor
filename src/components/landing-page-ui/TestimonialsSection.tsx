"use client";

import React, { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { ChevronDown } from "lucide-react";

const testimonials = [
  {
    quote:
      "AlgoMentor helped me improve my coding skills in record time. The personalized feedback is amazing!",
    authorName: "Neha Gupta",
    avatar: "",
    rating: 5,
  },
  {
    quote:
      "The AI-powered lessons make learning algorithms so much easier and fun!",
    authorName: "Aarav Mishra",
    avatar: "", 
    rating: 5,
  },
  {
    quote:
      "From beginner to advanced, AlgoMentor guided me through every step. Highly recommend it!",
    authorName: "Tanya Arora",
    avatar: "",
    rating: 5,
  },
  {
    quote:
      "AlgoMentor's socratic approach of teaching algorithms is both effective and enjoyable. I've learned so much!",
    authorName: "Sanya verma",
    avatar: "",
    rating: 5,
  },
  {
    quote:
      "AlgoMentor's socratic approach of teaching algorithms is both effective and enjoyable. I've learned so much!",
    authorName: "Ritika Sharma",
    avatar: "",
    rating: 5,
  },
  {
    quote:
      "AlgoMentor's socratic approach of teaching algorithms is both effective and enjoyable. I've learned so much!",
    authorName: "Kabir Mehta",
    avatar: "",
    rating: 5,
  },
];
const TestimonialsSection = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [isMore, setIsMore] = useState<boolean>(false);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      // breakpoints: >=1024 => large (6), >=768 => medium (4), else small (3)
      if (w >= 1280) setVisibleCount(6);
      else if (w >= 768) setVisibleCount(4);
      else setVisibleCount(3);
    }

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const visibleCards = testimonials.slice(0, visibleCount);

  return (
    <section
      id="testimonials"
      className="relative py-8 p-4 text-center my-20 w-full overflow-y-clip"
    >
      <div>
        <div className="text-xl md:text-2xl font-medium text-center text-[#7C3AED] mb-1">
          Feedback
        </div>
        <h2 className="text-5xl font-semibold text-center">
          What our learner says?
        </h2>
        <p className="text-lg mt-4 text-center max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">
          AlgoMentor is helping students and developers transform how they understand algorithms—from passive reading to active problem-solving. Here’s what our users say:
        </p>
      </div>

      <div className="my-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div role="list" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
            {visibleCards.map((testimonial, index) => (
              <div key={index} role="listitem" className="w-full">
                <TestimonialCard
                  quote={testimonial.quote}
                  authorName={testimonial.authorName}
                  avatar={testimonial.avatar}
                  rating={testimonial.rating}
                />
              </div>
            ))}
          </div>
        </div>

        {!isMore && <div className="absolute w-full h-1/2 md:h-2/3 bg-gradient-to-t from-white to-transparent bottom-0 left-0" />}

        {!isMore && <div className="absolute bottom-6 left-1/2 -translate-x-1/2 border backdrop-blur-sm bg-transparent px-4 py-2 rounded-lg cursor-context-menu shadow-lg hover:shadow-sm hover:scale-95 duration-300 text-sm font-medium" onClick={()=> setIsMore(true)}>
          Show more
          <ChevronDown size={16} className="mx-auto" />
        </div>}
      </div>
    </section>
  );
};

export default TestimonialsSection;
