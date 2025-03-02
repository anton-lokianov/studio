import { MotionValue } from "motion/react";
import Image from "next/image";
import { memo } from "react";
import { CustomCursor } from "./custom-cursor";

export const InteractiveContainer = memo(
  ({
    containerRef,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    cursorStyle,
    showCustomCursor,
    smoothX,
    smoothY,
    cursorScale,
  }: {
    containerRef: React.RefObject<HTMLDivElement | null>;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onMouseMove: (e: React.MouseEvent) => void;
    cursorStyle: string;
    showCustomCursor: boolean;
    smoothX: MotionValue<number>;
    smoothY: MotionValue<number>;
    cursorScale: MotionValue<number>;
  }) => {
    return (
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden rounded-xl"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        style={{ cursor: cursorStyle }}
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

        <CustomCursor
          smoothX={smoothX}
          smoothY={smoothY}
          cursorScale={cursorScale}
          isVisible={showCustomCursor}
        />
      </div>
    );
  }
);

InteractiveContainer.displayName = "InteractiveContainer";
