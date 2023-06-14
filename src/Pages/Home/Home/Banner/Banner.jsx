import React from "react";
import BSlider from "../../../../Slider/BSlider/BSlider";

const Banner = () => {
  return (
    <div className="flex">
      <div className="w-2/5 text-white">
        <h1 className="text-3xl font-bold">
          Through the Lens: Unveiling Hidden Stories
        </h1>
        <p>
          Enter a world where moments are frozen in time, and ordinary scenes
          become extraordinary. Join our photography school and unlock the
          secrets of capturing magic through the lens. Learn to play with light,
          shape, and color to frame your world in unique ways. Discover the
          power of storytelling through visual imagery and let your creativity
          soar.
        </p>
      </div>
      <BSlider></BSlider>
    </div>
  );
};

export default Banner;
