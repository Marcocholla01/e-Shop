import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

import { useParams, useSearchParams } from "react-router-dom";
import { productData } from "../../static/data";
import SuggestedProducts from "../../components/Product/SuggestedProducts/SuggestedProducts";
import EventDetails from "../../components/Event/EventDetails/EventDetails.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const { allEvents } = useSelector((state) => state.event);
  // const productName = name.replace(/-/g, " ");
  // console.log("product Name :", productName);
  

  useEffect(() => {
    axios
      .get(`${BASE_URL}/event/${id}`)
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
      <EventDetails data={data} />
      {/* {data && <SuggestedProducts data={data} />} */}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
