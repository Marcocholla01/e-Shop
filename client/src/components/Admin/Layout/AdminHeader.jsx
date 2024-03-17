import React from "react";
import Logo from "../../../assets/images/svg/logo.svg";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <div
        className={`w-full h-[80px] bg-white sticky top-0 left-0 flex items-center justify-between px-4 z-10
      `}
      >
        <div>
          <Link to={`/admin-dashboard`}>
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className={`flex items-center`}>
          <div className={`flex items-center mr-4`}>
            <Link
              to={`/admin-dashboard-all-discount-codes`}
              className={`sm:block hidden`}
            >
              <AiOutlineGift
                color="#555"
                size={30}
                className="mx-5 cursor-pointer "
              />
            </Link>
            <Link to={`/admin-all-events`} className={`sm:block hidden`}>
              <MdOutlineLocalOffer
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to={`/admin-dashboard-orders`} className={`sm:block hidden`}>
              <FiShoppingBag
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link
              to={`/admin-dashboard-products`}
              className={`sm:block hidden`}
            >
              <FiPackage
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link
              to={`/admin-dashboard-messages`}
              className={`sm:block hidden`}
            >
              <BiMessageSquareDetail
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to={`/user/${user._id}`}>
              <img
                src={`${user.avatar.url}`}
                alt=""
                className={`rounded-full w-[50px] h-[50px] object-cover`}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
