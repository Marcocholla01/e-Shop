import React, { useState, useEffect } from "react";
import { productData } from "../../../static/data.jsx";
import styles from "../../../styles/style.jsx";
import ProductCard from "../../ProductCard/ProductCard.jsx";

const BestDeals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const sortedData =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstFive = sortedData.slice(0, 5);
    setData(firstFive);
  }, []);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="flex flex-wrap justify-start">
          {data &&
            data.map((product, index) => (
              <div
                key={index}
                className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 mb-4"
              >
                <ProductCard data={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
