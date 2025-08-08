import { ModeToggle } from "@/components/ui/mode-toggle";
import { Metadata } from "next"
import Link from "next/link"

export const metaData : Metadata = {
    title: "AlgoMentor | Privacy Policy",
    description: "Privacy Policy for AlgoMentor - Socratic AI-driven platform for learning algorithms. Learn how we collect, use, and protect your data."
}

const lastUpdated = "August 8, 2025";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
        {/* Header */}
        <header className="shadow-sm border-b bg-background">
          <div className="max-w-4xl flex justify-between items-center mx-auto">
            <div className="px-4 py-6">
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Home
            </Link>
          </div>
          <ModeToggle/>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="rounded-lg shadow-sm p-8 bg-background">
            {/* Title Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
              <p className="text-gray-600 dark:text-gray-500">
                <strong>Last Updated:</strong> {lastUpdated}
              </p>
              <p className="text-gray-600 dark:text-gray-500">
                <strong>Effective Date:</strong> {lastUpdated}
              </p>
            </div>

            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                Welcome to AlgoMentor (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). AlgoMentor is a Socratic AI-driven educational 
                platform designed to help users learn algorithms through interactive conversations powered by 
                Google&apos;s Gemini AI model. We are committed to protecting your privacy and ensuring the security 
                of your personal information.
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                you use our website and services. Please read this policy carefully to understand our practices 
                regarding your personal data and how we will treat it.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>

              <h3 className="text-xl font-medium mb-3">Personal Information</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                We may collect personal information that you voluntarily provide to us, including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Name and contact information (email address)</li>
                <li>Account credentials (username and password)</li>
                <li>Educational background and learning preferences</li>
                <li>Profile information you choose to share</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Learning Data</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                As an educational platform, we collect data related to your learning activities:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Conversation history with our AI mentor</li>
                <li>Learning progress and performance metrics</li>
                <li>Algorithm topics studied and time spent</li>
                <li>Questions asked and responses provided</li>
                <li>Learning session data and timestamps</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Technical Information</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                We automatically collect certain technical information when you use our platform:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Operating system and device characteristics</li>
                <li>Usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li><strong>Educational Services:</strong> To provide personalized AI-driven learning experiences and track your progress</li>
                <li><strong>Account Management:</strong> To create and manage your user account and provide customer support</li>
                <li><strong>Platform Improvement:</strong> To analyze usage patterns and improve our educational algorithms and content</li>
                <li><strong>Communication:</strong> To send you updates, educational content, and important platform notifications</li>
                <li><strong>Security:</strong> To protect our platform and users from fraud, abuse, and security threats</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
              </ul>
            </section>

            {/* AI and Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">AI Services and Third-Party Integration</h2>

              <h3 className="text-xl font-medium mb-3">Google Gemini AI</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                AlgoMentor uses Google&apos;s Gemini AI model to power our Socratic learning conversations. When you 
                interact with our AI mentor:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Your questions and learning conversations are processed by Google&apos;s AI services</li>
                <li>We do not share personally identifiable information with Google beyond what is necessary for AI processing</li>
                <li>Conversation data may be anonymized and used to improve AI responses</li>
                <li>Google&apos;s privacy policies and data handling practices also apply to this processing</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Data Storage</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                We use MongoDB for data storage and management. Your learning history and account information 
                are stored securely in our database systems with appropriate encryption and access controls.
              </p>
            </section>

            {/* Data Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How We Share Your Information</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your 
                information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li><strong>Service Providers:</strong> With trusted third-party service providers (like Google AI, MongoDB hosting) who assist in operating our platform</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulations</li>
                <li><strong>Safety and Security:</strong> To protect the rights, property, or safety of AlgoMentor, our users, or others</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of company assets</li>
                <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication and access controls</li>
                <li>Regular security audits and monitoring</li>
                <li>Limited access to personal data on a need-to-know basis</li>
                <li>Secure cloud infrastructure and hosting</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-400">
                However, no method of transmission over the internet or electronic storage is 100% secure. 
                While we strive to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                We retain your personal information and learning data for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Provide you with our educational services</li>
                <li>Maintain your learning history and progress</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce our agreements</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-400">
                You may request deletion of your account and associated data at any time. Some information may 
                be retained in anonymized form for analytical and improvement purposes.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Your Privacy Rights</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Data Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Opt-out:</strong> Opt out of certain data processing activities</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-400">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our platform:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
                <li><strong>Performance Cookies:</strong> Help us analyze platform usage and performance</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Analytics Cookies:</strong> Provide insights into user behavior and platform improvement</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-400">
                You can control cookie preferences through your browser settings, though some cookies are 
                essential for platform functionality.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Children&apos;s Privacy</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                AlgoMentor is designed for users of all ages learning algorithms. We are committed to protecting 
                the privacy of younger users:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>We do not knowingly collect personal information from children under 13 without parental consent</li>
                <li>If we learn we have collected information from a child under 13, we will delete it promptly</li>
                <li>Parents and guardians can contact us to review, modify, or delete their child&apos;s information</li>
                <li>We comply with applicable children&apos;s privacy laws, including COPPA</li>
              </ul>
            </section>

            {/* International Transfers */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure 
                appropriate safeguards are in place for international data transfers, including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Compliance with applicable data protection laws</li>
                <li>Use of standard contractual clauses or similar mechanisms</li>
                <li>Ensuring adequate levels of data protection</li>
              </ul>
            </section>

            {/* Changes to Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or 
                applicable laws. We will notify you of any material changes by:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Posting the updated policy on our website</li>
                <li>Updating the &quot;Last Updated&quot; date</li>
                <li>Sending you an email notification for significant changes</li>
                <li>Providing notice through our platform</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-400">
                Your continued use of AlgoMentor after any changes indicates your acceptance of the updated Privacy Policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data 
                practices, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-400 mb-2"><strong>Email:</strong> privacy@algomentor.com</p>
                <p className="text-gray-700 dark:text-gray-400 mb-2"><strong>Support:</strong> support@algomentor.com</p>
                <p className="text-gray-700 dark:text-gray-400 mb-2">
                  <strong>GitHub:</strong> 
                  <a 
                    href="https://github.com/jatinkaushik-jk/algo-mentor" 
                    className="text-blue-600 hover:text-blue-800 ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/jatinkaushik-jk/algo-mentor
                  </a>
                </p>
                <p className="text-gray-700 dark:text-gray-400">
                  We will respond to your inquiries within a reasonable timeframe, typically within 30 days.
                </p>
              </div>
            </section>

            {/* Legal Compliance */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Legal Compliance</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                This Privacy Policy is designed to comply with applicable privacy laws and regulations, including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>General Data Protection Regulation (GDPR)</li>
                <li>California Consumer Privacy Act (CCPA)</li>
                <li>Children&apos;s Online Privacy Protection Act (COPPA)</li>
                <li>Family Educational Rights and Privacy Act (FERPA)</li>
                <li>Other applicable local and international privacy laws</li>
              </ul>
            </section>

            {/* Footer */}
            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500 mb-4">
                This Privacy Policy is part of our commitment to transparency and user privacy. 
                Thank you for trusting AlgoMentor with your learning journey.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </Link>
                <Link href="/terms-of-service" className="text-blue-600 hover:text-blue-800">
                  Terms of Service
                </Link>
                <Link href="/contact" className="text-blue-600 hover:text-blue-800">
                  Contact Us
                </Link>
                <Link href="/support" className="text-blue-600 hover:text-blue-800">
                  Support
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
  )
}

export default PrivacyPolicyPage