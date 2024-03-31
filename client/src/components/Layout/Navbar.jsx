import React from "react";
import styles from "../../styles/style";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";

function Navbar({ active }) {
  return (
    <div className={`block sm:${styles.normalFlex} mt-6`}>
      {navItems &&
        navItems.map((i, index) => (
          <div key={index} className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1
                  ? "text-[#17dd1f]"
                  : "text-black sm:text-[#fff]"
              }  px-6 cursor-pointer pb-[30px] font-bold`}
            >
              {i.title}
            </Link>
          </div>
        ))}
      <div className={` ml-4 sm:ml-0 sm:w-auto w-[200px] !rounded-[4px] sm:p-0 p-7 items-center gap-4 sm:pb-[30px] pb-[30px] px-2 font-bold sm:flex sm:bg-transparent bg-black ${styles.button}`}>
        <Dropdown
          label="More Pages"
          size="lg"
          className="font-bold sm:text-white text-black"
        >
          <Link to={`/about-us`}>
            <Dropdown.Item>About US</Dropdown.Item>
          </Link>
          <Link to={`/terms`}>
            <Dropdown.Item>Terms And Conditions</Dropdown.Item>
          </Link>
          <Link to={`/privacy`}>
            <Dropdown.Item>Privacy And Policy</Dropdown.Item>
          </Link>
          <Link to={`/contact`}>
            <Dropdown.Item>Contact US</Dropdown.Item>
          </Link>
          <Link to={`/comming-soon`}>
            <Dropdown.Item>Comming Soon</Dropdown.Item>
          </Link>
          <Link to={`*`}>
            <Dropdown.Item>404 Not Found</Dropdown.Item>
          </Link>
        </Dropdown>
      </div>
    </div>
  );
}

export default Navbar;
