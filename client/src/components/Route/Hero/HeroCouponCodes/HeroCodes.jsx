import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../../styles/style";
import CouponCodeCard from "../../../CouponCode/CouponCodeCard";
import { Link } from "react-router-dom";
import { GetAllCouponCodes } from "../../../../redux/actions/couponCode";

const HeroCodes = () => {
  const { CouponCode } = useSelector((state) => state.couponCode);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllCouponCodes());
    if (CouponCode) {
      // Use slice to get the first two elements
      const slicedData = CouponCode.slice(0, 2);
      setData(slicedData);
    }
  }, [dispatch, CouponCode]);

  // console.log(data)

  return (
    <div className="w-full">
      <h2 className="text-center py-3 bg-slate-200 rounded-md font-semibold">
        Latest Super Discount Active Coupon Code
      </h2>

      <div className="flex items-center flex-col w-full p-6 justify-center">
        {data.map((couponData, index) => (
          <CouponCodeCard data={couponData} key={index} />
        ))}
        <Link to={`/offers`}>
          <div
            className={`${styles.button} !h-[40px] text-white !w-auto !p-3 `}
          >
            view more discount codes
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeroCodes;
