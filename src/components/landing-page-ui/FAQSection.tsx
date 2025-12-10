import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GrCircleQuestion } from "react-icons/gr";
import Head from "next/head";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const faqs = [
  {
    question: "What is AlgoMentor?",
    answer: `<p>Our platform, AlgoMentor, helps learners master technical skills through Socratic learning technique along with structured roadmaps, curated challenges, and real-time analytics.</p><p>You’ll get access to daily streak tracking, progress heatmaps, and category-wise insights to boost your learning journey.</p>`,
  },
  {
    question: "Is the Basic plan really free?",
    answer: `<p>Yes, the Basic plan is 100% free.</p><p>It’s perfect for trying out the platform, tracking your progress, and getting a feel for our features before upgrading.</p>`,
  },
  {
    question: "How does the Mastery plan help me?",
    answer: `<p>The Mastery plan is designed for serious learners.</p><p>It unlocks detailed analytics, AI-based recommendations, exclusive mentorship, and early access to new features and events.</p>`,
  },
  {
    question: "Can I cancel or switch plans anytime?",
    answer: `<p>Absolutely. You have full control over your subscription.</p><p>Upgrade, downgrade, or cancel your plan anytime from your dashboard—no hidden charges or conditions.</p>`,
  },
  {
    question: "Will I get a certificate after completion?",
    answer: `<p>Yes, you will earn certificates after completing learning paths, projects, or selected challenges.</p><p>These certificates are verifiable and can be showcased on your resume or LinkedIn.</p>`,
  },
  {
    question: "How is this platform different from others?",
    answer: `<p>Our platform implements the Socratic learning technique along with adaptive learning, gamification, and in-depth progress tracking.</p><p>Everything is designed for aspiring developers and learners in a clean, modern interface.</p>`,
  },
  {
    question: "What payment methods do you accept?",
    answer: `<p>We accept UPI, debit/credit cards, and wallets.</p><p>All transactions are securely processed via trusted gateways like Razorpay or Stripe.</p>`,
  },
];

export default function FAQSection() {
  return (
    <section id="faqs" className="mx-auto max-w-4xl w-full p-6">
      <div>
        <div className="text-base font-medium text-center text-black bg-[#ECECEC] mb-4 w-max mx-auto p-2 px-3 rounded-lg flex gap-x-2 justify-center items-center">
          <GrCircleQuestion /> FAQs
        </div>
        <h2 className="text-5xl font-semibold text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-lg mt-4 text-center max-w-2xl mx-auto text-[#5b5b5b]">
          Find questions and answers related to the design system, purchase,
          updates, and support.
        </p>
      </div>
      <div>
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4 mt-20"
          defaultValue="item-1"
        >
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index} className="bg-black/5 rounded-lg p-2">
              <AccordionTrigger className="px-4">{faq.question}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance px-4">
                <div
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                  className="text-pretty"
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="flex justify-center items-center mt-10">
        <Link href="#faqs">
        <Button className="bg-black hover:bg-black/80 gap-x-2">See All FAQs <ChevronRight size={20} /> </Button>
        </Link>
      </div>
    </section>
  );
}

export function FaqStructuredData() {
  const mainData = faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: mainData,
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
