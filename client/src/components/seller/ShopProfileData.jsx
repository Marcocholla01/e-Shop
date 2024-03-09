import React, { useEffect, useState } from "react";
import ProductCard from "../Product/ProductCard/ProductCard";
import { productData } from "../../static/data";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/style";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import Ratings from "../Product/Ratings/Ratings";
import { getAllEventsShop } from "../../redux/actions/event";
import EventCard from "../Route/Events/EventCard";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.product);
  const { events, isLoading } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);

  const { id } = useParams();
  const [active, setActive] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);

  const allReviews =
    products && products.map((product) => product.reviews.flat());

  // console.log(allReviews);
  // console.log(events);
  return (
    <div className="w-full">
      <div className="sm:flex block w-full items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer texxt-[20px] font-[600] pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer texxt-[20px] font-[600] pr-[20px]`}
            >
              Running Events
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer texxt-[20px] font-[600] pr-[20px]`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to={`/dashboard`}>
                <div
                  className={`${styles.button} !rounded-[4px] !h-[42px]  mb-0`}
                >
                  <span className="text-[#fff]">Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <br />
      {active === 1 && (
        <div
          className={`grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25] lg:gap-[25px] lg:grid-cols-3 xl:grid-cols-4 mb-12 border-0 sm:mt-7 mt-0`}
        >
          {products &&
            products.map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
        </div>
      )}

      {active == 2 && (
        <div className="w-full">
          <div
            className={`grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25] lg:gap-[25px] lg:grid-cols-3 xl:grid-cols-4 mb-12 border-0 sm:mt-7 mt-0`}
          >
            {events &&
              events.map((i, index) => (
                <EventCard data={i} />
              ))}
          </div>
        </div>
      )}

      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item, index) => (
              <div className="w-full flex my-3">
                <img
                  src={`${item[0].user.avatar.url}`}
                  className="rounded-full w-[50px] h-[50px]"
                  alt=""
                />
                <div className="pl-2">
                  <div className="flex w-full items-center">
                    <h1 className="pr-2 font-[600]">{item[0].user.name} </h1>
                    <Ratings rating={item[0]?.rating} />
                  </div>
                  <p className="font-[400] text-[#000000a7]">
                    {item[0]?.comment}{" "}
                  </p>
                  <p className="text-[14px] text-[#000000a7] ">{`2 Days ago`}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
