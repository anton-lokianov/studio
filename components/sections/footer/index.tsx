import FadeInView from "@/components/ui/fadeIn-view";
import Link from "next/link";
import React from "react";

export const FooterSection = () => {
  return (
    <footer className="mb-28 lg:mb-0 lg:py-14">
      <FadeInView
        inViewOptions={{
          amount: 0.5,
        }}
        className="w-full max-w-screen-lg px-2"
      >
        <p className="py-2 text-2xl font-bold text-white sm:text-3xl md:text-5xl lg:text-6xl">
          Connect me on{" "}
          <Link
            className="group relative inline-flex items-center"
            href="https://www.linkedin.com/in/anton-lokianov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {"(LinkedIn)"}
            <span className="absolute inset-0 z-10 inline-block h-full w-0 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent transition-all duration-300 group-hover:w-full">
              {"(LinkedIn)"}
            </span>
          </Link>
          <br className="sm:hidden" />
          {", "}
          Drop a message at{" "}
          <Link
            className="group relative inline-flex items-center"
            href="mailto:antonlokianov@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="relative">{"(antonlokianov@gmail.com)"}</span>
            <span className="absolute inset-0 z-10 inline-block h-[110%] w-0 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent transition-all duration-300 group-hover:w-full">
              {"(antonlokianov@gmail.com)"}
            </span>
          </Link>
        </p>
      </FadeInView>
    </footer>
  );
};
