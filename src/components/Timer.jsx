import { GlobalContext } from "../context/GlobalState";
import React, { useContext, useEffect, useState } from "react";
//________________________________________________
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import Test from "./Test";
dayjs.extend(utc);
dayjs.extend(duration);

const Timer = () => {
  const { data, deleteData } = useContext(GlobalContext);
  const generateRandomTime = () => {
    const randomDays = Math.floor(Math.random() * 10) + 1;
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    const randomSeconds = Math.floor(Math.random() * 60);
    const duration = dayjs.duration({
      days: randomDays,
      hours: randomHours,
      minutes: randomMinutes,
      seconds: randomSeconds,
    });
    return duration;
  };

  const [timers, setTimers] = useState([]);
console.log("timers---", timers)
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = timers
        .map((timer) => ({
          ...timer,
          remainingTime: timer.remainingTime.subtract(1, "second"),
        }))
        .filter((timer) => timer.remainingTime.asSeconds() > 0);
      setTimers(newTimers);
    }, 1000);
    return () => clearInterval(interval);
  }, [timers]);

  useEffect(() => {
    const newTimers = data.map((product) => ({
      productId: product.id,
      remainingTime: generateRandomTime(),
    }));
    setTimers(newTimers);
  }, [data]);

  const getTimerString = (timer) => {
    const days = timer.remainingTime.days();
    const hours = timer.remainingTime.hours();
    const minutes = timer.remainingTime.minutes();
    const seconds = timer.remainingTime.seconds();
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
      {data?.map((product, index) => {
        const timer = timers.find((timer) => timer.productId === product.id);
        
        return (
          <div className="container" key={index}>
            {timer && <p className="timerBox">{getTimerString(timer)}</p>}
          </div>
        );
      })}
    </>
  );
};

export default Timer;