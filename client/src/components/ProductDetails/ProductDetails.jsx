import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();

  const handleMessageSubmit = () => {
    navigate(`/inbox?conversation=uhvshjdu3455h8`);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full sm:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data.image_Url[select].url}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex">
                  <div
                    className={`${
                      select === 0 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[1].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] }">
                <div className="w-full  800px:w-[50%] pt-5">
                  <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                  <p>{data.description}</p>
                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      {data.discount_price}$
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
                    className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                  >
                    <span className="text-white flex items-center">
                      Add to cart <AiOutlineShoppingCart />
                    </span>
                  </div>
                  <div className="flex items-center pt-8">
                    <img
                      src={data.shop.shop_avatar.url}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`${styles.shop_name} pb-1 pt-1 mr-8`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        ({data.shop.ratings})Ratings
                      </h5>
                    </div>
                    <div
                      className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                      onClick={handleMessageSubmit}
                    >
                      <span className="text-white flex items-center">
                        Send Message <AiOutlineMessage className="ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className=" bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={`cursor-pointer px-1 leading-5 text-[#000] text-[18px] font-[600] 800px:text-[20px]`}
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
          {" "}
          <p className={`py-2 text-[18px] leading-8 pb-10 whitespace-pre-line`}>
            Product details are a crucial part of any eCommerce website or
            online marketplace. These details help the potential customers to
            make an informed decision about the product they are interested in
            buying. A well-written product description can also be a powerful
            marketing tool that can help to increase sales.Product details
            typically include information about the product's features,
            specifications, dimensions, weight, materials, and other relevant
            information that can help customers to understand the product
            better. The product details section should also include high-quality
            images and videos of the product, as well as customer reviews and
            ratings.
          </p>
          <p className={`py-2 text-[18px] leading-8 pb-10 whitespace-pre-line`}>
            Product details are a crucial part of any eCommerce website or
            online marketplace. These details help the potential customers to
            make an informed decision about the product they are interested in
            buying. A well-written product description can also be a powerful
            marketing tool that can help to increase sales.Product details
            typically include information about the product's features,
            specifications, dimensions, weight, materials, and other relevant
            information that can help customers to understand the product
            better. The product details section should also include high-quality
            images and videos of the product, as well as customer reviews and
            ratings.
          </p>
          <p className={`py-2 text-[18px] leading-8 pb-10 whitespace-pre-line`}>
            Product details are a crucial part of any eCommerce website or
            online marketplace. These details help the potential customers to
            make an informed decision about the product they are interested in
            buying. A well-written product description can also be a powerful
            marketing tool that can help to increase sales.Product details
            typically include information about the product's features,
            specifications, dimensions, weight, materials, and other relevant
            information that can help customers to understand the product
            better. The product details section should also include high-quality
            images and videos of the product, as well as customer reviews and
            ratings.
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <p className="w-full justify-center flex items-center min-h-[40vh]">
          {" "}
          No Reviews Yet!
        </p>
      ) : null}
      {active === 3 ? (
        <div className="w-full block sm:flex p-5">
          <div className="w-full sm:w-[50%]">
            <div className="flex items-center">
              <img
                src={data.shop.shop_avatar.url}
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="pl-2">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-3 text-[15px]">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
            </div>
            <p className="pt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum porta mauris id ante laoreet porttitor. Praesent varius
              convallis dui. Sed lacus ligula, efficitur in neque quis, tempus
              sodales urna. Vestibulum dictum, odio id elementum ornare, orci
              leo porta ipsum, rutrum iaculis lacus massa nec ipsum. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Vestibulum porta
              mauris id ante laoreet porttitor. Praesent varius convallis dui.
              Sed lacus ligula, efficitur in neque quis, tempus sodales urna.
              Vestibulum dictum, odio id elementum ornare, orci leo porta ipsum,
              rutrum iaculis lacus massa nec ipsum
            </p>
          </div>
          <div className="w-full sm:w-[50%] mt-5 sm:nt-0 sm:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on: <span className="font-[500]">14 May 2023</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products: <span className="font-[500]">1,334</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews: <span className="font-[500]">131</span>
              </h5>
              <Link to="/products" className="inline-block">
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
