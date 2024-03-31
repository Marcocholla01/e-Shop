import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CouponCodeCard from "../../CouponCode/CouponCodeCard";

const OffersComponent = () => {
  const { CouponCode } = useSelector((state) => state.couponCode);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const PAGE_SIZE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const CurrentlyDisplayedData = CouponCode.slice(startIndex, endIndex);
  const totalPages = Math.ceil(CouponCode.length / PAGE_SIZE);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(endIndex, CouponCode.length);

  return (
    <div>
      <div className="w-full">
        <h2 className="text-center py-6 bg-slate-200 rounded-md font-bold text-lg">
          Latest Super Discount Active Coupon Code
        </h2>

        <div className="flex items-center flex-wrap w-full p-10 justify-center gap-10">
          {CurrentlyDisplayedData.map((couponData, index) => (
            <CouponCodeCard data={couponData} key={index} />
          ))}
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
                  {CouponCode.length}
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
    </div>
  );
};

export default OffersComponent;
