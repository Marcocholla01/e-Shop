import React from "react";
import DashboardSideBar from "../../components/seller/DashboardSideBar";
import DashboardHeader from "../../components/seller/DashboardHeader";
import AllOrders from "../../components/seller/AllOrders";

const ShopAllOrders = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={2} />
        </div>
        <div className="w-full justify-center flex">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrders;
