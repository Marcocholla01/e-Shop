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
import { format } from "timeago.js";

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

  // const ratings = products.map((product) => product.ratings);

  // console.log(allReviews);
  // console.log(events);

  const PAGE_SIZE = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const CurrentlyDisplayedData = events?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(events?.length / PAGE_SIZE);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(endIndex, events?.length);

  const PAGE_SIZE2 = 8;
  const [currentPage1, setCurrentPage1] = useState(1);
  const startIndex1 = (currentPage1 - 1) * PAGE_SIZE2;
  const endIndex1 = startIndex1 + PAGE_SIZE2;
  const CurrentlyDisplayedData1 = products?.slice(startIndex1, endIndex1);
  const totalPages1 = Math.ceil(products?.length / PAGE_SIZE2);
  const itemStartIndex1 = startIndex1 + 1;
  const itemEndIndex1 = Math.min(endIndex1, products?.length);
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
        <div>
          <div
            className={`grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25] lg:gap-[25px] lg:grid-cols-3 xl:grid-cols-4 mb-12 border-0 sm:mt-7 mt-0`}
          >
            {products &&
              products.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} />
              ))}
          </div>
          {CurrentlyDisplayedData1 && CurrentlyDisplayedData1.length !== 0 ? (
            <nav
              className="flex items-center flex-column flex-wrap md:flex-row justify-center p-4  gap-4"
              aria-label="Table navigation"
            >
              <p className="flex items-center  justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300  dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 rounded-lg ">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                  SHOWING{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {itemStartIndex1}-{itemEndIndex1}
                  </span>{" "}
                  OF{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {events.length}
                  </span>
                </span>
              </p>

              <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-10">
                <li>
                  <button
                    onClick={() => setCurrentPage1(currentPage1 - 1)}
                    disabled={currentPage == 1}
                    className="flex items-center disabled:cursor-not-allowed justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </button>
                </li>
                {
                  // Array.from(iterable, mapFunction)
                  Array.from({ length: totalPages1 }, (item, index) => {
                    return (
                      <li key={index}>
                        <button
                          onClick={() => setCurrentPage1(index + 1)}
                          // disabled={currentPage === index + 1}
                          className={
                            currentPage1 == index + 1
                              ? "flex items-center justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-[#0EB981] border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-[#0eb981] dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                              : `flex items-center  justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-white`
                          }
                        >
                          {index + 1}
                        </button>
                      </li>
                    );
                  })
                }

                <li>
                  <button
                    onClick={() => setCurrentPage1(currentPage1 + 1)}
                    disabled={currentPage1 === totalPages1}
                    className="flex items-center disabled:cursor-not-allowed justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          ) : null}
        </div>
      )}

      {active == 2 && (
        <div className="w-full">
          <div className="w-[96%] sm:flex gap-4">
            {CurrentlyDisplayedData &&
              CurrentlyDisplayedData.map((i, index) => <EventCard data={i} />)}
          </div>
          {CurrentlyDisplayedData && CurrentlyDisplayedData.length !== 0 ? (
            <nav
              className="flex items-center flex-column flex-wrap md:flex-row justify-center p-4  gap-4"
              aria-label="Table navigation"
            >
              <p className="flex items-center  justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300  dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 rounded-lg ">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                  SHOWING{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {itemStartIndex}-{itemEndIndex}
                  </span>{" "}
                  OF{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {events.length}
                  </span>
                </span>
              </p>

              <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-10">
                <li>
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage == 1}
                    className="flex items-center disabled:cursor-not-allowed justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </button>
                </li>
                {
                  // Array.from(iterable, mapFunction)
                  Array.from({ length: totalPages }, (item, index) => {
                    return (
                      <li key={index}>
                        <button
                          onClick={() => setCurrentPage(index + 1)}
                          // disabled={currentPage === index + 1}
                          className={
                            currentPage == index + 1
                              ? "flex items-center justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-[#0EB981] border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-[#0eb981] dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                              : `flex items-center  justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-white`
                          }
                        >
                          {index + 1}
                        </button>
                      </li>
                    );
                  })
                }

                <li>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center disabled:cursor-not-allowed justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          ) : null}
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
                      <h1 className="pr-2 font-[600]">{review?.user?.name} </h1>
                      <Ratings rating={review.rating} />
                    </div>
                    <p className="font-[400] text-[#000000a7]">
                      {review.comment}{" "}
                    </p>
                    <p className="text-[14px] text-[#000000a7] ">
                      {format(review.createdAt)}
                    </p>
                    <p className="font-semibold text-[#000000a7]">Product Reviewed: {product.name}</p>
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
