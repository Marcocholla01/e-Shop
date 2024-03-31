import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailscard from "../ProductDetailscard/ProductDetailscard";
import styles from "../../../styles/style.jsx";
import {
  addToWishList,
  removeFromWishList,
} from "../../../redux/actions/wishList";
import { addToCart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../Ratings/Ratings.jsx";
import { backend_url } from "../../../config.js";

const ProductCard = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

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
    toast.info(`Product removed from wishList items`);
  };

  const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addToWishList(data));
    toast.info(`Product added to wishList items`);
  };

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error(`Item already exists`);
    } else {
      if (data.stock < 1) {
        toast.error(`Product Stock limited`);
        return;
      }
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData));
      toast.success(`Item added to cart successfully`);
    }
  };

  // Calculate discount percentage
  let discountPercentage = 0; // Initialize discount percentage to 0

  if (data.discountPrice && data.originalPrice) {
    // Check if discountPrice and originalPrice are not null or undefined
    discountPercentage = Math.round(
      ((data.originalPrice - data.discountPrice) / data.originalPrice) * 100
    ); // Calculate the discount percentage
  }

  // const d = data.name;
  // const product_name = d.replace(/\$+/g, "-");
  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative   items-center">
      <div className="relative">
        {discountPercentage > 0 && (
          <span
            className={`absolute top-2 left-2 rounded-md px-2 py-1 
    ${
      discountPercentage >= 30
        ? "bg-red-500"
        : discountPercentage >= 20
        ? "bg-green-500"
        : "bg-blue-500"
    }
    text-white`}
          >
            {discountPercentage}% OFF
          </span>
        )}
        <div className="justify-between">
          <Link to={`/product/${data?._id}`}>
            {/* window.location.reload(true); */}
            <img
              src={`${backend_url}/uploads/${
                data?.images && data?.images[0]?.filename
              }`}
              alt=""
              className=" h-[135px] object-contain rounded-md self-center"
            />
          </Link>
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
          </Link>
          <Link to={`/product/${data?._id}`}>
            <h4 className="pb-3 font-[500]">
              {data?.name?.length > 50
                ? data.name.slice(0, 50) + "..."
                : data.name}
            </h4>

            <div className="flex">
              <Ratings rating={data?.ratings} />
            </div>
            <div className="py-2 flex items-center justify-between">
              <div className="flex-row items-center justify-between">
                {data.discountPrice !== null ? (
                  <>
                    <h5 className={`${styles.productDiscountPrice} mb-2`}>
                      {data.discountPrice} KSHS
                    </h5>
                    <h4 className={`${styles.price} line-through`}>
                      {data.originalPrice ? data.originalPrice + " KSHS" : null}
                    </h4>
                  </>
                ) : (
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.originalPrice ? data.originalPrice + " KSHS" : null}
                  </h4>
                )}
              </div>
              <div className="py-2 flex-row items-center justify-between">
                {data?.stock !== 0 ? (
                  <div className="bg-green-600 rounded-md  p-1">
                    <span className="p-1 font-semibold text-sm text-[#fff]">
                      stock Available {data?.stock}
                    </span>
                  </div>
                ) : (
                  <div className="bg-red-600 rounded-md  p-1">
                    <span className="p-1 font-semibold text-sm text-[#fff]">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
          {/* side options */}
          <div>
            {click ? (
              <AiFillHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5"
                onClick={() => removeFromWishListHandler(data)}
                color={click ? "red" : "#333"}
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={22}
                className="cursor-pointer right-2 absolute top-5"
                onClick={() => addToWishListHandler(data)}
                color={click ? "red" : "#333"}
                title="Add to wishlist"
              />
            )}
            <AiOutlineEye
              size={22}
              className="cursor-pointer absolute right-2 top-14"
              onClick={() => setOpen(!open)}
              color="#333"
              title="Quick View"
            />
            <AiOutlineShoppingCart
              size={25}
              className="cursor-pointer absolute right-2 top-24"
              onClick={() => addToCartHandler(data._id)}
              color="#444"
              title="Add to cart"
            />
            {open ? (
              <ProductDetailscard open={open} setOpen={setOpen} data={data} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
