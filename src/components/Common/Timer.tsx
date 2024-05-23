"use client";
import React, { useState, useEffect } from "react";

const useTimer = () => {
  const [startdate, setstartdate] = useState("");
  const [nowdate, setnowdate] = useState("");
  const [targettime, settargettime] = useState(0);
  const [isTimeUp, setisTimeUp] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRedTime, setisRedTime] = useState(false);
  const [time_difference, settime_difference] = useState(0);

  useEffect(() => {
    setisTimeUp(false);
    const date_started = new Date(startdate);
    const date_now = new Date(nowdate);
    const time_difference_from_started =
      date_now.getTime() - date_started.getTime();

    const x =
      targettime - time_difference_from_started > 0
        ? targettime - time_difference_from_started
        : 0;

    settime_difference(x);

    if (x === 0) {
      setisTimeUp(true);
      return;
    }

    const intervalId = setInterval(() => {
      settime_difference((prevTimeDiff) => {
        const newTimeDiff = prevTimeDiff - 1000;
        if (newTimeDiff <= 0) {
          setisTimeUp(true);
          clearInterval(intervalId);
          return 0;
        }
        return newTimeDiff;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startdate, nowdate, targettime]);

  useEffect(() => {
    if (time_difference <= 0) {
      setisTimeUp(true);
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      if (time_difference < 15 * 60 * 1000) {
        setisRedTime(true);
      }
      const days = Math.floor(time_difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (time_difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (time_difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((time_difference % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }
  }, [time_difference]);

  return {
    timeLeft,
    isTimeUp,
    isRedTime,
    setstartdate,
    setnowdate,
    settargettime,
  };
};

export default useTimer;
