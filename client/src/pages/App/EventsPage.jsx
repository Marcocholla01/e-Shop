import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import EventCard from "../../components/Route/Events/EventCard";
import { useSelector } from "react-redux";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);
  // useEffect(() => {
  //   const data = allEvents && allEvents.find((a, b) => a.sold_out - b.sold_out);
  // }, [allEvents]);
  // console.log(allEvents);

  return (
    <div>
      <Header activeHeading={4} />
      <EventCard active={true} data={allEvents && allEvents[0]} />
      <EventCard active={true} data={allEvents && allEvents[0]} />
      <Footer />
    </div>
  );
};

export default EventsPage;
