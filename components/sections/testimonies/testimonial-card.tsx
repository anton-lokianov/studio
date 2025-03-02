import FadeInView from "@/components/ui/fadeIn-view";
import { Testimonial } from "@/lib/constants";
import React from "react";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

const StarIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="star-gradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
    </defs>
    <path
      fill="url(#star-gradient)"
      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
    />
  </svg>
);

export const TestimonialCard = ({
  testimonial: { name, role, company, content, image },
}: TestimonialCardProps) => {
  return (
    <FadeInView inViewOptions={{ once: false, amount: 0.3 }}>
      <article className="grid h-full min-h-60 gap-6 rounded-lg border border-gray-800 bg-gradient-to-r from-black via-blue-800/30 to-blue-900/30 p-4">
        <header>
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <StarIcon key={index} />
            ))}
          </div>
        </header>

        <main className="flex-1">
          <p className="text-gray-400">{content}</p>
        </main>

        <footer className="flex items-center gap-4">
          <img
            src={image}
            alt={`${name}'s profile picture`}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-400">
              {role} at {company}
            </p>
          </div>
        </footer>
      </article>
    </FadeInView>
  );
};
