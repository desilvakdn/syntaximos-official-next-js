"use client";
import React, { useState, useEffect } from "react";

const useTimer = ({
  startdate,
  targettime,
}: {
  startdate: string;
  targettime: number;
}) => {
  const [targetDate, setTargetDate] = useState(
    new Date(startdate).getTime() + targettime
  );
  const [isTimeUp, setisTimeUp] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now: Date = new Date();
      const timeDifference: number = targetDate - now.getTime();

      //setTargetDate((targetDate) => targetDate - 1000);
      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setisTimeUp(true);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startdate, targetDate, targettime]);

  return { timeLeft, isTimeUp };
};

export default useTimer;
