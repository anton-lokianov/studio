"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import Image from "next/image";

// Extend Window interface to include our custom properties
declare global {
  interface Window {
    mouseX?: number;
    mouseY?: number;
  }
}

export const WorkSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  // Replace state with ref for scale tracking
  const currentScaleRef = useRef(0.82);

  const [isMouseOutsideWhileScrolling, setIsMouseOutsideWhileScrolling] =
    useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);

  // Create a motion value for cursor scale that depends on the container scale
  const cursorScale = useMotionValue(1 / 0.82);

  // Update scale ref when scale changes instead of using state
  useEffect(() => {
    const unsubscribe = scale.on("change", (value) => {
      currentScaleRef.current = value;
      // Update cursor scale motion value when container scale changes
      cursorScale.set(1 / value);
    });

    return () => unsubscribe();
  }, [scale, cursorScale]);

  // Smooth spring animation for cursor movement
  const springConfig = { damping: 25, stiffness: 300 };
  const smoothX = useSpring(0, springConfig);
  const smoothY = useSpring(0, springConfig);

  // Check if mouse is within container bounds
  const isMouseInBounds = (clientX: number, clientY: number) => {
    if (!containerRef.current) return false;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    return x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
  };

  // Update cursor position based on mouse coordinates
  const updateCursorPosition = (clientX: number, clientY: number) => {
    if (containerRef.current && isHovering) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (isMouseInBounds(clientX, clientY)) {
        // Use ref value instead of state
        const scaleCompensatedX = x / currentScaleRef.current;
        const scaleCompensatedY = y / currentScaleRef.current;

        smoothX.set(scaleCompensatedX);
        smoothY.set(scaleCompensatedY);

        if (isScrolling) {
          setIsMouseOutsideWhileScrolling(false);
        }
      } else if (isScrolling) {
        setIsMouseOutsideWhileScrolling(true);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updateCursorPosition(e.clientX, e.clientY);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    setIsMouseOutsideWhileScrolling(false);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (isScrolling) {
      setIsMouseOutsideWhileScrolling(true);
    }
  };

  // Add scroll event listener to update cursor position on scroll
  useEffect(() => {
    const controller = new AbortController();
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      // Set scrolling state to true
      setIsScrolling(true);

      // Clear any existing timeout
      clearTimeout(scrollTimer);

      if (
        isHovering &&
        containerRef.current &&
        window.mouseX &&
        window.mouseY
      ) {
        // Check if mouse is still over the container during scroll
        if (!isMouseInBounds(window.mouseX, window.mouseY)) {
          setIsMouseOutsideWhileScrolling(true);
        } else {
          updateCursorPosition(window.mouseX, window.mouseY);
        }
      }

      // Set a timeout to reset scrolling state after scrolling stops
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
        setIsMouseOutsideWhileScrolling(false);
      }, 150);
    };

    // Track mouse position globally
    const trackMousePosition = (e: MouseEvent) => {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;

      // Update mouse outside state while scrolling
      if (isScrolling && containerRef.current) {
        setIsMouseOutsideWhileScrolling(!isMouseInBounds(e.clientX, e.clientY));
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
      signal: controller.signal,
    });

    window.addEventListener("mousemove", trackMousePosition, {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
      clearTimeout(scrollTimer);
    };
  }, [isHovering, isScrolling]);

  // Determine cursor style
  const getCursorStyle = () => {
    if (isScrolling && isMouseOutsideWhileScrolling) {
      return "auto"; // Show default cursor when scrolling AND mouse is outside
    } else if (isHovering) {
      return "none"; // Hide cursor when hovering (show custom cursor)
    } else {
      return "auto"; // Default cursor in all other cases
    }
  };

  return (
    <section ref={sectionRef} className="relative">
      <div className="absolute -inset-0 bg-gradient-to-r from-pink-700/30 to-blue-700/30 blur-3xl" />
      <motion.div
        style={{ scale }}
        className="relative h-[400px] w-full rounded-xl bg-gradient-to-r from-gray-600 via-blue-600 to-pink-600 p-[2px] sm:aspect-video sm:h-screen"
      >
        <div
          ref={containerRef}
          className="relative h-full w-full overflow-hidden rounded-xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={{ cursor: getCursorStyle() }}
        >
          <Image
            src="/app2.png"
            alt="project-1"
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
            className="rounded-xl object-cover"
          />
          <div className="absolute inset-0 z-10 rounded-xl opacity-70 shadow-[inset_0_-100px_130px_000px_#000]" />

          {/* Custom cursor element */}
          <AnimatePresence>
            {isHovering && !(isScrolling && isMouseOutsideWhileScrolling) && (
              <motion.div
                className="pointer-events-none absolute z-50"
                style={{
                  left: smoothX,
                  top: smoothY,
                  x: "-50%",
                  y: "-50%",
                  // Apply the inverse scale to the cursor to maintain correct size
                  scale: cursorScale,
                  transformOrigin: "center center",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0 }}
              >
                <div className="rounded-xl bg-gradient-to-r from-blue-500/40 to-pink-500/40 p-[1.5px] shadow-lg">
                  <div className="rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 backdrop-blur-sm">
                    <p className="text-sm font-medium text-white drop-shadow-sm">
                      let&apos;s work together{" "}
                      <span className="text-yellow-500">✦</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
