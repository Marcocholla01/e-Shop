import React from "react";
import DashboardSideBar from "../../components/seller/DashboardSideBar";
import DashboardHeader from "../../components/seller/DashboardHeader";
import EditEvent from "../../components/seller/EditEvent";

const SellerEditEventPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-center justify-between">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar />
        </div>
        <div className="w-full justify-center flex">
          <EditEvent />
        </div>
      </div>
    </div>
  );
};

export default SellerEditEventPage;
