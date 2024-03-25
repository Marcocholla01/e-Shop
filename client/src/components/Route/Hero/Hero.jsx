import React from "react";
import banner from "../../../assets/images/banner-1.jpg";
import styles from "../../../styles/style";
import { Link } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import HeroSlider from "./HeroSlider/HeroSlider";
import HeroCodes from "./HeroCouponCodes/HeroCodes";

const Hero = () => {
  return (
    <>
      <div className={`${styles.section} flex flex-col mt-8`}>
        <div className="sm:flex flex-row gap-8">

          <div className="sm:w-3/5 w-full">
            <HeroSlider />
          </div>
          <div className="sm:w-2/5 hidden sm:flex  bg-slate-300 rounded-lg border-[3px] border-orange-500 hover:border-blue-500">
            <HeroCodes/>
          </div>
        
        </div>
        <div className="flex mt-6 ">
          <div className="flex mt-3 p-5 bg-white rounded w-full justify-between">
            <div >

              <h1 className="text-[25px] font-[600] ">100% Natural Quality Organic Product</h1>
              <p className="text-[#000000ae] mt-2">See Our latest discounted products from here and get a special discount product</p>
            </div>
            <div className={`${styles.button}  !rounded-[5px] text-white m-3`}>
              Shop Now
              <span className="text-white ml-2"><IoIosArrowDroprightCircle size={20}/> </span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
