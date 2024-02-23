import React from "react";
import Otp from "../../components/AppComponents/otp/otp";

const OtpPage = () => {
  return (
    <div
      className={`min-h-screen bg-grsy-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8`}
    >
      <Otp className={`w-[50%]`} />
    </div>
  );
};

export default OtpPage;
