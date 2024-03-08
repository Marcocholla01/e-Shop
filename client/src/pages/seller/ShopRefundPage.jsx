import React from "react";
import Refunds from "../../components/seller/Refunds";
import DashboardHeader from "../../components/seller/DashboardHeader";
import DashboardSideBar from "../../components/seller/DashboardSideBar";

const ShopRefundPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={10} className />
        </div>
        <div className="w-full justify-center flex">
          <Refunds />
        </div>
      </div>
    </div>
  );
};

export default ShopRefundPage;
