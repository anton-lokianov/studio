"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";

export default function NotFound() {
  const controls = useAnimation();

  // Motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform values for different elements
  const titleX = useTransform(mouseX, [-500, 500], [20, -20]);
  const titleY = useTransform(mouseY, [-500, 500], [20, -20]);

  const glowX = useTransform(mouseX, [-500, 500], [-10, 10]);
  const glowY = useTransform(mouseY, [-500, 500], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update mouse position for framer-motion
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Start animations
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, controls]);

  // Generate stars with staggered animation
  const generateStars = () => {
    return Array.from({ length: 50 }).map((_, i) => {
      const size = Math.random() * 4 + 1;
      const delay = Math.random() * 0.5;

      return (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, Math.random() * 0.8 + 0.2, 0] }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
          style={{
            width: size,
            height: size,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      );
    });
  };

  return (
    <motion.main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-black to-blue-900/40 p-4 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">{generateStars()}</div>

      {/* Main content */}
      <motion.div
        className="relative z-10 mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
      >
        <motion.h1
          className="mb-4 bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-9xl font-bold text-transparent"
          style={{ x: titleX, y: titleY }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          404
        </motion.h1>

        <div className="relative mb-8">
          <motion.div
            className="absolute inset-0 rounded-full bg-pink-800 opacity-30 blur-xl"
            style={{ x: glowX, y: glowY }}
          />
          <motion.h2
            className="relative mb-6 text-2xl font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Houston, we have a problem!
          </motion.h2>
          <motion.p
            className="relative mb-8 text-gray-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            The page you&apos;re looking for has drifted into deep space or
            never existed in the first place.
          </motion.p>
        </div>

        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-pink-500 opacity-75 blur"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/"
              className="group relative inline-block rounded-lg border border-blue-500 bg-black px-6 py-3 transition-all duration-300 hover:border-pink-500"
            >
              <span className="relative text-white">Return to home base</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating astronaut */}
    </motion.main>
  );
}
