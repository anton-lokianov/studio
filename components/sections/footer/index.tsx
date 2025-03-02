import FadeInView from "@/components/ui/fadeIn-view";
import React from "react";

export const FooterSection = () => {
  return (
    <footer className="mb-24 lg:mb-0 lg:py-14">
      <FadeInView
        inViewOptions={{
          amount: 0.5,
        }}
        className="w-full max-w-screen-lg px-2"
      >
        <p className="flex w-full flex-wrap py-2 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          Connect me on{", "}
          <a
            className="group relative inline-flex items-center"
            href="https://www.linkedin.com/in/anton-lokianov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {"(LinkedIn)"}
            <span className="absolute inset-0 z-10 inline-block h-full w-0 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent transition-all duration-300 group-hover:w-full">
              {"(LinkedIn)"}
            </span>
          </a>
          Drop a message at{", "}
          <a
            className="group relative inline-block break-all"
            href="mailto:antonlokianov@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {"(Gmail)"}
            <span className="absolute inset-0 z-10 inline-block h-full w-0 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent transition-all duration-300 group-hover:w-full">
              {"(Gmail)"}
            </span>
          </a>
        </p>
      </FadeInView>
    </footer>
  );
};
