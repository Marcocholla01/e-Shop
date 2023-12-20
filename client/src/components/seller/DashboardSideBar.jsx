import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { Link } from "react-router-dom";

const DashboardSideBar = ({ active }) => {
  return (
    <div
      className={`w-full h-[80vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-8`}
    >
      {/* Single Items */}
      <div className={`w-full flex items-center p-4`}>
        <Link to={`/dashboard`} className="w-full flex items-center">
          <RxDashboard size={30} color={active === 1 ? "red" : "#555"} />
          <h5
            className={`pl-3 ${
              active === 1 ? "text-[red]" : ""
            } sm:block hidden`}
          >
            Dashboard
          </h5>
        </Link>
      </div>
      <div className={`w-full flex items-center p-4`}>
        <Link to={`/dashboard-orders`} className="w-full flex items-center">
          <FiShoppingBag size={30} color={active === 2 ? "red" : "#555"} />
          <h5
            className={`pl-3 ${
              active === 2 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            All Orders
          </h5>
        </Link>
      </div>
      <div className={`w-full flex items-center p-4`}>
        <Link to={`/dashboard-products`} className="w-full flex items-center">
          <FiPackage size={30} color={active === 3 ? "red" : "#555"} />
          <h5
            className={`pl-3 ${
              active === 3 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            All Products
          </h5>
        </Link>
      </div>
      <div className={`w-full flex items-center p-4`}>
        <Link
          to={`/dashboard-create-product`}
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd size={30} color={active === 4 ? "red" : "#555"} />
          <h5
            className={`pl-3 ${
              active === 4 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            Create Product
          </h5>
        </Link>
      </div>
      <div className={`w-full flex items-center p-4`}>
        <Link to={`/dashboard-all-events`} className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            color={active === 5 ? "red" : "#555"}
          />
          <h5
            className={`pl-3 ${
              active === 5 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            All Events
          </h5>
        </Link>
      </div>
      <div className={`w-full flex items-center p-4`}>
        <Link
          to={`/dashboard-crate-event`}
          className="w-full flex items-center"
        >
          <VscNewFile size={30} color={active === 6 ? "red" : "#555"} />
          <h5
            className={`pl-3 ${
              active === 6 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            Create Event
          </h5>
        </Link>
      </div>
      <div className={`w-full flex items-center p-4`}>
        <Link
          to={`/dashboard-withdraw-money`}
          className="w-full flex items-center"
        >
          <CiMoneyBill size={30} color={active === 7 ? "red" : "#555"} />
          <h5
            className={`pl-3 ${
              active === 7 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>
      <div className={`w-full flex items-center p-4`}>
        <Link to={`/dashboard-messages`} className="w-full flex items-center">
          <BiMessageSquareDetail
            size={30}
            color={active === 8 ? "red" : "#555"}
          />
          <h5
            className={`pl-3 ${
              active === 8 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>
      <div className={`w-full flex items-center p-4`}>
        <Link to={`/dashboard/cupouns`} className="w-full flex items-center">
          <AiOutlineGift size={30} color={active === 9 ? "red" : "#555"} />
          <h5
            className={`pl-3 ${
              active === 9 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            Discount Codes
          </h5>
        </Link>
      </div>
      <div className={`w-full flex items-center p-4`}>
        <Link to={`/dashboard-refunds`} className="w-full flex items-center">
          <HiOutlineReceiptRefund
            size={30}
            color={active === 10 ? "red" : "#555"}
          />
          <h5
            className={`pl-3 ${
              active === 10 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            Refunds
          </h5>
        </Link>
      </div>
      <div className={`w-full flex items-center p-4`}>
        <Link to={`/dashboard-settings`} className="w-full flex items-center">
          <CiSettings size={30} color={active === 10 ? "red" : "#555"} />
          <h5
            className={`pl-3 ${
              active === 10 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
