import React from "react";
import DashboardSideBar from "../../components/seller/DashboardSideBar";
import DashboardHeader from "../../components/seller/DashboardHeader";
import AllProducts from "../../components/seller/AllProducts";

const ShopAllProducts = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div className="w-[80px] sm:w-[330px]">
          <DashboardSideBar active={3} className />
        </div>
        <div className="w-full justify-center flex">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;
