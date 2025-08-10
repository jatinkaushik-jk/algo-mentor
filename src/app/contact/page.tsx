"use client";
import { Navbar } from "@/components/landing-page-ui/navbar";
import ContactForm from "./ContactForm";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Footer from "@/components/landing-page-ui/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar className="bg-inherit"></Navbar>
      <div className="flex flex-col justify-center items-center mb-8 px-4">
        <div className="text-center my-12 space-y-1">
        <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Get In Touch</h3>
        <p className="text-gray-600 dark:text-gray-400">Have a question, feedback, or an idea? Let’s shape the future of algorithm learning together!</p>
      </div>
      <div className="rounded-2xl w-full max-w-5xl flex flex-col lg:flex-row bg-background p-2">
        {/* Contact Info */}
        <div className="lg:w-1/3 p-8 rounded-xl bg-primary text-gray-100 flex flex-col justify-between min-h-[440px]">
          <div>
            <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
            <p className="text-gray-300 mb-8">
              We&apos;d love to help you with algorithm learning. Reach out anytime!
            </p>
            <ul className="space-y-4 text-gray-100 text-base">
              <li className="flex gap-4">
                <PhoneIcon className="fill-white text-primary" /> +91 00011 11223
              </li>
              <li className="flex gap-4">
                <MailIcon className="fill-white text-primary" /> support@algomentor.app
              </li>
              <li className="flex gap-4">
                <MapPinIcon className="fill-white text-primary" /> Gurugram, INDIA
              </li>
            </ul>
          </div>
          <div className="pt-8 text-sm text-gray-300">
            <p>We create learning experiences powered by Socratic AI.</p>
          </div>
        </div>
        {/* Contact Form */}
        <div className="lg:w-2/3 md:p-8 p-2">
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
      </div>
      <div className="absolute w-full h-1/2 bg-primary/15 top-0 z-[-1]"></div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
