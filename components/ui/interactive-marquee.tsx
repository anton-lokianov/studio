"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  PanInfo,
  MotionValue,
} from "framer-motion";
import normalizeWheel from "normalize-wheel";
import { useRafLoop } from "react-use";
import { useWindowSize } from "@react-hook/window-size";
import { cn } from "@/lib/utils";

type MarqueeItemProps = {
  children: React.ReactNode;
  speed: MotionValue<number>;
  direction?: "left" | "right" | "up" | "down";
  index: number;
};

const MarqueeItem: React.FC<MarqueeItemProps> = (props) => {
  const { children, speed, direction = "left", index } = props;

  const itemRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const x = useRef(0);
  const y = useRef(0);
  const [width, height] = useWindowSize();

  const setPosition = () => {
    if (!itemRef.current || !rectRef.current) {
      return;
    }

    const isHorizontal = direction === "left" || direction === "right";
    const isVertical = direction === "up" || direction === "down";

    if (isHorizontal) {
      const xPercentage = (x.current / rectRef.current.width) * 100;

      // Reset position when item moves out of view for infinite loop effect
      if (direction === "left") {
        if (xPercentage < -100) {
          x.current = 0;
        }

        if (xPercentage > 0) {
          x.current = -rectRef.current.width;
        }
      } else {
        if (xPercentage > 100) {
          x.current = 0;
        }

        if (xPercentage < 0) {
          x.current = rectRef.current.width;
        }
      }

      itemRef.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
    } else if (isVertical) {
      const yPercentage = (y.current / rectRef.current.height) * 100;

      // Reset position when item moves out of view for infinite loop effect - using same logic as horizontal
      if (direction === "up") {
        // Similar to "left" direction
        if (yPercentage < -100) {
          y.current = 0;
        }

        if (yPercentage > 0) {
          y.current = -rectRef.current.height;
        }
      } else if (direction === "down") {
        // Similar to "right" direction
        if (yPercentage > 100) {
          y.current = 0;
        }

        if (yPercentage < 0) {
          y.current = rectRef.current.height;
        }
      }

      itemRef.current.style.transform = `translate3d(0, ${yPercentage}%, 0)`;
    }
  };

  useEffect(() => {
    if (itemRef.current) {
      rectRef.current = itemRef.current.getBoundingClientRect();
    }
  }, [width, height]);

  const loop = () => {
    // Adjust position based on direction and speed
    if (direction === "left") {
      x.current -= speed.get();
    } else if (direction === "right") {
      x.current += speed.get();
    } else if (direction === "up") {
      // Use the same approach as horizontal scrolling
      y.current -= speed.get();
    } else if (direction === "down") {
      // Use the same approach as horizontal scrolling
      y.current += speed.get();
    }
    setPosition();
  };

  const [, loopStart] = useRafLoop(loop, false);

  useEffect(() => {
    loopStart();

    // Set initial position based on index for multiple items
    if (itemRef.current && rectRef.current) {
      if (direction === "left" || direction === "right") {
        x.current = index * rectRef.current.width;
      } else if (direction === "up" || direction === "down") {
        // Use the same approach for both up and down directions
        y.current = index * rectRef.current.height;
      }
      setPosition();
    }
  }, []);

  return (
    <motion.div
      className={cn(
        "flex items-center whitespace-nowrap font-serif text-2xl font-semibold md:text-4xl",
        (direction === "up" || direction === "down") && "w-full flex-col"
      )}
      ref={itemRef}
      // Remove transition for consistent behavior with horizontal scrolling
    >
      {children}
    </motion.div>
  );
};

type MarqueeProps = {
  speed?: number;
  threshold?: number;
  wheelFactor?: number;
  dragFactor?: number;
  children: React.ReactNode;
  itemsToShow?: number;
  direction?: "left" | "right" | "up" | "down";
};

