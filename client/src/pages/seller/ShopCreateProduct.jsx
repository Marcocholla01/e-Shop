import React from "react";
import DashboardHeader from "../../components/seller/DashboardHeader";
import DashboardSideBar from "../../components/seller/DashboardSideBar";
import CreateProduct from "../../components/seller/CreateProduct";

const ShopCreateProduct = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-center justify-between">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProduct;
