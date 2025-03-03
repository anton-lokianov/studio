import { InteractiveMarquee } from "@/components/ui/interactive-marquee";

const marqueeItems = [
  "Explore",
  "Discover",
  "Transform",
  "Evolve",
  "Journey",
  "Adventure",
  "Harmony",
  "Growth",
  "Purpose",
  "Impact",
  "Legacy",
  "Empower",
];

export const MarqueeSection = () => {
  return (
    <div className="relative w-full overflow-clip py-2">
      <div className="pointer-events-none absolute inset-0 z-10 opacity-60 shadow-[inset_0_0px_5px_10px_#0a0a0a]" />
      <InteractiveMarquee speed={1}>
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
