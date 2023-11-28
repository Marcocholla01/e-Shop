import React from "react";
import banner from "../../../assets/images/banner-1.jpg";
import styles from "../../../styles/style";
import { Link } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70px] sm:min-h-[80vh] w-[100%] bg-cover bg-no-repeat object-fit: contain ${styles.normalFlex} `}
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className={`${styles.section} w-[90%] sm:w-[60%]`}>
        <h1 className="text-[35px] leading-[1.2] sm:text-[60px] text-[#3d3a3a] font-[600] capitalize">
          Best collection for <br /> home decoration
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          porta mauris id ante laoreet porttitor. <br /> Praesent varius
          convallis dui. Sed lacus ligula, efficitur in neque quis, tempus
          sodales urna. Vestibulum dictum, odio <br />
          id elementum ornare, orci leo porta ipsum, rutrum iaculis lacus massa
          nec ipsum.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px] flex items-center gap-3">
              Shop Now <IoIosArrowDroprightCircle size={30} />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
