import React from "react";
import DashboardHeader from "../../components/seller/DashboardHeader";
import ChangePassword from "../../components/seller/ChangePassword";
import DashboardSideBar from "../../components/seller/DashboardSideBar";

const ShopChangePasswordPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-center justify-between">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={12} className />
        </div>
        <div className="w-full justify-center flex">
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default ShopChangePasswordPage;
