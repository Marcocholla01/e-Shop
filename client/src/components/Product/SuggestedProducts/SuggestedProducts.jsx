import React, { useEffect, useState } from "react";
import styles from "../../../styles/style";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";

const SuggestedProducts = ({ data }) => {
  const [productsData, setProductsData] = useState();
  const { allProducts, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    const d =
      allProducts &&
      allProducts.filter((i) => i.category === data.product.category);
    setProductsData(d);
  }, []);
  // console.log(productsData);
  // console.log(data);

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
            {" "}
            {productsData &&
              productsData.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProducts;
