import React from "react";
import AllSettings from "../../components/seller/AllSettings";
import Footer from "../../components/Layout/Footer";
import DashboardHeader from "../../components/seller/DashboardHeader";
import ShopInfo from "../../components/seller/ShopInfo";

const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex  justify-between">
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-0">
          <ShopInfo isOwner={true} className="z-[0]" />
        </div>
        <div className="w-full justify-center flex">
          <AllSettings />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ShopSettingsPage;
