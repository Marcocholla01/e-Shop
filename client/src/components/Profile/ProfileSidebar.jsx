import React from "react";
import {
  AiOutlineCreditCard,
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";
import { FcAddressBook } from "react-icons/fc";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { MdTrackChanges } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white shadow-sm p-4 pt-8 rounded-[10px]">
      <div
        className="flex bg-white cursor-pointer items-center w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span className={`pl-3 ${active === 1 ? "text-[red]" : ""}`}>
          Profile
        </span>
      </div>
      <div
        className="flex bg-white cursor-pointer items-center w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span className={`pl-3 ${active === 2 ? "text-[red]" : ""}`}>
          Orders
        </span>
      </div>
      <div
        className="flex bg-white cursor-pointer items-center w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span className={`pl-3 ${active === 3 ? "text-[red]" : ""}`}>
          Refunds
        </span>
      </div>
      <div
        className="flex bg-white cursor-pointer items-center w-full mb-8"
        onClick={() => setActive(4) || navigate(`/inbox`)}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span className={`pl-3 ${active === 4 ? "text-[red]" : ""}`}>
          Inbox
        </span>
      </div>
      <div
        className="flex bg-white cursor-pointer items-center w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span className={`pl-3 ${active === 5 ? "text-[red]" : ""}`}>
          Track Order
        </span>
      </div>
      <div
        className="flex bg-white cursor-pointer items-center w-full mb-8"
        onClick={() => setActive(6)}
      >
        <AiOutlineCreditCard size={20} color={active === 6 ? "red" : ""} />
        <span className={`pl-3 ${active === 6 ? "text-[red]" : ""}`}>
          Payment Methods
        </span>
      </div>
      <div
        className="flex bg-white cursor-pointer items-center w-full mb-8"
        onClick={() => setActive(7)}
      >
        <FcAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span className={`pl-3 ${active === 7 ? "text-[red]" : ""}`}>
          Address
        </span>
      </div>
      <div
        className="flex bg-white cursor-pointer items-center w-full mb-8"
        onClick={() => setActive(8)}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
        <span className={`pl-3 ${active === 8 ? "text-[red]" : ""}`}>
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
