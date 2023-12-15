import React from "react";
import Header from "../../components/Layout/Header.jsx";
import Hero from "../../components/Route/Hero/Hero.jsx";
import Categories from "../../components/Route/Categoreis/Categories.jsx";
import BestDeals from "../../components/Route/BeastDeals/BestDeals.jsx";
import FeaturedProducts from "../../components/Product/FeaturedProducts/FeaturedProducts.jsx";
import Events from "../../components/Route/Events/Events.jsx";
import Sponsored from "../../components/Route/Sponsored/Sponsored.jsx";
import Footer from "../../components/Layout/Footer.jsx";

function HomePage() {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProducts />
      <Sponsored />
      <Footer />
    </div>
  );
}

export default HomePage;
