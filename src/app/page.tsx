import React from "react";

export default function Home() {
  return (
    <div className="w-full min-h-screen pt-24 ">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white text-3xl sm:text-5xl text-center font-semibold">
          Blog Page
        </h1>

        <p className="w-[70%] mt-8 mb-3 text-lg text-white/50 text-center font-medium leading-normal">
          Welcome to my blog! Dive into a wealth of insightful articles,
          practical guides, and project breakdowns, empowering you to level up
          your Rust and Blockchain development skills.
        </p>
      </div>
    </div>
  );
};