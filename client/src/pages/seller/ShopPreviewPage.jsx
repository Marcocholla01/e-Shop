import React from "react";
import ShopProfileData from "../../components/seller/ShopProfileData";
import ShopInfo from "../../components/seller/ShopInfo";
import styles from "../../styles/style";

const ShopPreviewPage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex py-10 justify-between">
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          <ShopInfo />
        </div>
        <div className="w-[72%] rounded-[4px]">
          <ShopProfileData />
        </div>
      </div>
    </div>
  );
};

export default ShopPreviewPage;
