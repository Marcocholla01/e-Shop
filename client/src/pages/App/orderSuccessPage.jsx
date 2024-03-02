import React from "react";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../../assets/images/svg/animations/107043-success.json";
import CheckoutSteps from "../../components/Checkout/CheckoutSteps";

const orderSuccessPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Header />
      <br />
      <br />

      {/* <CheckoutSteps /> */}
      <Success />
      <br />
      <br />
      <Footer />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

export default orderSuccessPage;
