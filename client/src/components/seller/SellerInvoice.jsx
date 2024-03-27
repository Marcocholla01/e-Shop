import React from "react";
import SalesInvoice from "../AppComponents/Invoice/SalesInvoice";

const SellerInvoice = () => {
  return (
    <div className="w-full flex justify-center mt-3 ">
      <div className="w-[95%] overflow-y-auto z-[5] h-[90vh]">
        <h3 className="text-[22px] font-Poppins pb-2 text-center">
          Invoice Details
        </h3>
        <div className="w-full min-h-[45vh] bg-white rounded ">
          <SalesInvoice />
        </div>
      </div>
    </div>
  );
};

export default SellerInvoice;
