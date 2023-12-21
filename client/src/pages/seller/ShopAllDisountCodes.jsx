import React from "react";
import AllDiscountCodes from "../../components/seller/AllDiscountCodes";
import DashboardSideBar from "../../components/seller/DashboardSideBar";
import DashboardHeader from "../../components/seller/DashboardHeader";

const ShopAllDisountCodes = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={9} className />
        </div>
        <div className="w-full justify-center flex">
          <AllDiscountCodes />
        </div>
      </div>
    </div>
  );
};

export default ShopAllDisountCodes;
