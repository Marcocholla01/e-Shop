import React, { useState } from "react";
import ProductCard from "../Product/ProductCard/ProductCard";
import { productData } from "../../static/data";
import { Link } from "react-router-dom";
import styles from "../../styles/style";

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer texxt-[20px] font-[600] pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer texxt-[20px] font-[600] pr-[20px]`}
            >
              Running Events
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer texxt-[20px] font-[600] pr-[20px]`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to={`/dashboard`}>
                <div className={`${styles.button} !rounded-[4px] !h-[42px]`}>
                  <span className="text-[#fff]">Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
        <br />
      </div>
      <div
        className={`grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25] lg:gap-[25px] lg:grid-cols-3 xl:grid-cols-4 mb-12 border-0 mt-7`}
      >
        {productData &&
          productData.map((i, index) => (
            <ProductCard data={i} key={index} isShop={true} />
          ))}
      </div>
    </div>
  );
};

export default ShopProfileData;
