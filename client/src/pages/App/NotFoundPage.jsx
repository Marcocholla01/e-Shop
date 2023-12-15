import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

function NotFoundPage() {
  return (
    <div>
      <Header />
      <div className="w-full h-full flex items-center flex-col m-3 p-3">
        <br />
        <br />
        <h1 className="text-[red] font-900 font-bold text-[110px] font-Roboto m-4 p-4">
          404
        </h1>
        <span className="text-[red]  font-bold text-[80px] font-Roboto m-4 p-4">
          NOT FOUND
        </span>
      </div>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
