import React from "react";
import styles from "../../../styles/style";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/sony-Logo.png"
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
      </div>
      <div className="flex items-start">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/04/Dell-Logo-1989-2016.png"
          alt=""
          style={{ width: "150px", objectFit: "contain" }}
        />
      </div>
      <div className="flex items-start">
        <img
          src="https://uploads.wikimedia.org/wikipidea/commons/thumb/b/bf/LG_log-_%282015%29.svg/2560px-LG_logo_%282015%29.svg.png"
          alt=""
          style={{ width: "150px", objectFit: "contain" }}
        />
        <div className="flex items-start">
          <img
            src="http://127.0.0.1:1000/uploads/study-yellow-1693551134801-512617110.png"
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
