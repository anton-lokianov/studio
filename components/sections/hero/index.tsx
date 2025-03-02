import React from "react";
import { TextRevealCard } from "@/components/ui/text-reavel-card";

export const HeroSection = () => {
  return (
    <section className="flex min-h-[70vh] items-center">
      <div className="flex flex-col gap-1">
        <h1 className="w-full max-w-sm text-[clamp(3rem,8vw,5.4rem)] font-bold leading-none sm:max-w-screen-xl">
          Designing{" "}
          <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            incredible
          </span>{" "}
          <br /> digital experiences
        </h1>
        <TextRevealCard
          className="border-none bg-transparent"
          text="You know the business"
          revealText="We know the chemistry "
        ></TextRevealCard>
      </div>
    </section>
  );
};
