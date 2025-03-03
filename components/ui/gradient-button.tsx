"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SparkleProps {
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}

const Sparkle = ({ color = "#FFF", size = 2, style }: SparkleProps) => {
  return (
    <motion.span
      style={{
        position: "absolute",
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: "50%",
        ...style,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 0.5, 0],
      }}
      transition={{ duration: 0.6 }}
    />
  );
};

type GradientButtonProps = React.ComponentProps<"button">;

export const GradientButton = ({
  children,
  className,
  ...props
}: GradientButtonProps) => {
  const router = useRouter();

  const [sparkles, setSparkles] = useState<
    Array<{ id: number; style: React.CSSProperties }>
  >([]);

  const addSparkle = () => {
    const sparkle = {
      id: Math.random(),
      style: {
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
      },
    };
    setSparkles((prev) => [...prev, sparkle]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
    }, 600);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const buttonElement = document.querySelector(".sparkle-button");
    const controller = new AbortController();

    const handleMouseEnter = () => {
      intervalId = setInterval(addSparkle, 70);
    };

    const handleMouseLeave = () => {
      clearInterval(intervalId);
      setSparkles([]);
    };

    if (buttonElement) {
      buttonElement.addEventListener("mouseenter", handleMouseEnter, {
        signal: controller.signal,
      });
      buttonElement.addEventListener("mouseleave", handleMouseLeave, {
        signal: controller.signal,
      });
    }

    return () => {
      controller.abort();
      clearInterval(intervalId);
    };
  }, []);

  return (
    <button
      role="link"
      {...props}
      onClick={() => router.push("/contact")}
      className={cn(
        "sparkle-button relative animate-shimmer overflow-hidden rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 py-1 font-medium text-slate-200 transition-all duration-300 before:absolute before:inset-0 before:rounded-md before:opacity-0 before:shadow-[inset_0_-40px_35px_-40px_#3b82f6] before:transition-opacity before:duration-300 hover:scale-110 hover:border-gray-600 hover:before:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
    >
      {sparkles.map(({ id, style }) => (
        <Sparkle key={id} style={style} />
      ))}
      {children}
    </button>
  );
};
