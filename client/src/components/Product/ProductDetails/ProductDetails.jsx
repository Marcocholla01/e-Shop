import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../../styles/style";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getAllProductsShop,
} from "../../../redux/actions/product";
import {
  addToWishList,
  removeFromWishList,
} from "../../../redux/actions/wishList";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import ProductDetailscard from "../ProductDetailscard/ProductDetailscard";
import Ratings from "../Ratings/Ratings";
import { BASE_URL, backend_url } from "../../../config";
import axios from "axios";

const ProductDetails = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);
  const { products } = useSelector((state) => state.product);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllProducts(id));
  }, []);

  const handleMessageSubmit = async () => {
    if (!isAuthenticated) {
      return toast.error(`Please login to send message`);
    } else {
      const groupTittle = data.product._id + user._id;
      const userId = user._id;
      const sellerId = data.product.shop._id;

      await axios
        .post(`${BASE_URL}/conversation/create-new-conversation`, {
          groupTittle,
          userId,
          sellerId,
        })
        .then((response) => {
          navigate(`/user/${user?._id}?${response.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    if (wishList && wishList.find((i) => i._id === data?._id)) {
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

  const addToCartHandler = (data) => {
    const isItemExist = cart && cart.find((i) => i._id === data._id);
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

  // Calculate totalreviewslength
  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
  const averageRating = (totalRatings / totalReviewsLength).toFixed(2) || 0;

  // console.log(averageRating);
  // console.log(totalRatings);
  // console.log(totalReviewsLength);
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full sm:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}/uploads/${data?.product?.images[select].filename}`}
                  alt=""
                  className="w-[80%] h-[450px] object-contain overflow-hidden rounded-md m-5"
                />
                <div className="w-full flex">
                  {/* {data?.product?.images?.url?.map((i, index) => (
                    <div
                      key={index}
                      className={`${
                        select === i ? "border" : "null"
                      } cursor-pointer`}
                    >
                      <img
                        src={i}
                        alt=""
                        className="h-[200px] overflow-hidden   "
                        onClick={() => setSelect(index + 1)}
                      />
                    </div>
                  ))} */}
                  <div
                    className={`${
                      select === 0
                        ? "border-4 border-blue-500 rounded-md "
                        : "null"
                    } cursor-pointer mr-4 mt-4`}
                  >
                    <img
                      src={`${backend_url}/uploads/${data?.product?.images[0].filename}`}
                      alt=""
                      className="h-[200px] overflow-hidden  rounded-md "
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1
                        ? "border-4 border-blue-500 rounded-md "
                        : "null"
                    } cursor-pointer mr-4 mt-4`}
                  >
                    <img
                      src={`${backend_url}/uploads/${data?.product?.images[1].filename}`}
                      alt=""
                      className=" h-[200px] overflow-hidden  rounded-md"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 2
                        ? "border-4 border-blue-500  rounded-md "
                        : "null"
                    } cursor-pointer mr-4 mt-4`}
                  >
                    <img
                      src={`${backend_url}/uploads/${data?.product?.images[2].filename}`}
                      alt=""
                      className="h-[200px] overflow-hidden  rounded-md "
                      onClick={() => setSelect(2)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 3
                        ? "border-4 border-blue-500 rounded-md "
                        : "null"
                    } cursor-pointer mr-4 mt-4`}
                  >
                    <img
                      src={`${backend_url}/uploads/${data?.product?.images[3]?.filename}`}
                      alt=""
                      className="h-[200px] overflow-hidden  rounded-md "
                      onClick={() => setSelect(3)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] }">
                <div className="w-full  800px:w-[50%] pt-5">
                  <h1 className={`${styles.productTitle}`}>
                    {data?.product?.name}
                  </h1>
                  <p>{data?.product?.description}</p>
                  <div className="flex pt-3">
                    <h4
                      className={`${styles.productDiscountPrice} text-[23px]`}
                    >
                      {data?.product?.discountPrice} KSHS
                    </h4>
                    <h3 className={`${styles.price} text-[18px]`}>
                      {data?.product?.originalPrice
                        ? data?.product?.originalPrice + "KSHS"
                        : null}
                    </h3>
                  </div>
                  <div className="flex items-center mt-12 justify-between pr-3">
                    {/* <div>
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
                    </div> */}
                    <div>
                      {data?.product?.tags}
                      {/* {click ? (
                        <AiFillHeart
                          size={22}
                          className="cursor-pointer  right-2 top-5"
                          // onClick={() => removeFromWishListHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={22}
                          className="cursor-pointer right-2  top-5"
                          // onClick={() => addToWishListHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                      )} */}
                    </div>
                    <div
                      className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                      onClick={() => setOpen(!open)}
                    >
                      <span className="text-white flex items-center">
                        Add to cart <AiOutlineShoppingCart className="ml-2" />
                      </span>
                    </div>
                    {open ? (
                      <ProductDetailscard
                        open={open}
                        setOpen={setOpen}
                        data={data.product}
                      />
                    ) : null}
                  </div>
                  <div className="flex items-center mt-12 justify-between pr-3">
                    <div className="flex items-center pt-8 gap-2">
                      <div>
                        <Link to={`/shop/preview/${data?.product?.shop?._id}`}>
                          <img
                            src={`${backend_url}/uploads/${data?.product?.shop?.avatar?.filename}`}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full mr-2 object-contain bg-slate-500"
                          />
                        </Link>
                      </div>
                      <div>
                        <Link to={`/shop/preview/${data?.product?.shop._id}`}>
                          <h3 className={`${styles.shop_name} pb-1 pt-1 mr-8`}>
                            {data?.product?.shop?.name}
                          </h3>
                        </Link>
                        <h5 className="pb-3 text-[15px]">
                          ({averageRating}/5)Ratings
                        </h5>
                      </div>
                    </div>
                    <div
                      className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11 ml-9`}
                      onClick={handleMessageSubmit}
                    >
                      <span className="text-white flex items-center">
                        Send Message <AiOutlineMessage className="ml-2" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo
            data={data}
            totalReviewsLength={totalReviewsLength}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data, totalReviewsLength }) => {
  // console.log(data);
  // console.log(totalReviewsLength);
  const [active, setActive] = useState(1);
  return (
    <div className=" bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={`cursor-pointer px-1 leading-5 text-[#000] text-[18px] font-[600] 800px:text-[20px] mb-1`}
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={`cursor-pointer px-1 leading-5 text-[#000] text-[18px] font-[600] 800px:text-[20px]`}
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={`cursor-pointer px-1 leading-5 text-[#000] text-[18px] font-[600] 800px:text-[20px]`}
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <h1 className={`${styles.productTitle} underline`}>
            {data?.product?.name}
          </h1>

          <div className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line ">
            <p>{data?.product?.description}</p>
          </div>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full  flex flex-col items-center min-h-[40vh] p-3 overflow-y-scroll">
          {data &&
            data?.product?.reviews?.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${backend_url}/uploads/${item.user.avatar.filename}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-2">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                  </div>
                  <Ratings rating={item.rating} />

                  <p>{item.comment} </p>
                </div>
              </div>
            ))}
          <div className="w-full flex justify-center">
            {data && data?.product?.reviews.length === 0 && (
              <h5> No reviews yet for this product</h5>
            )}
          </div>
        </div>
      ) : null}
      {active === 3 ? (
        <div className="w-full block sm:flex p-5">
          <div className="w-full sm:w-[50%]">
            <div className="flex items-center">
              <Link to={`/shop/preview/${data.product.shop._id}`}>
                <img
                  src={`${backend_url}/uploads/${data?.product?.shop?.avatar?.filename}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
              </Link>

              <div className="pl-2">
                <h3 className={`${styles.shop_name}`}>
                  {data?.product?.shop?.name}
                </h3>
                <h5 className="pb-3 text-[15px]">
                  ({data?.shop?.ratings}/5) Ratings
                </h5>
              </div>
            </div>
            <p className="pt-2">{data?.product?.shop?.description}</p>
          </div>
          <div className="w-full sm:w-[50%] mt-5 sm:nt-0 sm:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data?.product?.shop?.createdAt.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">{data?.product?.stock}</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">
                  {data?.product?.reviews?.length}{" "}
                </span>
              </h5>
              <Link
                to={`/shop/preview/${data.product.shop._id}`}
                className="inline-block"
              >
                <div
                  className={`${styles.button} mt-3 !rounded-[4px] !h-[39.5px]`}
                >
                  <span className="text-[#fff]">Visit Shop</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
