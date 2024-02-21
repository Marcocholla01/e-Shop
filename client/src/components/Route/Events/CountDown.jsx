import React, { useEffect, useState } from "react";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
  function calculateTimeLeft() {
    const diffrence = +new Date(data.finish_date) - +new Date();

    let timeLeft = {};

    if (diffrence > 0) {
      timeLeft = {
        D: Math.floor(diffrence / (1000 * 60 * 60 * 24)),
        Hrs: Math.floor((diffrence / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diffrence / (1000 * 60)) % 60),
        seconds: Math.floor((diffrence / 1000) % 60),
      };
    }
    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }
    return (
      <span key={interval} className="text-[25px] text-[#475ad2]">
        {timeLeft[interval]} {interval} {""}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Time's up!</span>
      )}
    </div>
  );
};

export default CountDown;
