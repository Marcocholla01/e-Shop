import React from "react";
import DashboardSideBar from "../../components/seller/DashboardSideBar";
import DashboardHeader from "../../components/seller/DashboardHeader";
import AllEvents from "../../components/seller/AllEvents.jsx";

const ShopAllEvents = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={5} className />
        </div>
        <div className="w-full justify-center flex">
          <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default ShopAllEvents;
