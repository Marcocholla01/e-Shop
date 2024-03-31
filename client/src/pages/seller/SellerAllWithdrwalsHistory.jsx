import React from "react";
import DashboardHeader from "../../components/seller/DashboardHeader";
import DashboardSideBar from "../../components/seller/DashboardSideBar";
import AllWithdrwalsHistory from "../../components/seller/AllWithdrwalsHistory";

const SellerAllWithdrwalsHistory = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar />
        </div>
        <div className="w-full justify-center flex">
          <AllWithdrwalsHistory />
        </div>
      </div>
    </div>
  );
};

export default SellerAllWithdrwalsHistory;
