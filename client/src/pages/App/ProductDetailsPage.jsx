import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

import { useParams } from "react-router-dom";
import { productData } from "../../static/data";
import SuggestedProducts from "../../components/Product/SuggestedProducts/SuggestedProducts";
import ProductDetails from "../../components/Product/ProductDetails/ProductDetails";
import { getAllProducts, getProduct } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import DownloadApp from "../../components/DownloadApp/DownloadApp";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const { allProducts, singleProduct } = useSelector((state) => state.product);
  // const productName = name.replace(/-/g, " ");
  // console.log("product Name :", productName);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${BASE_URL}/product/${id}`)
      .then((res) => {
        setData(res.data);
        dispatch(getProduct(id));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [allProducts]);

  // useEffect(() => {
  //   dispatch(getProduct(id));
  // }, [dispatch]);

  // console.log(id);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProducts data={data} />}
      <DownloadApp />
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
