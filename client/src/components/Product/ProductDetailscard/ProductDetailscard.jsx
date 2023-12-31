import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/style";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const ProductDetailscard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <div className="bg-white">
        {data ? (
          <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
            <div className="w-[70%] sm:w-[60] h-[90vh] overflow-y-scroll sm:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
              <RxCross1
                size={30}
                className="absolute right-3 top-3 z-50 cursor-pointer"
                onClick={() => setOpen(false)}
              />
              <div className="block w-full sm:flex p-4">
                <div className="w-full sm:w-50%">
                  <img src={data?.images[0]?.url} alt="" />
                  <div className="flex mt-3">
                    <Link to={`/shop/${data.shop._id}`}>
                      <img
                        src={data?.shop?.avatar?.url}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full mr-2"
                      />
                    </Link>

                    <div>
                      <Link to={`/shop/${data.shop._id}`}>
                        <h3 className={`${styles.shop_name}`}>
                          {data.shop.name}
                        </h3>
                      </Link>

                      <h5 className="pb-3 text-[15px]">
                        ({data.shop.ratings} 10) Ratings
                      </h5>
                    </div>
                  </div>
                  <div
                    className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-[#fff] flex items-center">
                      Send Message <AiOutlineMessage />
                    </span>
                  </div>
                  <h5 className="text-[16px] text-[red] mt-5">
                    ({data.total_sell}) Sold Out
                  </h5>
                </div>
                <div className="w-full sm:w-[50%] pt-5 pl-[5px] pr-5[px]">
                  <h1 className={`${styles.productTitle} text-[20px]`}>
                    {data.name}
                  </h1>
                  <p>{data.description}</p>
                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      {data.discount_price}
                    </h4>
                    <h3 className={`${styles.price}`}>
                      {data.price ? data.price + "$" : null}
                    </h3>
                  </div>
                  <div className="flex items-center mt-12 justify-between pr-3">
                    <div>
                      <button
                        className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={decrementCount}
                      >
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2">
                        {count}
                      </span>
                      <button
                        className="bg-gradient-to-l from-teal-500 to-teal-400 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={incrementCount}
                      >
                        +
                      </button>
                    </div>
                    <div>
                      {click ? (
                        <AiFillHeart
                          size={22}
                          className="cursor-pointer  right-2 top-5"
                          onClick={() => setClick(!click)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={22}
                          className="cursor-pointer right-2  top-5"
                          onClick={() => setClick(!click)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                  >
                    <span className="text-[#fff] flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetailscard;
