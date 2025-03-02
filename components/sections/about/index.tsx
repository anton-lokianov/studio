import React from "react";
import FadeInView from "@/components/ui/fadeIn-view";
export const AboutSection = () => {
  return (
    <section className="py-10 lg:py-2">
      <FadeInView
        className=""
        y={80}
        inViewOptions={{ amount: 0.2, once: true }}
        exitViewAnimation
      >
        <div className="space-y-12 text-balance bg-gradient-to-tl from-blue-500 to-pink-500 bg-clip-text py-3 text-[clamp(2.2rem,5.5vw,4.6rem)] font-bold text-transparent">
          <p className="text-balance leading-none">
            We blend aesthetics, functionality, and purpose to create
            exceptional designs. Every element is crafted with intention,
            delivering experiences that connect with audiences and endure.
          </p>
          <p className="text-balance leading-none">
            Our collaborative approach puts your vision first, while our
            expertise guides the journey from concept to reality. We help
            businesses build meaningful connections through compelling digital
            experiences that drive results.
          </p>
        </div>
      </FadeInView>
    </section>
  );
};
