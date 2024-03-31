import React from "react";
import DashboardHeader from "../../components/seller/DashboardHeader";
import DashboardSideBar from "../../components/seller/DashboardSideBar";
import SellerWithdrawalDatails from "../../components/seller/SellerWithdrawalDatails";

const SellerWithdrawalDetailsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar />
        </div>
        <div className="w-full justify-center flex">
          <SellerWithdrawalDatails />
        </div>
      </div>
    </div>
  );
};

export default SellerWithdrawalDetailsPage;
