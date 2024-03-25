import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import styles from "../../styles/style";
import { useSearchParams } from "react-router-dom";
import { productData } from "../../static/data";
import ProductCard from "../../components/Product/ProductCard/ProductCard";
import Footer from "../../components/Layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product";
import Loader from "../../components/Layout/Loader";
import DownloadApp from "../../components/DownloadApp/DownloadApp";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { allProducts, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts());
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    setData(sortedData);
  }, []);

  // console.log(allProducts);
  return (
    <div>
      <Header activeHeading={2} /> <br />
      <br />
      <>
        {isLoading ? (
          <Loader />
        ) : (
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
        )}
      </>
      <DownloadApp/>
      <Footer />
    </div>
  );
};

export default BestSellingPage;
