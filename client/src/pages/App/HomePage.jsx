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
import DownloadApp from "../../components/DownloadApp/DownloadApp.jsx";
import WelcomePopup from "../../components/WelcomePopUp/WelcomePopup.jsx";

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

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Function to set a cookie
  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  // Function to get a cookie
  const getCookie = (name) => {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  };

  useEffect(() => {
    // Check if the welcome message has been shown before
    const welcomeShown = getCookie("welcomeShown");
    if (!welcomeShown) {
      setShowWelcomeModal(true);
      // Set a cookie to remember that the welcome message has been shown
      setCookie("welcomeShown", "true", 365); // Cookie expires in 365 days
    }
  }, []);

  const handleCloseModal = () => {
    setShowWelcomeModal(false);
  };

  return (
    <div>
      <div>
        {/* Render other components of your app here */}
        {/* The WelcomePopup will be rendered conditionally based on showWelcomeModal state */}
        <WelcomePopup isOpen={showWelcomeModal} onClose={handleCloseModal} />
      </div>

      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals data={data} />
      <Events />
      <FeaturedProducts />
      <Sponsored />
      <DownloadApp />
      <Footer />
    </div>
  );
}

export default HomePage;
