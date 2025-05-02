import React from "react";

const Home = () => {
  return (
    <div  className="w-[85%] mx-auto">
      <div className="flex flex-col-reverse md:flex-row justify-center items-center md:min-h-[80vh] md:gap-4 bg-[#d2f3f6] md:p-8 md:m-6 rounded-2xl">
        <div className="md:w-1/2">
          <h1 className="text-6xl font-rancho font-semibold">
            Top-Quality Sports Gear for Every Athlete
          </h1>
        </div>
        <div className="relative md:w-1/2">
          <img
            className="spin"
            src="/public/basketball-ball-preview.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
