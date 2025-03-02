"use client";

import React, { useRef } from "react";
import {
  motion,
  useInView,
  HTMLMotionProps,
  Transition,
  Variant,
  Variants,
  TargetAndTransition,
  UseInViewOptions,
  useScroll,
  useTransform,
  UseScrollOptions,
} from "motion/react";
import { cn } from "@/lib/utils";

type ExitViewAnimationOptions = {
  offset: UseScrollOptions["offset"];
};

type FadeInViewProps = Omit<HTMLMotionProps<"div">, "variants"> & {
  children: React.ReactNode;
  inViewOptions?: UseInViewOptions;
  exit?: TargetAndTransition | Variant;
  transition?: Transition;
  variants?: Variants;
  x?: number | string;
  y?: number | string;
  opacity?: number;
  className?: string;
  exitViewAnimation?: boolean;
  exitViewAnimationOptions?: ExitViewAnimationOptions;
};

const FadeInView = ({
  children,
  inViewOptions = { once: false },
  exit,
  transition = { duration: 0.5 },
  variants,
  x = 0,
  y = 0,
  opacity = 1,
  className,
  exitViewAnimation = false,
  exitViewAnimationOptions = {
    offset: ["end start", "end end"],
  },
  ...rest
}: FadeInViewProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(targetRef, inViewOptions);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: exitViewAnimationOptions.offset,
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const defaultVariants: Variants = {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: opacity,
      x: 0,
      y: 0,
      transition,
    },
  };

  return (
    <motion.div
      ref={targetRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit={exit}
      variants={variants || defaultVariants}
      className={cn(className)}
      {...rest}
    >
      {exitViewAnimation && (
        <motion.div
          ref={scrollRef}
          className=""
          style={{ opacity: scrollOpacity }}
        >
          {children}
        </motion.div>
      )}
      {!exitViewAnimation && children}
    </motion.div>
  );
};

export default FadeInView;
