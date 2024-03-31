import React from "react";
import PaymentDetails from "../AppComponents/PaymentDetails/PaymentDetails";

const AdminPaymentDetails = () => {
  return (
    <div className="w-full flex justify-center mt-3 ">
      <div className="w-[95%] overflow-y-auto z-[5] h-[90vh]">
        <h3 className="text-[22px] font-Poppins pb-2 text-center">
          Payment Details
        </h3>
        <div className="w-full min-h-[45vh] bg-white rounded ">
          <PaymentDetails />
        </div>
      </div>
    </div>
  );
};

export default AdminPaymentDetails;
