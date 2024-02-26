import React from "react";
import styles from "../../../styles/style";
import CountDown from "./CountDown";
import iphone from "../../../static/images/iphone.jpg";
import { backend_url } from "../../../config";

const EventCard = ({ active, data }) => {
  // console.log(data);
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-[50] m-auto">
        <img src={`${backend_url}/uploads/${data?.images[0]}`} alt="" />
      </div>
      <div className="w-full lg:[w-50] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
        <p>{data?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="pr-3 font-bold text-[18px] text-[#333] font-Roboto ">
              {" "}
              999 KSH
            </h5>
            <h5 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
              1099 KSHS
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
        </div>
        <CountDown data={data} />
      </div>
    </div>
  );
};

export default EventCard;
