import React from "react";
import styles from "../../../../styles/style";

const HeroCodes = () => {
  return   <div className="" >
  <h2 className="text-center py-3 bg-slate-200 rounded-md font-semibold">Latest Super Discount Active Coupon Code</h2>
  <div className="flex items-center flex-col w-full p-6 justify-center w-[100%]">

  <div className="px-4 pt-5 py-4 flex bg-white mb-5 rounded-lg w-full ">
    <img src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2F23kQcB9%2Fins3.jpg&w=128&q=75" alt="" srcset="" className="rounded-md shadow h-[110px] w-[110px] object-cover"  />

    <div className="flex flex-col pt-1 ml-2">

      <div className="flex flex-row itmes-center justify-between gap-1">
        <h1 className="text-red-600 font-[600] text-[30px]"> 10% </h1> <span className="text-[#000] self-center">off</span>  <span className="rounded-lg shadow text-red-500 bg-red-100 w-auto self-center px-2">inactive</span>
      </div>
      <h1 className="font-semibold mb-2">Summer Voucher</h1>
      <div className="flex">
        <p className="bg-red-400 px-1 rounded mr-1 text-white font-[600]">00</p> <span className="text-[#000000] mr-1 font-[600]">:</span>
        <p className="bg-red-400 px-1 rounded mr-1 text-white font-[600]">00</p> <span className="text-[#000000] mr-1 font-[600]">:</span>
        <p className="bg-red-400 px-1 rounded mr-1 text-white font-[600]">00</p> <span className="text-[#000000] mr-1 font-[600]">:</span>
        <p className="bg-red-400 px-1 rounded mr-1 text-white font-[600]">00</p>
      </div>
    </div>
<div className="flex flex-col ml-[100px]">
<div className="border border-blue-600 border-dashed rounded-md p-2 bg-blue-50" >
  <p className="text-blue-600 font-[600] text-center cursor-pointer">SUMMER23</p>
</div> 
<p className="text-[12px] mt-3">* This coupon apply when shopping on <span >ShopO</span> only</p>
</div>
  </div>
  <div className="px-4 pt-5 py-4 flex bg-white  rounded-lg w-full ">
    <img src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2FwBBYm7j%2Fins4.jpg&w=128&q=75" alt="" srcset="" className="rounded-md shadow h-[110px] w-[110px] object-cover"  />

    <div className="flex flex-col pt-1 ml-2">

      <div className="flex flex-row itmes-center justify-between gap-1">
        <h1 className="text-green-600 font-[600] text-[30px]"> 24% </h1> <span className="text-[#000] self-center">off</span>  <span className="rounded-lg shadow text-green-500 bg-green-100 w-auto self-center px-2">inactive</span>
      </div>
      <h1 className="font-semibold mb-2">Flash Sale</h1>
      <div className="flex">
        <p className="bg-green-400 px-1 rounded mr-1 text-white font-[600]">03</p> <span className="text-[#000000] mr-1 font-[600]">:</span>
        <p className="bg-green-400 px-1 rounded mr-1 text-white font-[600]">30</p> <span className="text-[#000000] mr-1 font-[600]">:</span>
        <p className="bg-green-400 px-1 rounded mr-1 text-white font-[600]">27</p> <span className="text-[#000000] mr-1 font-[600]">:</span>
        <p className="bg-green-400 px-1 rounded mr-1 text-white font-[600]">92</p>
      </div>
    </div>
<div className="flex flex-col ml-[100px]">
<div className="border border-blue-600 border-dashed rounded-md p-2 bg-blue-50" >
  <p className="text-blue-600 font-[600] text-center cursor-pointer">WINTER90</p>
</div> 
<p className="text-[12px] mt-3">* This coupon apply when shopping more then Kshs 500</p>
</div>
  </div>

  <div className={`${styles.button} !h-[40px] text-white !w-auto !p-3 `}>view more discount codes</div>
  </div>
 
</div>
};

export default HeroCodes;
