import React from "react";
import styles from "../../../styles/style";
import Fujitsu from '../../../static/images/Fujitsu-Logo.png'
import Sony from '../../../static/images/Sony-Logo.png'
import Dell from '../../../static/images/Dell-Logo.png'
import Lenovo from '../../../static/images/Lenovo-Logo.png'
import Cisco from '../../../static/images/Cisco-Logo.png'
import Apple from '../../../static/images/Apple-Logo.png'

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 rounded-xl`}
    >
      <div className="flex justify-between w-full items-center">
        <div className="cursor-pointer flex items-start">
          <img
            src={Sony}
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div><div className="cursor-pointer flex items-start">
          <img
            src={Dell}
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="cursor-pointer flex items-start">
          <img
            src={Lenovo}
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="cursor-pointer flex items-start">
          <img
            src={Cisco}
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="cursor-pointer flex items-start">
          <img
            src={Fujitsu}
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="cursor-pointer flex items-start">
          <img
            src={Apple}
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>

      </div>

    </div>
  );
};

export default Sponsored;
