import React, { useState, useEffect } from "react";
import { productData } from "../../../static/data.jsx";
import styles from "../../../styles/style.jsx";
import ProductCard from "../../Product/ProductCard/ProductCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/actions/product.js";
import Loader from "../../Layout/Loader.jsx";

const BestDeals = ({ data }) => {
  // const [data, setData] = useState([]);
  // const dispatch = useDispatch();
  const { allProducts, isLoading } = useSelector((state) => state.product);
  // useEffect(() => {
  //   dispatch(getAllProducts());
  //   const allProductsData = allProducts ? [...allProducts] : [];
  //   const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
  //   const firstFive = sortedData && sortedData.slice(0, 5);
  //   setData(firstFive);
  // }, [dispatch]);
  // console.log(allProducts);

  // useEffect(() => {
  //   dispatch(getAllProducts());
  //   const firstFive = allProducts && allProducts.slice(0, 5);
  //   setData(firstFive);
  // }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${styles.section}`}>
          <div className="flex flex-col items-center mb-5">
  <h1 className={`${styles.heading}`}>Latest Discounted Products</h1>
  <p className="text-lg mr-3 ml-3 text-center sm:w-[50%] w-[80%]">See Our latest discounted products below. Choose your daily needs from here and get a special discount with free shipping.</p>
</div>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
            {/* {data && data.map((i, index) => <ProductCard data={i} key={index} />)} */}
            {data && data.length !== 0 && (
              <>
                {data &&
                  data.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BestDeals;
