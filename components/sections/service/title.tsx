import React from "react";
import FadeInView from "../../ui/fadeIn-view";

const Title = () => {
  return (
    <FadeInView
      variants={variants}
      inViewOptions={{ margin: "0px 0px 0px 0px", once: true }}
      className="mb-44 w-full max-w-xl space-y-2 lg:mb-0"
    >
      <h2 className="w-fit bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-lg font-semibold text-transparent">
        # service
      </h2>
      <h3 className="text-shadow-sm bg-gradient-to-l from-gray-500 to-white bg-clip-text text-4xl font-semibold text-transparent md:text-6xl">
        What we do
      </h3>
    </FadeInView>
  );
};

export default Title;

const variants = {
  hidden: {
    opacity: 0,
    x: -250,
    y: 200,
    rotateX: -45,
    rotateY: 15,
    scale: 0.6,
    perspective: 1000,
    transformOrigin: "center",
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    perspective: 1000,
    transition: { duration: 0.8, ease: [0.25, 0.6, 0.3, 0.8] },
  },
};
