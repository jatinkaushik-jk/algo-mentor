import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-50 px-10 py-12 dark:bg-gray-950">
      <div className="container mx-auto flex max-w-4xl flex-col-reverse items-center gap-8 md:flex-row md:gap-12 lg:gap-20">
        <div className="flex flex-1 flex-col items-center justify-center space-y-4 text-center md:items-start md:text-left">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Oops! Page not found.
          </h1>
          <p className="max-w-[450px] text-gray-500 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            prefetch={false}
          >
            Go to Homepage
          </Link>
        </div>
        <div className="flex flex-1 justify-center">
          <Image
            src="/images/404.svg"
            width={500}
            height={500}
            alt="404 Illustration"
            className="max-w-[300px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px]"
            style={{ aspectRatio: "3/2", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}
