import React, { useState } from "react";
import CodeCountDown from "./CodeCountDown";

const CouponCodeCard = ({ data }) => {
  // const couponCodes = [
  //   {
  //     imageUrl: "https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2F23kQcB9%2Fins3.jpg&w=128&q=75",
  //     discountPercentage: "10%",
  //     condition: "Inactive",
  //     title: "Summer Voucher",
  //     timeRemaining: "00:00:00:00",
  //     code: "SUMMER23",
  //     description: "This coupon apply when shopping on ShopO only"
  //   },
  //   {
  //     imageUrl: "https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FwBBYm7j%2Fins4.jpg&w=128&q=75",
  //     discountPercentage: "24%",
  //     condition: "active",
  //     title: "Flash Sale",
  //     timeRemaining: "03:30:27:92",
  //     code: "WINTER90",
  //     description: "This coupon apply when shopping more than Kshs 500"
  //   }
  // ];

  // console.log(data);

  // if (!Array.isArray(data)) {
  //   // If data is not an array, return an empty div or any other fallback content
  //   return <div>No coupon data available</div>;
  // }

  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    if (data?.name) {
      navigator.clipboard.writeText(data.name);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 5000);
    }
  };

  return (
    <div>
      <div className="px-4 pt-5 py-4 flex bg-white mb-5 rounded-lg w-full shadow-lg">
        <img
          src={data?.imageLink}
          alt=""
          className="rounded-md shadow h-[110px] w-[110px] object-cover"
        />
        <div className="flex flex-col pt-1 ml-2">
          <div className="flex flex-row items-center justify-between gap-1">
            <h1
              className={`text-${
                data?.status === "Inactive" ? "red" : "green"
              }-600 font-[600] text-[30px]`}
            >
              {data?.value}%
            </h1>
            <span className="text-[#000] self-center">off</span>
            <span
              className={`rounded-lg shadow text-${
                data?.status === "Inactive" ? "red" : "green"
              }-500 bg-${
                data?.status === "Inactive" ? "red" : "green"
              }-100 w-auto self-center px-2`}
            >
              {data?.status}
            </span>
          </div>
          <h1 className="font-semibold mb-2">{data?.seasson}</h1>
          <div className="flex">
            <CodeCountDown data={data} />
          </div>
        </div>
        <div className="flex flex-col ml-[100px]">
          <div className="border border-blue-600 border-dashed rounded-md p-2 bg-blue-50">
            <p
              className="text-blue-600 font-[600] text-center cursor-pointer"
              onClick={handleCopyText}
            >
              {copied ? "Copied" : data?.name}
            </p>
          </div>
          <p className="text-[12px] mt-3">
            * This coupon applies when shopping on{" "}
          </p>
          <span className="font-semibold text-sm text-center">
            {data?.shop?.name}{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CouponCodeCard;
