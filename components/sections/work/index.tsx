"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
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
  const lastUpdateRef = useRef(0);
  const isMobile = useMedia("(max-width: 768px)", false);

  const [isMouseOutsideWhileScrolling, setIsMouseOutsideWhileScrolling] =
    useState(false);
  const [showCustomCursor, setShowCustomCursor] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end end"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [isMobile ? 0.95 : 0.84, 1],
    {
      clamp: true,
    }
  );

  // Optimize spring config for better performance
  const springConfig = { damping: 35, stiffness: 400 };
  const smoothX = useSpring(0, springConfig);
  const smoothY = useSpring(0, springConfig);
  const cursorScale = useMotionValue(1 / 0.82);

  // Update scale ref when scale changes
  useEffect(() => {
    const unsubscribe = scale.on("change", (value) => {
      currentScaleRef.current = value;
      cursorScale.set(1 / value);
    });
    return () => unsubscribe();
  }, [scale, cursorScale]);

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

  // Throttled cursor position update using useCallback and useRef
  const updateCursorPosition = useCallback(
    (clientX: number, clientY: number) => {
      const now = Date.now();
      if (now - lastUpdateRef.current < 16) return; // ~60fps throttle

      if (containerRef.current && isHoveringRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (isMouseInBounds(clientX, clientY)) {
          const x = clientX - rect.left;
          const y = clientY - rect.top;
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
      lastUpdateRef.current = now;
    },
    [isMouseInBounds, smoothX, smoothY]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      updateCursorPosition(e.clientX, e.clientY);
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

  // Optimized scroll handler with RAF
  useEffect(() => {
    const controller = new AbortController();
    let rafId: number | null = null;

    const handleScrollEnd = () => {
      isScrollingRef.current = false;
      setIsMouseOutsideWhileScrolling(false);
      setShowCustomCursor(isHoveringRef.current);
    };

    const handleScroll = () => {
      // Cancel any pending scroll end
      if (typeof scrollTimeoutRef.current === "number") {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      // Cancel any pending RAF
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      rafId = window.requestAnimationFrame(() => {
        if (!isScrollingRef.current) {
          isScrollingRef.current = true;
          setShowCustomCursor(false);
        }

        if (
          isHoveringRef.current &&
          typeof window.mouseX === "number" &&
          typeof window.mouseY === "number"
        ) {
          if (!isMouseInBounds(window.mouseX, window.mouseY)) {
            setIsMouseOutsideWhileScrolling(true);
          } else {
            updateCursorPosition(window.mouseX, window.mouseY);
          }
        }

        // Set timeout for scroll end
        scrollTimeoutRef.current = window.setTimeout(handleScrollEnd, 150);
      });
    };

    // Throttled mouse position tracking
    const trackMousePosition = (e: MouseEvent) => {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;

      if (isScrollingRef.current && containerRef.current) {
        if (rafId !== null) {
          window.cancelAnimationFrame(rafId);
        }
        rafId = window.requestAnimationFrame(() => {
          const newValue = !isMouseInBounds(e.clientX, e.clientY);
          if (newValue !== isMouseOutsideWhileScrolling) {
            setIsMouseOutsideWhileScrolling(newValue);
            setShowCustomCursor(!newValue && isHoveringRef.current);
          }
        });
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
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [isMouseInBounds, isMouseOutsideWhileScrolling, updateCursorPosition]);

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
