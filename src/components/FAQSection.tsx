import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Head from 'next/head';

export const faqs = [
  {
    question: "What is AlgoMentor?",
    answer: `<p>Our platform, AlgoMentor, helps learners master technical skills through structured roadmaps, curated challenges, and real-time analytics.</p><p>You’ll get access to daily streak tracking, progress heatmaps, and category-wise insights to boost your learning journey.</p>`
  },
  {
    question: "Is the Basic plan really free?",
    answer: `<p>Yes, the Basic plan is 100% free.</p><p>It’s perfect for trying out the platform, tracking your progress, and getting a feel for our features before upgrading.</p>`
  },
  {
    question: "How does the Mastery plan help me?",
    answer: `<p>The Mastery plan is designed for serious learners.</p><p>It unlocks detailed analytics, AI-based recommendations, exclusive mentorship, and early access to new features and events.</p>`
  },
  {
    question: "Can I cancel or switch plans anytime?",
    answer: `<p>Absolutely. You have full control over your subscription.</p><p>Upgrade, downgrade, or cancel your plan anytime from your dashboard—no hidden charges or conditions.</p>`
  },
  {
    question: "Will I get a certificate after completion?",
    answer: `<p>Yes, you will earn certificates after completing learning paths, projects, or selected challenges.</p><p>These certificates are verifiable and can be showcased on your resume or LinkedIn.</p>`
  },
  {
    question: "How is this platform different from others?",
    answer: `<p>We offer a unique blend of adaptive learning, gamification, and in-depth progress tracking.</p><p>Everything is designed for aspiring developers and learners in a clean, modern interface.</p>`
  },
  {
    question: "What payment methods do you accept?",
    answer: `<p>We accept UPI, debit/credit cards, and wallets.</p><p>All transactions are securely processed via trusted gateways like Razorpay or Stripe.</p>`
  }
]

export default function FAQSection() {
  return (
    <section className="mx-auto max-w-4xl w-full p-6">
    <h2 className="text-4xl font-semibold mb-8">Frequently Asked Questions</h2>
    <div>
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      {faqs.map((faq, index) => (
        <AccordionItem value={`item-${index + 1}`} key={index}>
        <AccordionTrigger>{faq.question}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
        </AccordionContent>
      </AccordionItem>
      ))}
    </Accordion>
    </div>
    </section>
  )
}

export function FaqStructuredData() {
  const mainData = faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": mainData
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  )
}

