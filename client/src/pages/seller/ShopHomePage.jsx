import React from "react";
import styles from "../../styles/style";
import ShopInfo from "../../components/seller/ShopInfo";
import ShopProfileData from "../../components/seller/ShopProfileData";
import DashboardHeader from "../../components/seller/DashboardHeader";

const ShopHomePage = () => {
  return (
    <div className={`bg-[#f5f5f5]`}>
      <DashboardHeader />
      <div className="w-full flex justify-between">
        <div className="w-[40%] sm:w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-0">
          <ShopInfo isOwner={true} />
        </div>
        <div className="w-[60%] sm:w-[72%] rounded-[4px]">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
