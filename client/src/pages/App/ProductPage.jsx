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

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { allProducts, isLoading } = useSelector((state) => state.product);

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
  }, []);

  return (
    <div>
      <Header activeHeading={3} /> <br />
      <br />
      <>
        <div className={`${styles.section}`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 mb-12">
            {data &&
              data.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
          {data && data.length === 0 ? (
            <h1 className="text-center w-full pb-[110px] text-[20px]">
              No Products Found !
            </h1>
          ) : null}
        </div>
      </>
      <Footer />
    </div>
  );
};

export default ProductPage;
