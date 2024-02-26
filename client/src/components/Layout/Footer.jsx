import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footerProductLinks,
  footerSupportLinks,
  footercompanyLinks,
} from "../../static/data";
import payments from "../../assets/images/footer-payment.webp";
import Footerlogo from "../../assets/images/svg/logo.svg";

const Footer = () => {
  return (
    <div className="bg-[#000] text-white mt-12">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-blue-800 py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#56d789]">Subscribe</span>
          <span> to get news,</span> <br />
          events and best offers!
        </h1>
        <div className="flex">
          <input
            type="email"
            name=""
            id=""
            required
            placeholder="Enter your email..."
            className="text-gray-800 sm:w-72 w-full px-2 sm:mr-5 mr-3 lg:mb-0 py-2.5 rounded focus:outline-none"
          />
          <button className="bg-[#56d879] hover:bg-teal-500 duration-500 py-2.5 px-5 rounded-md text-white md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <Link to={`/`}>
            <img
              src={Footerlogo}
              alt="Logo image"
              style={{ filter: "brightness(0) invert(1)", cursor: "pointer" }}
            />
          </Link>

          <br />
          <p>The home and elements needed to create beautiful products.</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook
              size={30}
              className="cursor-pointer hover:text-teal-400"
            />
            <AiOutlineTwitter
              size={30}
              className="cursor-pointer hover:text-teal-400"
              style={{ marginLeft: "15px" }}
            />
            <AiFillInstagram
              size={30}
              className="cursor-pointer hover:text-teal-400"
              style={{ marginLeft: "15px" }}
            />
            <AiFillYoutube
              size={30}
              className="cursor-pointer hover:text-teal-400"
              style={{ marginLeft: "15px" }}
            />
          </div>
        </ul>
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          {footerProductLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Shop</h1>
          {footercompanyLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
        <span>© 2024 ShopO. All rights reserved</span>
        <span>Terms . Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img src={payments} alt="payment methods" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
