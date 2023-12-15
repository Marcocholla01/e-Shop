import React from "react";
import styles from "../../../styles/style";
import EventCard from "./EventCard";

const Events = () => {
  return (
    <div>
      <div>
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>
          <div className="w-full grid">
            <EventCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
