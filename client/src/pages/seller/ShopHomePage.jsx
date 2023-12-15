import React from "react";
import styles from "../../styles/style";
import ShopInfo from "../../components/seller/ShopInfo";

const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex py-10 justify-between">
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-2 left-0 z-10">
          <ShopInfo isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
