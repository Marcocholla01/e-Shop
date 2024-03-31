import React, { useEffect, useState } from "react";

const CodeCountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(data.endDate) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        D: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };

      // Add leading zeros to single-digit values
      Object.keys(timeLeft).forEach((interval) => {
        timeLeft[interval] = String(timeLeft[interval]).padStart(2, "0");
      });
    }
    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }
    return (
      <span key={interval} className="text-[25px] text-[#475ad2]">
        <p className="bg-green-400 px-1 rounded mr-1 text-white font-[600]">
          {timeLeft[interval]}
        </p>
        <span className="text-[#000000] mr-1 font-[600]">:</span>
        {interval} {""}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        <div className="flex">
          <p className="bg-[green] px-1 rounded mr-1 text-white font-[600]">
            {timeLeft.D}
          </p>{" "}
          <span className="text-[#000000] mr-1 font-[600]">:</span>
          <p className="bg-[green] px-1 rounded mr-1 text-white font-[600]">
            {timeLeft.Hrs}
          </p>{" "}
          <span className="text-[#000000] mr-1 font-[600]">:</span>
          <p className="bg-[green] px-1 rounded mr-1 text-white font-[600]">
            {timeLeft.mins}
          </p>{" "}
          <span className="text-[#000000] mr-1 font-[600]">:</span>
          <p className="bg-[green] px-1 rounded mr-1 text-white font-[600]">
            {timeLeft.seconds}
          </p>
        </div>
      ) : (
        <div className="flex">
          <p className="bg-[red] px-1 rounded mr-1 text-white font-[600]">00</p>{" "}
          <span className="text-[#000000] mr-1 font-[600]">:</span>
          <p className="bg-[red] px-1 rounded mr-1 text-white font-[600]">
            00
          </p>{" "}
          <span className="text-[#000000] mr-1 font-[600]">:</span>
          <p className="bg-[red] px-1 rounded mr-1 text-white font-[600]">
            00
          </p>{" "}
          <span className="text-[#000000] mr-1 font-[600]">:</span>
          <p className="bg-[red] px-1 rounded mr-1 text-white font-[600]">00</p>
        </div>
      )}
    </div>
  );
};

export default CodeCountDown;
