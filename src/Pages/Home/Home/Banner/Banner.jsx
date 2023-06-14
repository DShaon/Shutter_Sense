import React from "react";
import BSlider from "../../../../Slider/BSlider/BSlider";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="flex  items-center w-11/12 mx-auto mx-auto">
      <div className="w-2/5 text-white ">
        <h1 className="text-5xl font-bold mb-5">
          Through the Lens : Unveiling Hidden Stories
        </h1>
        <p className="text-justify">
          Enter a world where moments are frozen in time, and ordinary scenes
          become extraordinary. Join our photography school and unlock the
          secrets of capturing magic through the lens. Learn to play with light,
          shape, and color to frame your world in unique ways. Discover the
          power of storytelling through visual imagery and let your creativity
          soar.
        </p>
        <div className="flex gap-5">
          <button className=" border  hover:backdrop-blur-2xl px-5 py-4 rounded-2xl mt-10 ">
            View Our Classes
          </button>
          <Link to="/signup">
            <button className=" hover:border bg-white  bg-opacity-10  backdrop-blur-md px-5 py-4 rounded-2xl mt-10">
              SignUp Now
            </button>
          </Link>
        </div>
      </div>
      <BSlider></BSlider>
    </div>
  );
};

export default Banner;
