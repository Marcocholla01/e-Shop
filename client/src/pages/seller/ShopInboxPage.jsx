import React from "react";
import ShopInbox from "../../components/seller/ShopInbox";
import DashboardHeader from "../../components/seller/DashboardHeader";
import DashboardSideBar from "../../components/seller/DashboardSideBar";

const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={8} />
        </div>
        <div className="w-full justify-center flex">
          <ShopInbox />
        </div>
      </div>
    </div>
  );
};

export default ShopInboxPage;
