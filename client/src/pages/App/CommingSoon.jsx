import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import soon from "../../assets/images/comming-soon.png"

const CommingSoon = () => {
  return (
    <div>
      <Header />
      <div className="text-center items-center  justify-center flex flex-col">
        <img
          src={soon}
          alt=""
          className="w-[35%] h-min p-2 mb-2 object-cover"
        />
        <h1 className="font-bold text-[#263238] sm:text-3xl md:text-5xl text-md uppercase">
          Comming Soon
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default CommingSoon;
