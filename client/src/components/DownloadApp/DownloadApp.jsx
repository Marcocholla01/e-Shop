import React from "react";
import { Link } from "react-router-dom";

const DownloadApp = () => {
  return (
    <div>
      <div className="flex flex-row mt-10 justify-center items-center">
        <img
          src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1697688091%2Fsettings%2Fapp-download-img-left_s5n2zf.webp&w=640&q=75"
          alt=""
          className="sm:flex hidden"
        />

        <div className="flex flex-col justify-between gap-3 items-center">
          <h1 className="font-[600] text-[36px] text-center">
            Get Your Daily Needs From Our ShopO Store
          </h1>
          <p className="text-lg text-center m-4">
            There are many products you will find in our shop, Choose your daily
            necessary product from our ShopO shop and get some special offers.
          </p>

          <div className="flex gap-4">
            <Link to={`/comming-soon`}>
              <img
                src="https://res.cloudinary.com/ahossain/image/upload/v1697688165/settings/app-store_cyyc0f.svg"
                alt=""
              />
            </Link>
            <Link to={`/comming-soon`}>
              <img
                src="https://res.cloudinary.com/ahossain/image/upload/v1697688167/settings/play-store_cavwua.svg"
                alt=""
              />
            </Link>
          </div>
        </div>
        <img
          src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1697688091%2Fsettings%2Fapp-download-img-left_s5n2zf.webp&w=640&q=75"
          alt=""
          className="sm:flex hidden"
        />
      </div>
    </div>
  );
};

export default DownloadApp;
