"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  animate,
} from "motion/react";
import { InteractiveContainer } from "./interactive-container";
import { useMedia } from "react-use";

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
  const isHoveringRef = useRef(false);
  const isScrollingRef = useRef(false);
  const currentScaleRef = useRef(0.82);
  const scrollTimeoutRef = useRef<number>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMedia("(max-width: 768px)", false);

  const [isMouseOutsideWhileScrolling, setIsMouseOutsideWhileScrolling] =
    useState(false);
  const [showCustomCursor, setShowCustomCursor] = useState(false);

  // Optimize scroll tracking with lower update rate
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end end"],
  });

  // Optimize transform with lower precision
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [isMobile ? 0.95 : 0.84, 1],
    {
      clamp: true,
    }
  );

  // Optimize spring animations with lower precision and better performance
  const springConfig = {
    damping: prefersReducedMotion ? 50 : 35,
    stiffness: prefersReducedMotion ? 500 : 400,
    mass: 1,
    restSpeed: 0.01,
    restDelta: 0.01,
  };

  const smoothX = useSpring(0, springConfig);
  const smoothY = useSpring(0, springConfig);
  const cursorScale = useMotionValue(1 / 0.82);

  // Update scale ref when scale changes
  useEffect(() => {
    const unsubscribe = scale.on("change", (value) => {
      currentScaleRef.current = value;
      // Only update cursor scale if custom cursor is visible
      if (showCustomCursor) {
        cursorScale.set(1 / value);
      }
    });
    return () => unsubscribe();
  }, [scale, cursorScale, showCustomCursor]);

  // Memoize isMouseInBounds function
  const isMouseInBounds = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return false;
    const rect = containerRef.current.getBoundingClientRect();
    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  }, []);

  // Optimized cursor position update using Framer Motion's animate
  const updateCursorPosition = useCallback(
    (clientX: number, clientY: number) => {
      if (containerRef.current && isHoveringRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (isMouseInBounds(clientX, clientY)) {
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          const scaleCompensatedX = x / currentScaleRef.current;
          const scaleCompensatedY = y / currentScaleRef.current;

          // Use Framer Motion's animate for smoother transitions
          animate(smoothX, scaleCompensatedX, {
            type: "tween",
            duration: 0.15,
            ease: "circOut",
          });
          animate(smoothY, scaleCompensatedY, {
            type: "tween",
            duration: 0.15,
            ease: "circOut",
          });

          if (isScrollingRef.current) {
            setIsMouseOutsideWhileScrolling(false);
          }
        } else if (isScrollingRef.current) {
          setIsMouseOutsideWhileScrolling(true);
        }
      }
    },
    [isMouseInBounds, smoothX, smoothY]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isScrollingRef.current) {
        updateCursorPosition(e.clientX, e.clientY);
      }
    },
    [updateCursorPosition]
  );

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    setIsMouseOutsideWhileScrolling(false);
    setShowCustomCursor(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    if (isScrollingRef.current) {
      setIsMouseOutsideWhileScrolling(true);
    }
    setShowCustomCursor(false);
  }, []);

  // Optimized scroll handler with debounced updates
  useEffect(() => {
    const controller = new AbortController();

    const handleScrollEnd = () => {
      isScrollingRef.current = false;
      setIsMouseOutsideWhileScrolling(false);
      setShowCustomCursor(isHoveringRef.current);
    };

    const handleScroll = () => {
      if (typeof scrollTimeoutRef.current === "number") {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        setShowCustomCursor(false);
      }

      // Debounce scroll end
      scrollTimeoutRef.current = window.setTimeout(handleScrollEnd, 150);
    };

    // Optimized mouse position tracking
    const trackMousePosition = (e: MouseEvent) => {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;

      if (isScrollingRef.current && containerRef.current) {
        const newValue = !isMouseInBounds(e.clientX, e.clientY);
        if (newValue !== isMouseOutsideWhileScrolling) {
          setIsMouseOutsideWhileScrolling(newValue);
          setShowCustomCursor(!newValue && isHoveringRef.current);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
      signal: controller.signal,
    });

    window.addEventListener("mousemove", trackMousePosition, {
      passive: true,
      signal: controller.signal,
    });

    return () => {
      controller.abort();
      if (typeof scrollTimeoutRef.current === "number") {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isMouseInBounds, isMouseOutsideWhileScrolling]);

  const getCursorStyle = useCallback(() => {
    if (isScrollingRef.current && isMouseOutsideWhileScrolling) {
      return "auto";
    } else if (isHoveringRef.current) {
      return "none";
    }
    return "auto";
  }, [isMouseOutsideWhileScrolling]);

  return (
    <section ref={sectionRef} className="relative will-change-transform">
      <div className="absolute -inset-0 bg-gradient-to-r from-pink-700/30 to-blue-700/30 blur-3xl" />
      <motion.div
        style={{ scale }}
        initial={false}
        className="relative h-[530px] w-full rounded-xl bg-gradient-to-r from-gray-600 via-blue-600 to-pink-600 p-[2px] will-change-transform sm:aspect-video sm:h-[42rem]"
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
