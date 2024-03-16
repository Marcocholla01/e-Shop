import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import styles from "../../styles/style";
import { useSearchParams } from "react-router-dom";
import { productData } from "../../static/data";

import Footer from "../../components/Layout/Footer";
import ProductCard from "../../components/Product/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product";
import Loader from "../../components/Layout/Loader";
import Categories from "../../components/Route/Categoreis/Categories";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { allProducts, isLoading } = useSelector((state) => state.product);

  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const CurrentlyDisplayedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const itemStartIndex = startIndex + 1;
  const itemEndIndex = Math.min(endIndex, data.length);

  useEffect(() => {
    dispatch(getAllProducts());
    if (categoryData === null) {
      const d =
        allProducts &&
        [...allProducts].sort((a, b) => a.total_sold - b.total_sold);
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    // window.scrollTo(0, 0);
  }, [allProducts]);

  return (
    <div>
      <Header activeHeading={3} /> <br />
      <br />
      <>
        <div>
          <br />
        
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 mb-12">
              {CurrentlyDisplayedData &&
                CurrentlyDisplayedData.map((i, index) => (
                  <ProductCard data={i} key={index} />
                ))}
            </div>
            {CurrentlyDisplayedData && CurrentlyDisplayedData.length === 0 ? (
              <h1 className="text-center w-full pb-[110px] text-[20px]">
                No Products Found !
              </h1>
            ) : null}
          </div>
        </div>
      </>
      <br />
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
                {data.length}
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
                          : "flex items-center  justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-white"
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
      <Footer />
    </div>
  );
};

export default ProductPage;
