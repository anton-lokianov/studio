"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

const ServiceVideo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.6, 0.8], [1, 1.6]);
  const x = useTransform(scrollYProgress, [0.6, 0.8], ["0%", "-50%"]);

  return (
    <motion.div
      ref={containerRef}
      className="relative hidden min-h-[100vh] md:min-h-[500vh] lg:block"
    >
      <div className="flex w-full items-center md:sticky md:top-0 md:h-screen">
        <motion.div
          style={{ scale, x }}
          className="relative mx-auto aspect-[16/9] w-full before:absolute before:-inset-[2px] before:-z-10 before:rounded-lg before:bg-gradient-to-tr before:from-gray-600 before:via-blue-600 before:to-pink-600"
        >
          <div className="bg-background/80 relative h-full w-full overflow-hidden rounded-lg shadow-[inset_0_2px_15px_rgba(0,0,0,0.5),inset_0_-20px_25px_rgba(0,0,0,0.95)] backdrop-blur-sm after:absolute after:bottom-0 after:h-1/3 after:w-full after:bg-gradient-to-t after:from-black/50 after:to-transparent">
            <video
              src="/video.mp4"
              autoPlay
              muted
              loop
              className="rounded-lg object-contain mix-blend-luminosity"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceVideo;
