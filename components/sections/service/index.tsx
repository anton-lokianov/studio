import React from "react";
import ServiceVideo from "./service-video";
import ServiceList from "./service-list";

export const ServiceSection = () => {
  return (
    <section
      id="service"
      className="grid w-full grid-cols-1 gap-10 px-4 md:gap-2 lg:grid-cols-2"
    >
      <ServiceList />
      <ServiceVideo />
    </section>
  );
};
