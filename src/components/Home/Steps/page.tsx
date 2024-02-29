"use client";
import React, { useEffect, useState } from "react";

interface Steps {
  title: string;
  description: string;
  image?: string;
}

function Steps({ steps }: { steps: Steps[] }) {
  const [currentActiveStep, setCurrentActiveStep] = useState(1);
  const [SlideInUp, setSlideInUp] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentActiveStep((prevStep) => (prevStep === 6 ? 1 : prevStep + 1));
      setSlideInUp(true);
      setTimeout(() => {
        setSlideInUp(false);
      }, 1000);
    }, 3000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="py-14 align-mddle text-center flex flex-col justify-center items-center">
      <h2 className="text-center"> How It Works Like a Charm</h2>
      <p className="text-center opacity-50 w-[400px] md:w-[600px]">
        We Don&apos;t Make Things Complex For Users. We Handle All, So
        User&apos;s Don&apos;t Need
      </p>
      <div className="numbercontainer text-center mt-14 flex flex-row gap-3 justify-center">
        {[1, 2, 3, 4, 5, 6].map((number, index) => {
          return (
            <label
              key={index}
              className={`text-lg min-h-14 min-w-14 flex justify-center items-center rounded transition-all ${
                currentActiveStep === number
                  ? "scale-125 bg-synblue text-synblack"
                  : "bg-synwhite text-synblack "
              }`}
            >
              {number}
            </label>
          );
        })}
      </div>
      <div
        className="flex flex-col mt-14 md:flex-row p-[15px]"
        style={{
          maxWidth: "1000px",
        }}
      >
        <div
          className={`${
            SlideInUp ? "SlideIn" : ""
          } min-w-96 h-72 bg-synwhite rounded`}
        ></div>
        <div className="p-10 flex flex-col justify-center items-start">
          <h3 className={`${SlideInUp ? "SlideIn" : ""} transition-all`}>
            {steps[currentActiveStep - 1].title}
          </h3>
          <p
            className={`${
              SlideInUp ? "SlideIn" : ""
            } transition-all text-start`}
          >
            {steps[currentActiveStep - 1].description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Steps;
