"use client";

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  useSmoothScroll();

  return <>{children}</>;
};

export default SmoothScrollProvider;
