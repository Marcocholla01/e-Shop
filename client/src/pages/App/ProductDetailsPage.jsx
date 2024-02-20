import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

import { useParams } from "react-router-dom";
import { productData } from "../../static/data";
import SuggestedProducts from "../../components/Product/SuggestedProducts/SuggestedProducts";
import ProductDetails from "../../components/Product/ProductDetails/ProductDetails";
import { getAllProducts } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const { allProducts } = useSelector((state) => state.product);
  // const productName = name.replace(/-/g, " ");
  // console.log("product Name :", productName);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/product/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  // console.log(id);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProducts data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
