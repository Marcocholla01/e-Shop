import React from "react";
import SellerSale from "../../components/seller/SellerSale";
import DashboardSideBar from "../../components/seller/DashboardSideBar";
import DashboardHeader from "../../components/seller/DashboardHeader";

const SellerSalesPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={13} />
        </div>
        <div className="w-full justify-center flex">
          <SellerSale />
        </div>
      </div>
    </div>
  );
};

export default SellerSalesPage;
