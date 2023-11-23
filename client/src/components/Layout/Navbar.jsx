import React from "react";
import styles from "../../styles/style";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

function Navbar({ active }) {
  return (
    <div className={`${styles.normalFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div key={index} className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1 ? "text-[#17dd1f]" : "text-[#fff]"
              } font-[500] px-6 cursor-pointer`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
}

export default Navbar;
