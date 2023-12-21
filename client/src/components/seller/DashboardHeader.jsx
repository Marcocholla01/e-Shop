import React from "react";
import { useSelector } from "react-redux";
import Logo from "../../assets/images/svg/Logo.svg";
import { Link } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div
      className={`w-full h-[80px] bg-white sticky top-0 left-0 flex items-center justify-between px-4 z-10
      `}
    >
      <div>
        <Link to={`/dashboard`}>
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className={`flex items-center`}>
        <div className={`flex items-center mr-4`}>
          <Link
            to={`/dashboard-all-discount-codes`}
            className={`sm:block hidden`}
          >
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer "
            />
          </Link>
          <Link to={`/dashboard-all-events`} className={`sm:block hidden`}>
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={`/dashboard-orders`} className={`sm:block hidden`}>
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={`/dashboard-products`} className={`sm:block hidden`}>
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to={`/dashboard-messages`} className={`sm:block hidden`}>
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${seller.avatar.url}`}
              alt=""
              className={`rounded-full w-[50px] h-[50px] object-cover`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
