import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header.jsx";
import Hero from "../../components/Route/Hero/Hero.jsx";
import Categories from "../../components/Route/Categoreis/Categories.jsx";
import BestDeals from "../../components/Route/BeastDeals/BestDeals.jsx";
import FeaturedProducts from "../../components/Product/FeaturedProducts/FeaturedProducts.jsx";
import Events from "../../components/Route/Events/Events.jsx";
import Sponsored from "../../components/Route/Sponsored/Sponsored.jsx";
import Footer from "../../components/Layout/Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product.js";

function HomePage() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getAllProducts());
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, [dispatch]);
  // console.log(allProducts);
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals data={data} />
      <Events />
      <FeaturedProducts />
      <Sponsored />
      <Footer />
    </div>
  );
}

export default HomePage;
