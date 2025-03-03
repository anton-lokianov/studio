import React from "react";
import { WHAT_WE_DO } from "@/lib/constants";
import Image from "next/image";
import Title from "./title";
import FadeInView from "../../ui/fadeIn-view";
import { Icons } from "@/components/ui/icons";

const ServiceList = () => {
  return (
    <div className="flex flex-col items-center justify-evenly py-10 md:h-[360vh] md:py-0">
      <Title />
      {WHAT_WE_DO.map((item) => (
        <FadeInView
          key={item.title}
          inViewOptions={{ margin: "0px 0px -150px 0px" }}
          transition={{
            duration: 0.3,
          }}
          className="mb-24 flex w-full max-w-xl flex-col gap-5 lg:mb-0"
        >
          <div className="w-fit rounded-lg bg-gradient-to-tr from-gray-800 to-gray-600 p-3 shadow-inner shadow-black">
            {item.icon}
          </div>
          <h4 className="bg-gradient-to-tr from-foreground to-gray-500 bg-clip-text py-1 text-2xl font-semibold text-transparent md:text-5xl">
            {item.title}
          </h4>
          <p className="text-balance text-sm text-white md:text-lg">
            {item.description}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {item.features.map((feature) => (
              <p
                key={feature}
                className="inline-flex items-center space-x-2 text-xs text-white md:text-base"
              >
                <span className="inline-block rounded-full border border-gray-500 bg-gray-900 p-1 text-white">
                  <Icons.checkMark className="size-3 md:size-4" />
                </span>
                <span>{feature}</span>
              </p>
            ))}
          </div>
          <div className="before:via-secondary-dark before:to-primary relative mx-auto aspect-[16/9] w-full before:absolute before:-inset-1 before:-z-10 before:rounded-xl before:bg-gradient-to-tr before:from-background lg:hidden">
            <div className="bg-background/80 relative h-full min-h-[300px] w-full overflow-hidden rounded-lg shadow-[inset_0_2px_15px_rgba(0,0,0,0.5),inset_0_-20px_25px_rgba(0,0,0,0.95)] backdrop-blur-sm after:absolute after:bottom-0 after:h-1/3 after:w-full after:bg-gradient-to-t after:from-black/50 after:to-transparent">
              <Image
                src={item.image}
                alt="service"
                fill
                className="object-fit rounded-lg mix-blend-luminosity"
              />
            </div>
          </div>
        </FadeInView>
      ))}
    </div>
  );
};

export default ServiceList;
