import React, { useEffect, useState } from "react";
import styles from "../../../styles/style";
import { productData } from "../../../static/data";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/actions/product";
import Loader from "../../Layout/Loader";

const FeaturedProducts = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { allProducts, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
    const allProductsData = allProducts ? [...allProducts] : [];
    const firstFive = allProductsData && allProductsData.slice(0, 5);
    setData(firstFive);
  }, [dispatch]);

  // console.log(allProducts);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${styles.section}`}>
          <div className="flex flex-col items-center mb-5">
            <h1 className={`${styles.heading}`}>Featured Products for Daily Shopping</h1>
            <p className="text-lg mr-3 ml-3 text-center sm:w-[50%] w-[80%]">
            See some of our featured products in this week. You can choose your daily needs products from this list and get some special offer with free shipping.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
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

export default FeaturedProducts;
