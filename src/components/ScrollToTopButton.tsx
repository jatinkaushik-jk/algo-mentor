"use client";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { CircleArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const scrollToTopBtn = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollToTopBtn.current) {
      if (
        document.body.scrollTop > 40 ||
        document.documentElement.scrollTop > 40
      ) {
        scrollToTopBtn.current.classList.remove("bottom-[-100%]");
        scrollToTopBtn.current.classList.add("bottom-10");
      } else {
        scrollToTopBtn.current.classList.remove("bottom-10");
        scrollToTopBtn.current.classList.add("bottom-[-100%]");
      }
    }
  };

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this runs once on mount
  return (
    <div
      className="fixed bottom-[-100%] right-8 transition-all duration-500"
      ref={scrollToTopBtn}
    >
      <Button
        variant={"link"}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <CircleArrowUp className="size-10 animate-bounce cursor-pointer text-primary" />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;
