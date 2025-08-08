import Link from 'next/link';
import { Metadata } from 'next';
import { ModeToggle } from '@/components/ui/mode-toggle';

export const metadata : Metadata = {
    title: "AlgoMentor | Terms of Service",
    description: "Terms of Service for AlgoMentor - Socratic AI-driven platform for learning algorithms. Read our terms and conditions for using the platform."
}
const TermsOfServicePage = () => {
  const lastUpdated = "August 8, 2025";
  const effectiveDate = "August 8, 2025";

  return (
    <>
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
              <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
              <p className="text-gray-600 dark:text-gray-500">
                <strong>Last Updated:</strong> {lastUpdated}
              </p>
              <p className="text-gray-600 dark:text-gray-500">
                <strong>Effective Date:</strong> {effectiveDate}
              </p>
            </div>

            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction and Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                Welcome to AlgoMentor (&quot;we,&quot; &quot;our,&quot; &quot;us,&quot; or &quot;Platform&quot;), a Socratic AI-driven educational 
                platform designed to help users learn algorithms through interactive conversations powered by 
                Google&apos;s Gemini AI model. These Terms of Service (&quot;Terms&quot;) govern your use of our website, 
                mobile application, and related services (collectively, the &quot;Service&quot;).
              </p>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                By accessing or using AlgoMentor, you agree to be bound by these Terms and our Privacy Policy, 
                which is incorporated by reference. If you disagree with any part of these Terms, you may not 
                access the Service.
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                We reserve the right to update these Terms at any time. Your continued use of the Service after 
                any changes indicates your acceptance of the new Terms.
              </p>
            </section>

            {/* Service Description */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                AlgoMentor provides:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li><strong>Socratic Learning:</strong> AI-driven conversations that guide you through algorithm concepts using questioning techniques</li>
                <li><strong>Interactive Education:</strong> Real-time feedback and personalized learning experiences</li>
                <li><strong>Algorithm Coverage:</strong> Instruction on sorting algorithms, searching algorithms, and data structures</li>
                <li><strong>Progress Tracking:</strong> Maintenance of your learning history and conversation records</li>
                <li><strong>Adaptive Learning:</strong> Content that adjusts to your skill level and learning pace</li>
                <li><strong>Community Features:</strong> Collaborative learning opportunities with other users</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-400">
                Our Service is powered by Google&apos;s Gemini AI model and uses advanced natural language processing 
                to create educational conversations tailored to your learning needs.
              </p>
            </section>

            {/* User Eligibility */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Eligibility and Account Registration</h2>

              <h3 className="text-xl font-medium mb-3">Eligibility Requirements</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                You must meet the following requirements to use AlgoMentor:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Be at least 13 years of age (users under 18 require parental consent)</li>
                <li>Have the legal capacity to enter into binding agreements</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Account Responsibilities</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                When you create an account, you agree to:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Provide truthful, accurate, and complete information</li>
                <li>Maintain and update your account information as needed</li>
                <li>Keep your login credentials confidential</li>
                <li>Notify us immediately of any unauthorized account access</li>
                <li>Be responsible for all activities that occur under your account</li>
              </ul>
            </section>

            {/* Acceptable Use */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use Policy</h2>

              <h3 className="text-xl font-medium mb-3">Permitted Uses</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                You may use AlgoMentor for:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Learning algorithms and data structures through Socratic dialogue</li>
                <li>Engaging in educational conversations with our AI mentor</li>
                <li>Tracking your learning progress and reviewing conversation history</li>
                <li>Participating in community discussions and collaborative learning</li>
                <li>Personal educational and skill development purposes</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Prohibited Uses</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                You agree NOT to use AlgoMentor for:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Any illegal, harmful, or fraudulent activities</li>
                <li>Attempting to hack, breach, or compromise our systems or security</li>
                <li>Uploading viruses, malware, or other malicious content</li>
                <li>Harassing, abusing, or threatening other users or our staff</li>
                <li>Sharing inappropriate, offensive, or explicit content</li>
                <li>Attempting to reverse engineer or copy our AI algorithms</li>
                <li>Using automated tools or bots to access the Service</li>
                <li>Commercial purposes without explicit written permission</li>
                <li>Violating any applicable laws or regulations</li>
              </ul>
            </section>

            {/* AI Services and Limitations */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. AI Services and Educational Content</h2>

              <h3 className="text-xl font-medium mb-3">AI-Generated Content</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                AlgoMentor uses Google&apos;s Gemini AI model to provide educational content and conversations. 
                You acknowledge that:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>AI responses are generated automatically and may not always be accurate or complete</li>
                <li>AI-generated educational content is for learning purposes and should not replace formal education</li>
                <li>We continuously work to improve AI accuracy but cannot guarantee error-free responses</li>
                <li>You should verify important information through additional sources</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Educational Disclaimer</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                While AlgoMentor aims to provide high-quality educational content:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>We do not guarantee specific learning outcomes or academic success</li>
                <li>Our content supplements but does not replace formal computer science education</li>
                <li>Individual learning results may vary based on effort, prior knowledge, and other factors</li>
                <li>You are encouraged to use multiple learning resources for comprehensive understanding</li>
              </ul>
            </section>

            {/* User Content and Data */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. User Content and Learning Data</h2>

              <h3 className="text-xl font-medium mb-3">Your Learning Data</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                When you use AlgoMentor, we collect and store:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Conversation history with our AI mentor</li>
                <li>Learning progress and performance metrics</li>
                <li>Questions asked and topics studied</li>
                <li>Time spent on different algorithms and concepts</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Content License</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                By using our Service, you grant AlgoMentor:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>A license to use your learning data to improve our educational algorithms</li>
                <li>Permission to analyze conversation patterns to enhance AI responses</li>
                <li>Rights to create anonymized datasets for research and development</li>
                <li>Authority to use aggregated learning data for platform improvement</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-400">
                We will always respect your privacy and follow our Privacy Policy regarding data use.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property Rights</h2>

              <h3 className="text-xl font-medium mb-3">Platform Ownership</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                AlgoMentor and its content are protected by intellectual property laws. We own or have 
                licensed rights to:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>The AlgoMentor platform, website, and mobile application</li>
                <li>Educational content, curriculum, and learning methodologies</li>
                <li>Trademarks, logos, and brand elements</li>
                <li>Software code, algorithms, and technical implementations</li>
                <li>User interface designs and user experience elements</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Third-Party Content</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                Some content is provided by third parties, including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Google Gemini AI model and associated technologies</li>
                <li>Open-source libraries and frameworks used in development</li>
                <li>Educational resources and algorithm explanations from various sources</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">User Rights</h3>
              <p className="text-gray-700 dark:text-gray-400">
                You retain ownership of your original questions, learning goals, and personal educational content. 
                However, you grant us the right to use this content as described in these Terms and our Privacy Policy.
              </p>
            </section>

            {/* Privacy and Data Protection */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Privacy and Data Protection</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                Your privacy is important to us. Our collection, use, and protection of your personal information 
                is governed by our Privacy Policy, which forms an integral part of these Terms.
              </p>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                Key privacy aspects include:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Secure storage of learning data and conversation history in MongoDB</li>
                <li>Encryption of sensitive information in transit and at rest</li>
                <li>Limited sharing of data only as necessary for AI processing with Google</li>
                <li>Your rights to access, modify, and delete your personal information</li>
                <li>Compliance with GDPR, CCPA, COPPA, and other applicable privacy laws</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-400">
                Please review our Privacy Policy to understand how we handle your information.
              </p>
            </section>

            {/* Payment and Subscription */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Payment Terms and Subscriptions</h2>

              <h3 className="text-xl font-medium mb-3">Service Tiers</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                AlgoMentor may offer various service tiers, including:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li><strong>Free Tier:</strong> Basic access to algorithm learning with limited features</li>
                <li><strong>Premium Tier:</strong> Enhanced features, unlimited conversations, and advanced analytics</li>
                <li><strong>Educational Tier:</strong> Special pricing for students and educational institutions</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Payment Terms</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                For paid subscriptions:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>All fees are charged in advance on a monthly or annual basis</li>
                <li>Payment is due immediately upon subscription signup</li>
                <li>We reserve the right to change pricing with 30 days notice</li>
                <li>Refunds may be provided at our discretion according to our refund policy</li>
                <li>Failed payments may result in service suspension or termination</li>
              </ul>
            </section>

            {/* Service Availability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Service Availability and Modifications</h2>

              <h3 className="text-xl font-medium mb-3">Service Availability</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                While we strive to provide continuous service availability:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>We do not guarantee 100% uptime or uninterrupted access</li>
                <li>Scheduled maintenance may temporarily limit service availability</li>
                <li>Technical issues, third-party service outages, or force majeure events may cause disruptions</li>
                <li>We will provide reasonable notice for planned maintenance when possible</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Service Modifications</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                We reserve the right to:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Modify, update, or discontinue any part of the Service</li>
                <li>Add new features or remove existing features</li>
                <li>Change the user interface or user experience</li>
                <li>Update AI algorithms and educational content</li>
                <li>Implement new security measures or access controls</li>
              </ul>
            </section>

            {/* Disclaimers and Warranties */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Disclaimers and Warranties</h2>

              <h3 className="text-xl font-medium mb-3">Service Disclaimer</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                AlgoMentor is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind. We disclaim:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Any guarantees about educational outcomes or learning success</li>
                <li>Warranties regarding AI accuracy, completeness, or reliability</li>
                <li>Promises about continuous service availability or performance</li>
                <li>Guarantees about compatibility with specific devices or software</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Educational Disclaimer</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                Important educational disclaimers:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>AlgoMentor supplements but does not replace formal computer science education</li>
                <li>Success in learning algorithms depends on individual effort and aptitude</li>
                <li>AI-generated responses may contain errors or incomplete information</li>
                <li>Users should verify important concepts through additional educational resources</li>
                <li>We do not guarantee job placement or career advancement through use of our platform</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                To the fullest extent permitted by applicable law, AlgoMentor shall not be liable for:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or other intangible losses</li>
                <li>Damages resulting from use or inability to use the Service</li>
                <li>Damages caused by errors, omissions, or inaccuracies in AI-generated content</li>
                <li>Damages from unauthorized access to or alteration of your data</li>
                <li>Damages from any third-party content or services</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                Our total liability to you for all claims arising from or relating to the Service shall not exceed 
                the amount you paid us in the 12 months preceding the claim, or $100, whichever is greater.
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the 
                above limitations may not apply to you.
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">13. Indemnification</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                You agree to indemnify, defend, and hold harmless AlgoMentor, its officers, directors, employees, 
                agents, and affiliates from and against any claims, damages, obligations, losses, liabilities, 
                costs, or debt, and expenses (including attorney&apos;s fees) arising from:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Your use of and access to the Service</li>
                <li>Your violation of any term of these Terms of Service</li>
                <li>Your violation of any third-party right, including intellectual property rights</li>
                <li>Your violation of any applicable law or regulation</li>
                <li>Any claim that your content caused damage to a third party</li>
                <li>Any false or misleading information you provide</li>
              </ul>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">14. Termination</h2>

              <h3 className="text-xl font-medium mb-3">Termination by You</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                You may terminate your account and stop using AlgoMentor at any time by:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Contacting our support team to request account deletion</li>
                <li>Following the account deletion process in your user settings</li>
                <li>Simply discontinuing use of the Service</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Termination by Us</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                We may suspend or terminate your account immediately, without prior notice, if you:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Violate these Terms of Service or our Acceptable Use Policy</li>
                <li>Engage in fraudulent, illegal, or harmful activities</li>
                <li>Fail to pay required fees (for paid accounts)</li>
                <li>Pose a security risk to our platform or other users</li>
                <li>Use the Service in a way that could damage our reputation or business</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Effects of Termination</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                Upon termination of your account:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>Your access to the Service will be immediately suspended</li>
                <li>Your learning data and conversation history may be deleted</li>
                <li>You may lose access to any premium features or content</li>
                <li>Certain provisions of these Terms will survive termination (including intellectual property rights and liability limitations)</li>
              </ul>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">15. Governing Law and Dispute Resolution</h2>

              <h3 className="text-xl font-medium mb-3">Governing Law</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], 
                without regard to its conflict of law provisions.
              </p>

              <h3 className="text-xl font-medium mb-3">Dispute Resolution</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                For any disputes arising from these Terms or your use of AlgoMentor:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-400">
                <li>We encourage you to first contact our support team to resolve issues amicably</li>
                <li>If informal resolution fails, disputes will be resolved through binding arbitration</li>
                <li>Arbitration will be conducted by a reputable arbitration organization</li>
                <li>The arbitration will be held in [Your Location] or online by mutual agreement</li>
                <li>Each party will bear their own costs unless otherwise awarded by the arbitrator</li>
              </ul>
            </section>

            {/* General Provisions */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">16. General Provisions</h2>

              <h3 className="text-xl font-medium mb-3">Entire Agreement</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and 
                AlgoMentor regarding your use of the Service.
              </p>

              <h3 className="text-xl font-medium mb-3">Severability</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining 
                provisions will continue in full force and effect.
              </p>

              <h3 className="text-xl font-medium mb-3">Waiver</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                No waiver of any term or condition of these Terms shall be deemed a further or continuing 
                waiver of such term or any other term.
              </p>

              <h3 className="text-xl font-medium mb-3">Assignment</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                You may not assign or transfer these Terms or your rights hereunder without our prior written 
                consent. We may assign these Terms without restriction.
              </p>

              <h3 className="text-xl font-medium mb-3">Force Majeure</h3>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                We shall not be liable for any failure or delay in performance due to circumstances beyond our 
                reasonable control, including but not limited to acts of God, war, terrorism, strikes, or 
                government regulations.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">17. Contact Information</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-400 mb-2"><strong>Email:</strong> legal@algomentor.com</p>
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
                  We will respond to your inquiries within a reasonable timeframe, typically within 5-7 business days.
                </p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">18. Acknowledgment</h2>
              <p className="text-gray-700 dark:text-gray-400 mb-4">
                By using AlgoMentor, you acknowledge that you have read these Terms of Service, understand them, 
                and agree to be bound by them. You also acknowledge that you have read and understand our Privacy 
                Policy.
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                Thank you for choosing AlgoMentor for your algorithm learning journey. We&apos;re committed to providing 
                you with an excellent educational experience while maintaining transparent and fair terms of service.
              </p>
            </section>

            {/* Footer */}
            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500 mb-4">
                These Terms of Service are designed to create a fair and safe learning environment for all 
                AlgoMentor users while protecting both user rights and platform integrity.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </Link>
                <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
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
    </>
  );
};

export default TermsOfServicePage;
