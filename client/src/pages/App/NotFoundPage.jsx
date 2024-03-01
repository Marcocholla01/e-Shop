import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Error404 from "../../assets/images/404-error-with-a-tired-person-bro.png";

function NotFoundPage() {
  return (
    <div>
      <Header />
      <div className="text-center items-center  justify-center flex flex-col">
        <img
          src={Error404}
          alt=""
          className="w-[35%] h-min p-2 mb-2 object-cover"
        />
        <h1 className="font-bold text-[#263238] sm:text-3xl md:text-5xl text-md uppercase">
          Sorry!! Page Not Found
        </h1>
      </div>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
