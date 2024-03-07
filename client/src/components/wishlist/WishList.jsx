import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../../redux/actions/wishList";
import { toast } from "react-toastify";
import WishListImage from "../../assets/images/wishlist.avif";
import { addToCart } from "../../redux/actions/cart";

const WishList = ({ setOpenWishList }) => {
  const { wishList } = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  const removeFromWishListHandler = (data) => {
    dispatch(removeFromWishList(data));
    toast.info(`Product removed form wishList`);
  };

  const addToCartHandler = (data) => {
    const cartData = { ...data, qty: 1 };
    dispatch(addToCart(cartData));
    toast.success(`Item added to cart successfully`);
  };

  return (
    <div className="fixed top-0 w-full left-0 h-screen z-50 bg-[#0000004b]">
      <div className="fixed top-0 right-0 min-h-full  w-[100%] sm:w-[25%] shadow-sm bg-white flex flex-col justify-between">
        {wishList && wishList.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div
              className={`flex w-full justify-end fixed pt-5 pr-5 top-3 right-3`}
            >
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishList(false)}
              />
            </div>
            <div className="text-center items-center  justify-center">
              <img
                src={WishListImage}
                alt=""
                className="w-full h-min p-2 mb-2 object-cover"
              />
              <h5 className="font-semibold">Your wishlist is empty</h5>
            </div>
          </div>
        ) : (
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
              <h5 className="pl-2 font-[500] text-[20px]">
                {wishList && wishList.length} items
              </h5>
            </div>
            {/* cart single items */}
            <br />
            <div className="w-full border-t">
              {wishList &&
                wishList.map((i, index) => (
                  <CartSingle
                    key={index}
                    data={i}
                    removeFromWishListHandler={removeFromWishListHandler}
                    addToCartHandler={addToCartHandler}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishListHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  // console.log(data);
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1
          className="cursor-pointer w-[10%]"
          size={20}
          onClick={() => removeFromWishListHandler(data)}
        />
        <img
          src={data?.images[0].url}
          alt=""
          className="w-[100px] h-min mr-2 rounded-[5px] object-cover ml-2"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            KSHS {totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={30}
            className="cursor-pointer"
            title="Add to cart"
            onClick={() => addToCartHandler(data)}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default WishList;
