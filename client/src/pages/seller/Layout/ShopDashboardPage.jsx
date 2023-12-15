import React from "react";
import DashboardHeader from "../../../components/seller/DashboardHeader";
import DashboardSideBar from "../../../components/seller/DashboardSideBar";

const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className={`w-[100%] flex items-center justify-between`}>
        <div className={`w-[80px] sm:w-[330px]`}>
          <DashboardSideBar active={1} />
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardPage;
