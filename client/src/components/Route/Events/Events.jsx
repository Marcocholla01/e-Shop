import React, { useEffect, useState } from "react";
import styles from "../../../styles/style";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (allEvents) {
      // Use slice to get the first two elements
      const slicedData = allEvents.slice(0, 2);
      setData(slicedData);
    }
  }, [allEvents]);

  return (
    <div>
      {!isLoading && (
        <div>
          <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
              <h1>Popular Events</h1>
            </div>
            <div className="w-full sm:flex gap-10 ">
              {data.map((event, index) => (
                <EventCard data={event} key={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
