import React from "react";
import DashboardSideBar from "../../components/seller/DashboardSideBar";
import DashboardHeader from "../../components/seller/DashboardHeader";

const ShopAllProducts = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-center justify-between">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full justify-center flex"></div>
      </div>
    </div>
  );
};

export default ShopAllProducts;
