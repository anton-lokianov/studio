"use client";

import React from "react";
import { TestimonialCard } from "./testimonial-card";
import { testimonials } from "@/lib/constants";
import { useMedia } from "react-use";
import { cn } from "@/lib/utils";
import { MarqueeSection } from "../marquee";

export const TestimoniesSection = () => {
  const isMobile = useMedia("(max-width: 768px)");
  const displayedTestimonials = isMobile
    ? testimonials.slice(0, 5)
    : testimonials;

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-20">
      <div className="w-full max-w-2xl text-balance font-extrabold">
        <h2 className="text-center text-lg md:text-xl">
          Elevate your brand with our services
        </h2>
        <p className="text-md text-center text-gray-500 md:text-xl">
          Supporting your brand with the best services and products and
          establishing brands on their journey to success.
        </p>
      </div>
      <MarqueeSection />

      <div className="relative mx-auto mt-6 w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-4">
          {displayedTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={cn(
                testimonial.id === 1 && "lg:col-span-2",
                testimonial.id === 2 && "lg:col-start-3",
                testimonial.id === 3 && "lg:row-start-2",
                testimonial.id === 4 && "lg:col-span-2 lg:row-start-2",
                testimonial.id === 5 && "lg:row-start-3",
                testimonial.id === 6 && "lg:row-start-3",
                testimonial.id === 8 && "lg:col-span-2",
                testimonial.id === 9 && "sm:col-span-2 lg:col-span-1"
              )}
            >
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 opacity-60 shadow-[inset_0_-150px_100px_0px_#0a0a0a]" />
      </div>
    </section>
  );
};
