const Footer = () => {
  return (
    <footer className="p-8 pb-4">
      <div className="text-center flex gap-6 flex-wrap items-center justify-between text-gray-600 dark:text-gray-400">
        <p className="text-sm">
          © {new Date().getFullYear()} AlgoMentor | All rights reserved.
        </p>
        <div className="flex justify-center items-center gap-4">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
