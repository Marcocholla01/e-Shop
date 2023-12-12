import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

const WishList = ({ setOpenWishList }) => {
  const cartData = [
    {
      name: "Iphone 14 pro max 256gb ssd 8gb ram",
      description: "ttttt",
      price: "999",
    },
    {
      name: "Iphone 14 pro max 256gb ssd 8gb ram",
      description: "ttttt",
      price: "699",
    },
    {
      name: "Iphone 14 pro max 256gb ssd 8gb ram",
      description: "ttttt",
      price: "887",
    },
    {
      name: "Iphone 14 pro max 256gb ssd 8gb ram",
      description: "ttttt",
      price: "934",
    },
  ];
  return (
    <div className="fixed top-0 w-full left-0 h-screen z-10 bg-[#0000004b]">
      <div className="fixed top-0 right-0 min-h-full w-[25%] shadow-sm bg-white flex flex-col justify-between">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenWishList(false)}
            />
          </div>
          {/* Items length */}
          <div className={`${styles.normalFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 font-[500] text-[20px]">3 items</h5>
          </div>
          {/* cart single items */}
          <br />
          <div className="w-full border-t">
            {cartData &&
              cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1 className="cursor-pointer" size={20} />
        <img
          src="https://www.ikojn.com/cdn/shop/files/DSC05671_1024x1024.png?v=1692294100"
          alt=""
          className="w-[80px] h-[80px] object-cover ml-2"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US ${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to cart"
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default WishList;
