import React from "react";
import styles from "../../../styles/style";
import CountDown from "./CountDown";

const EventCard = () => {
  return (
    <div className={`w-full block bg-white rounded-lg lg:flex p-2 mb-12`}>
      <div className="w-full lg:w-[50] m-auto">
        <img
          src="http://127.0.0.1:1000/uploads/study-yellow-1693551134801-512617110.png"
          alt=""
        />
      </div>
      <div className="w-full lg:[w-50] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone 14pro max 8/256gb</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          porta mauris id ante laoreet porttitor. Praesent varius convallis dui.
          Sed lacus ligula, efficitur in neque quis, tempus sodales urna.
          Vestibulum dictum, odio id elementum ornare, orci leo porta ipsum,
          rutrum iaculis lacus massa nec ipsum. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Vestibulum porta mauris id ante laoreet
          porttitor. Praesent varius convallis dui. Sed lacus ligula, efficitur
          in neque quis, tempus sodales urna. Vestibulum dictum, odio id
          elementum ornare, orci leo porta ipsum, rutrum iaculis lacus massa nec
          ipsum.
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="pr-3 font-bold text-[18px] text-[#333] font-Roboto ">
              {" "}
              999$
            </h5>
            <h5 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
              1099$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            120 sold
          </span>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
