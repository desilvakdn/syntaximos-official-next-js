"useclient";
import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

function Confetti({
  duration,
  width,
  height,
}: {
  duration: number;
  width: number;
  height: number;
}) {
  const [timesup, settimesup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      settimesup(true);
    }, duration);
  }, [duration, settimesup]);

  return timesup ? (
    <></>
  ) : (
    <ReactConfetti
      width={width}
      height={height}
      tweenDuration={1000}
      numberOfPieces={400}
    />
  );
}

export default Confetti;
