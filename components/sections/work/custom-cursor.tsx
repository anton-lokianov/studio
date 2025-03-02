import { MotionValue, motion, AnimatePresence } from "motion/react";
import { memo } from "react";

export const CustomCursor = memo(
  ({
    smoothX,
    smoothY,
    cursorScale,
    isVisible,
  }: {
    smoothX: MotionValue<number>;
    smoothY: MotionValue<number>;
    cursorScale: MotionValue<number>;
    isVisible: boolean;
  }) => {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="pointer-events-none absolute z-50"
            style={{
              left: smoothX,
              top: smoothY,
              x: "-50%",
              y: "-50%",
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
    );
  }
);

CustomCursor.displayName = "CustomCursor";
