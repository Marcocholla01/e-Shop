import React from "react";
import EditProduct from "../../components/seller/EditProduct";
import DashboardHeader from "../../components/seller/DashboardHeader";
import DashboardSideBar from "../../components/seller/DashboardSideBar";

const SellerEditProductPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-center justify-between">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar />
        </div>
        <div className="w-full justify-center flex">
          <EditProduct />
        </div>
      </div>
    </div>
  );
};

export default SellerEditProductPage;
