import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/style";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import {
  addToWishList,
  removeFromWishList,
} from "../../../redux/actions/wishList";

const ProductDetailscard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (wishList && wishList.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishList]);

  const removeFromWishListHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishList(data));
  };

  const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addToWishList(data));
  };

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error(`Item already exists`);
    } else {
      if (data.stock < count) {
        toast.error(`Product Stock limited`);
        return;
      }
      const cartData = { ...data, qty: count };
      dispatch(addToCart(cartData));
      toast.success(`Item added to cart successfully`);
    }
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
                  <img
                    src={data?.images[0]?.url}
                    alt=""
                    className="w-auto h-[450px]"
                  />
                  <div className="flex mt-3 items-center">
                    <Link to={`/shop/preview/${data.shop._id}`}>
                      <img
                        src={data?.shop?.avatar?.url}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full mr-2"
                      />
                    </Link>

                    <div>
                      <Link to={`/shop/preview/${data.shop._id}`}>
                        <h3 className={`${styles.shop_name}`}>
                          {data.shop.name}
                        </h3>
                      </Link>
                      <h5 className="pb-3 text-[15px]">
                        ({data.shop.ratings}4/5) Ratings
                      </h5>
                    </div>
                  </div>
                  <div
                    className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-[#fff] flex items-center mr-2">
                      Send Message <AiOutlineMessage className="ml-2" />
                    </span>
                  </div>
                  <h5 className="text-[16px] text-[red] mt-5">
                    ({data.total_sell}200) Sold Out
                  </h5>
                </div>
                <div className="w-full sm:w-[50%] pt-5 pl-[5px] pr-5[px]">
                  <h1 className={`${styles.productTitle} text-[20px]`}>
                    {data.name}
                  </h1>
                  <p>
                    {data.description.length > 500
                      ? data.description.slice(0, 500) + "..."
                      : data.description}
                  </p>
                  <div className="flex pt-3">
                    <h4
                      className={`${styles.productDiscountPrice} text-[21px]`}
                    >
                      {data.discountPrice} KSHS
                    </h4>
                    <h3 className={`${styles.price} text-[18px]`}>
                      {data.originalPrice ? data.originalPrice + "KSHS" : null}
                    </h3>
                  </div>
                  <div className="flex items-center mt-12 justify-between pr-3">
                    <div>
                      <button
                        className={`bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out`}
                        onClick={decrementCount}
                      >
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2">
                        {count}
                      </span>
                      <button
                        className={
                          data.stock < count
                            ? `bg-gradient-to-l from-teal-500 to-teal-400 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out`
                            : `bg-gradient-to-l from-teal-500 to-teal-400 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out`
                        }
                        onClick={() => incrementCount(data)}
                      >
                        +
                      </button>
                    </div>
                    <div>
                      {click ? (
                        <AiFillHeart
                          size={22}
                          className="cursor-pointer  right-2 top-5"
                          onClick={() => removeFromWishListHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={22}
                          className="cursor-pointer right-2  top-5"
                          onClick={() => addToWishListHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                    onClick={() => addToCartHandler(data._id)}
                  >
                    <span className="text-[#fff] flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-2" />
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
