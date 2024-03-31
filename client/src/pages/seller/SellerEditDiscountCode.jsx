import React from "react";
import EditCouponCode from "../../components/seller/EditCouponCode";
import DashboardSideBar from "../../components/seller/DashboardSideBar";
import DashboardHeader from "../../components/seller/DashboardHeader";

const SellerEditDiscountCode = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-center justify-between">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar />
        </div>
        <div className="w-full justify-center flex">
          <EditCouponCode />
        </div>
      </div>
    </div>
  );
};

export default SellerEditDiscountCode;
