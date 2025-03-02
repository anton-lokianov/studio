import { InteractiveMarquee } from "@/components/ui/interactive-marquee";

const marqueeItems = [
  "WGC",
  "Acme Inc",
  "TechSolve",
  "GlobalVision",
  "BlueSky Media",
  "NovaTech",
  "Horizon Partners",
  "PrimeSoft",
  "Atlas Group",
  "ClearEdge Systems",
  "Momentum Ltd",
];

export const MarqueeSection = () => {
  return (
    <div className="relative w-full py-2">
      <div className="pointer-events-none absolute inset-0 z-10 opacity-60 shadow-[inset_0_0px_5px_10px_#0a0a0a]" />
      <InteractiveMarquee>
        {marqueeItems.map((item) => (
          <div
            key={item}
            className="mx-8 font-bold odd:bg-gradient-to-r odd:from-gray-300 odd:via-gray-500 odd:to-gray-400 odd:bg-clip-text odd:text-transparent even:text-white"
          >
            {item}
          </div>
        ))}
      </InteractiveMarquee>
    </div>
  );
};
