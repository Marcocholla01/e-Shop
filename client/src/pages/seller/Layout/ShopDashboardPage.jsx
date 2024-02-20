import React from "react";
import DashboardHeader from "../../../components/seller/DashboardHeader";
import DashboardHero from "../../../components/seller/DashboardHero";
import DashboardSideBar from "../../../components/seller/DashboardSideBar";

const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className={`w-[100%] flex `}>
        <div className="flex w-full items-start justify-between">
          <div className={`w-[80px] sm:w-[330px]`}>
            <DashboardSideBar active={1} />
          </div>
          <DashboardHero />
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardPage;
