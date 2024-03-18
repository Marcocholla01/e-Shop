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
    dispatch(getAllEventsShop(seller?._id));
  }, [dispatch]);

  // const allReviews =
  //   products && products.map((product) => product.reviews.flat());

  const ratings = products.map((product) => product.ratings);

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
                  className={`${styles.button} !rounded-[4px] !h-[42px]  mb-0 mr-7`}
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
           className="w-[96%] sm:flex gap-4"
          >
            {events && events.map((i, index) => <EventCard data={i} />)}
          </div>
        </div>
      )}

      {active === 3 && (
        <div>
          {products.map((product) => (
            <div>
              {product.reviews.map((review) => (
                <div key={review._id} className="w-full flex my-3">
                  <img
                    src={`${review?.user?.avatar?.url}`}
                    className="rounded-full w-[50px] h-[50px]"
                    alt=""
                  />
                  <div className="pl-2">
                    <div className="flex w-full items-center">
                      <h1 className="pr-2 font-[600]"> </h1>
                      <Ratings rating={review.rating} />
                    </div>
                    <p className="font-[400] text-[#000000a7]">
                      {review.comment}{" "}
                    </p>
                    <p className="text-[14px] text-[#000000a7] ">{`2 Days ago`}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
