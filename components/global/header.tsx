import React from "react";
import { GradientButton } from "../ui/gradient-button";
import FadeInView from "../ui/fadeIn-view";

export const Header = () => {
  return (
    <FadeInView y={-20}>
      <header className="flex h-24 items-center justify-between">
        <h1 className="text-xl font-bold md:text-2xl">
          <span className="bg-gradient-to-tr from-pink-500 to-blue-500 bg-clip-text text-transparent">
            AL
          </span>{" "}
          <span className="">studio</span>
        </h1>
        <div className="flex items-center gap-2">
          <GradientButton>Get in touch</GradientButton>
        </div>
      </header>
    </FadeInView>
  );
};
