import React from "react";
import SellerInvoice from "../../components/seller/SellerInvoice";
import DashboardHeader from "../../components/seller/DashboardHeader";
import DashboardSideBar from "../../components/seller/DashboardSideBar";

const SellerInvoicePage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar />
        </div>
        <div className="w-full justify-center flex">
          <SellerInvoice />
        </div>
      </div>
    </div>
  );
};

export default SellerInvoicePage;
