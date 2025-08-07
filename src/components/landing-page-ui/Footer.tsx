import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-8 pb-4">
      <div className="text-center flex gap-6 flex-wrap items-center justify-between text-gray-600 dark:text-gray-400">
        <p className="text-sm">
          © {new Date().getFullYear()} AlgoMentor | All rights reserved.
        </p>
        <div className="flex justify-center items-center gap-4">
          <Link href="/privacy-policy" target="_blank">Privacy Policy</Link>
          <Link href="/terms-of-service" target="_blank">Terms of Service</Link>
          <Link href="/contact" target="_blank">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
