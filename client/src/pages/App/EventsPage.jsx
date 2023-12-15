import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import EventCard from "../../components/Route/Events/EventCard";

const EventsPage = () => {
  return (
    <div>
      <Header activeHeading={4} />
      <EventCard active={true} />
      <EventCard active={true} />
      <Footer />
    </div>
  );
};

export default EventsPage;
