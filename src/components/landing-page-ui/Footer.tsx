import { InstagramIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import fLogo from "@/assets/logo/a-logo.png";

const footerLinks = [
  {
    name: "Platform",
    links: [
      {
      text: "About",
      href: "/#about",
    },
    {
      text: "Features",
      href: "/#features",
    },
    {
      text: "Pricing",
      href: "/pricing",
    },{
      text: "Algo Library",
      href: "/algo-library"
    }
    ]
  },
  {
    name: "Resources",
    links: [
      {
      text: "Documentation",
      href: "https://github.com/jatinkaushik-jk/algo-mentor",
    },
    {
      text: "Blog & Insights",
      href: "https://github.com/jatinkaushik-jk/algo-mentor",
    },
    {
      text: "Help & Support",
      href: "https://github.com/jatinkaushik-jk/algo-mentor",
    },{
      text: "FAQs",
      href: "/#faqs"
    }
    ]
  },
  {
    name: "Company",
    links: [
      {
      text: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      text: "Terms of Service",
      href: "/terms-of-service",
    },
    {
      text: "Contact Us",
      href: "/contact",
    },{
      text: "Feedback",
      href: "/#testimonials"
    }
    ]
  }
];

const Footer = () => {
  return (
    <footer className="p-8 rounded-t-3xl bg-gradient-to-b from-[#6125c8] to-[#3c187c] text-white">
      <div className="py-10 flex flex-col lg:flex-row gap-20 justify-between items-center max-w-7xl mx-auto">
        <div className="max-w-sm flex flex-col justify-center items-center gap-10">
          <div className="w-24 h-24">
            <Image src={fLogo} alt="AlgoMentor Logo" />
          </div>
          <div className="space-y-4 text-center">
            <h1 className="text-2xl font-bold">AlgoMentor creating
new learning experience</h1>
          <p className="text-gray-300 text-sm">
            Strengthen your algorithm skills through AI-driven guidance, adaptive learning, and real progress growth.
          </p>
          </div>
          <div className="flex gap-10 text-[#ccc]">
            <Link href={"/"} className="hover:text-white">
            <InstagramIcon />
            </Link>
            <Link href={"/"} className="hover:text-white">
            <YoutubeIcon />
            </Link>
            <Link href={"/"} className="hover:text-white">
            <TwitterIcon />
            </Link>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-20 xl:gap-24">
          {footerLinks.map((link) => (
            <div key={link.name} className="flex flex-col gap-2">
              <h3 className="font-bold">{link.name}</h3>
              {link.links.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className="text-gray-300 hover:underline"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <hr className="my-6 sm:mx-4 border-gray-300" />
      <div className="text-center flex gap-6 flex-wrap items-center justify-between text-gray-300 text-sm max-w-7xl px-10 xl:px-0 mx-auto">
        <p>
          © {new Date().getFullYear()} AlgoMentor | All rights reserved.
        </p>
        <div className="flex justify-center items-center gap-8">
          <Link href="/privacy-policy" target="_blank">Privacy Policy</Link>
          <Link href="/terms-of-service" target="_blank">Terms of Service</Link>
          <Link href="/contact" target="_blank">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