export const InteractiveMarquee: React.FC<MarqueeProps> = (props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    speed = 1,
    threshold = 0.014,
    wheelFactor = 1.8,
    dragFactor = 1.2,
    children,
    itemsToShow = 3,
    direction = "left",
  } = props;

  // Use the provided speed directly instead of overriding it
  const defaultSpeed = speed;

  const marqueeRef = useRef<HTMLDivElement>(null);
  const slowDown = useRef(false);
  const isScrolling = useRef<NodeJS.Timeout | null>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const isFocused = useRef(false);

  const x = useRef(0);
  const [wWidth] = useWindowSize();
  const speedSpring = useSpring(defaultSpeed, {
    damping: 40,
    stiffness: 90,
    mass: 5,
  });

  // Remove the opacity transform that makes content disappear
  const skewX = useTransform(
    speedSpring,
    [-wWidth * 0.05, 0, wWidth * 0.05],
    [1, 0, 1]
  );

  const handleOnWheel = (e: React.WheelEvent<HTMLDivElement> | undefined) => {
    const normalized = normalizeWheel(e);

    // This will use the wheel to speed up the timeline
    if (direction === "left" || direction === "right") {
      x.current = normalized.pixelY * wheelFactor;
    } else {
      // Reduce wheel sensitivity for vertical scrolling
      x.current = normalized.pixelX * wheelFactor * 0.5;
    }

    // reset speed on scroll end
    if (isScrolling.current) {
      window.clearTimeout(isScrolling.current);
    }

    isScrolling.current = setTimeout(() => {
      speedSpring.set(defaultSpeed);
    }, 30);
  };

  const handleDragStart = () => {
    slowDown.current = true;
    marqueeRef?.current?.classList.add("drag");
    speedSpring.set(0);
  };

  const handleOnDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (direction === "left" || direction === "right") {
      speedSpring.set(dragFactor * -info.delta.x);
    } else {
      // Reduce drag sensitivity for vertical scrolling
      speedSpring.set(dragFactor * -info.delta.y * 0.5);
    }
  };

  const handleDragEnd = () => {
    slowDown.current = false;
    marqueeRef?.current?.classList.remove("drag");
    //rest to the original speed
    x.current = defaultSpeed;
  };

  const handleFocus = () => {
    isFocused.current = true;
    marqueeRef?.current?.classList.add("focused");
  };

  const handleBlur = () => {
    isFocused.current = false;
    marqueeRef?.current?.classList.remove("focused");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Handle keyboard navigation for accessibility
    if (direction === "left" || direction === "right") {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        speedSpring.set(speed * 2);
        x.current = speed * 2;
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        speedSpring.set(-speed * 2);
        x.current = -speed * 2;
      }
    } else {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        speedSpring.set(speed * 2);
        x.current = speed * 2;
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        speedSpring.set(-speed * 2);
        x.current = -speed * 2;
      }
    }

    if (e.key === " " || e.key === "Enter") {
      // Toggle pause/play with space or enter
      e.preventDefault();
      if (slowDown.current) {
        handleDragEnd();
      } else {
        handleDragStart();
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Reset speed when key is released
    if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      setTimeout(() => {
        speedSpring.set(speed);
        x.current = speed;
      }, 100);
    }
  };

  const loop = () => {
    /**
     * Do nothing if we're slowing down
     * or
     * Our x is less than the threshold
     *
     * The threshold basically tells how much to speed up
     *
     * Without this stop - x.current will mutiple expodentially
     */
    if (slowDown.current || Math.abs(x.current) < threshold) {
      return;
    }

    /**
     * This portion speeds up the spring until it reaches the `threshold`
     */
    x.current *= 0.66;

    if (x.current < 0) {
      x.current = Math.min(x.current, 0);
    } else {
      x.current = Math.max(x.current, 0);
    }

    //speedSpring sets the speed for the marquee items that gets passed to the item components
    speedSpring.set(defaultSpeed + x.current);
  };

  useRafLoop(loop);

  // Create array of items to display for infinite scrolling
  const items = Array.from({ length: itemsToShow }, (_, i) => i);

  return (
    isClient && (
      <>
        <motion.div
          className="absolute inset-0 h-full w-full"
          ref={constraintsRef}
        />
        <motion.div
          className={cn(
            "z-10 flex cursor-grab items-center justify-center focus:cursor-grabbing focus:outline-none",
            (direction === "up" || direction === "down") &&
              "h-full min-h-[300px] w-full flex-col"
          )}
          ref={marqueeRef}
          style={{
            skewX,
            ...(direction === "up" || direction === "down"
              ? { minHeight: "300px", height: "100%" }
              : {}),
          }}
          onWheel={handleOnWheel}
          drag={direction === "left" || direction === "right" ? "x" : "y"}
          dragPropagation={true}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragStart={handleDragStart}
          onDrag={handleOnDrag}
          onDragEnd={handleDragEnd}
          dragElastic={0.000001}
          tabIndex={0}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          aria-label="Interactive scrolling marquee"
          role="region"
        >
          {items.map((i) => (
            <MarqueeItem
              key={i}
              speed={speedSpring}
              direction={direction}
              index={i}
            >
              {children}
            </MarqueeItem>
          ))}
        </motion.div>
      </>
    )
  );
};
