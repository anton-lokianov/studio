"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "motion/react";
import { InteractiveContainer } from "./interactive-container";

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
  // Replace state with refs
  const isHoveringRef = useRef(false);
  const isScrollingRef = useRef(false);
  const currentScaleRef = useRef(0.82);

  const [isMouseOutsideWhileScrolling, setIsMouseOutsideWhileScrolling] =
    useState(false);
  const [showCustomCursor, setShowCustomCursor] = useState(false);

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
    if (containerRef.current && isHoveringRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (isMouseInBounds(clientX, clientY)) {
        // Use ref value instead of state
        const scaleCompensatedX = x / currentScaleRef.current;
        const scaleCompensatedY = y / currentScaleRef.current;

        smoothX.set(scaleCompensatedX);
        smoothY.set(scaleCompensatedY);

        if (isScrollingRef.current) {
          setIsMouseOutsideWhileScrolling(false);
        }
      } else if (isScrollingRef.current) {
        setIsMouseOutsideWhileScrolling(true);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updateCursorPosition(e.clientX, e.clientY);
  };

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    setIsMouseOutsideWhileScrolling(false);
    updateCursorVisibility();
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    if (isScrollingRef.current) {
      setIsMouseOutsideWhileScrolling(true);
    }
    updateCursorVisibility();
  };

  // Update the cursor visibility based on current state
  const updateCursorVisibility = () => {
    setShowCustomCursor(
      isHoveringRef.current &&
        !(isScrollingRef.current && isMouseOutsideWhileScrolling)
    );
  };

  // Add scroll event listener to update cursor position on scroll
  useEffect(() => {
    const controller = new AbortController();
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      // Set scrolling ref to true
      isScrollingRef.current = true;
      updateCursorVisibility();

      // Clear any existing timeout
      clearTimeout(scrollTimer);

      if (
        isHoveringRef.current &&
        containerRef.current &&
        window.mouseX &&
        window.mouseY
      ) {
        // Check if mouse is still over the container during scroll
        if (!isMouseInBounds(window.mouseX, window.mouseY)) {
          setIsMouseOutsideWhileScrolling(true);
          updateCursorVisibility();
        } else {
          updateCursorPosition(window.mouseX, window.mouseY);
        }
      }

      // Set a timeout to reset scrolling state after scrolling stops
      scrollTimer = setTimeout(() => {
        isScrollingRef.current = false;
        setIsMouseOutsideWhileScrolling(false);
        updateCursorVisibility();
      }, 150);
    };

    // Track mouse position globally
    const trackMousePosition = (e: MouseEvent) => {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;

      // Update mouse outside state while scrolling
      if (isScrollingRef.current && containerRef.current) {
        const newValue = !isMouseInBounds(e.clientX, e.clientY);
        if (newValue !== isMouseOutsideWhileScrolling) {
          setIsMouseOutsideWhileScrolling(newValue);
          updateCursorVisibility();
        }
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
  }, [isMouseOutsideWhileScrolling]);

  // Determine cursor style
  const getCursorStyle = () => {
    if (isScrollingRef.current && isMouseOutsideWhileScrolling) {
      return "auto"; // Show default cursor when scrolling AND mouse is outside
    } else if (isHoveringRef.current) {
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
        <InteractiveContainer
          containerRef={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          cursorStyle={getCursorStyle()}
          showCustomCursor={showCustomCursor}
          smoothX={smoothX}
          smoothY={smoothY}
          cursorScale={cursorScale}
        />
      </motion.div>
    </section>
  );
};
