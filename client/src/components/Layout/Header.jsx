import React, { useState } from "react";
import styles from "../../styles/style";
import { Link, useParams } from "react-router-dom";
import Logo from "../../assets/images/svg/logo.svg";
import { categoriesData, productData } from "../../static/data.jsx";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend_url } from "../../config.js";
import Cart from "../AppComponents/cart/Cart.jsx";
import WishList from "../wishlist/WishList.jsx";

const Header = ({ activeHeading }) => {
  const { allProducts } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);
  const { id } = useParams();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller, seller } = useSelector((state) => state.seller);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishList] = useState(false);
  const [open, setOpen] = useState(false);
  // const userCreatedAt = new Date(user.createdAt.slice);
  // const currentDate = new Date();

  // const daysSinceJoined = Math.floor(
  //   (currentDate - userCreatedAt) / (1000 * 60 * 60 * 24)
  // );

  // console.log(user);
  // console.log(allProducts);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setSearchData(null);

    const filteredProducts =
      allProducts &&
      allProducts.filter((products) =>
        products.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden sm:h-[50px] sm:my-[20px] sm:flex items-center justify-between">
          <div>
            <Link to="/">
              <img src={Logo} alt="Logo image" />
            </Link>
          </div>
          {/* Serach box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              name=""
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
              onClick={handleSearchChange}
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i._id;
                    return (
                      <Link to={`/product/${d}`}>
                        <div className="w-full flex items-start-py-5 gap-3 mt-4">
                          <img
                            src={i.images[0].url}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px] rounded-md"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          {user && user.role === "Admin" && (
            <div className={`${styles.button} w-[200px]`}>
              <Link to={`/admin-dashboard`}>
                <h1 className="text-[#fff] flex items-center">
                  Admin Dashboard
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
          )}
          <div className={`${styles.button}`}>
            {isSeller ? (
              <Link to={`/dashboard`}>
                <h1 className="text-[#fff] flex items-center">
                  Go Dashboard
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            ) : (
              <Link to="/seller-register">
                <h1 className="text-[#fff] flex items-center">
                  Become Seller
                  <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            )}
          </div>

          {/* <div className={`${styles.button}`}>
            <Link to="/seller-register">
              <h1 className="text-[#fff] flex items-center">
                Become Seller
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div> */}
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-[10]" : null
        } transition hidden sm:flex items-center justify-between w-full bg-blue-800 h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/* Categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[260px] hidden sm:block">
              <BiMenuAltLeft
                size={30}
                className="absolute top-3 left-2 cursor-pointer"
              />
              <button className="h-[100%] w-[full] flex justify-between items-center pl-20 pr-20 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* Nav items */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishList(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 /83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishList && wishList.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255  255 255 /83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to={`/user/${user._id}`}>
                    <img
                      src={`${backend_url}/uploads/${user.avatar.filename}`}
                      alt=""
                      className="w-[40px] h-[40px] object-cover rounded-full"
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 /83%)" />
                  </Link>
                )}
              </div>
            </div>
            {/* Cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishList popup */}
            {openWishlist ? (
              <WishList setOpenWishList={setOpenWishList} />
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile Screen Header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }"w-full  h-[90px] bg-[#fff] z-40 top-0 left-0 w-full shadow-sm sm:hidden "`}
      >
        <div className="w-full pt-4 flex justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src={Logo}
                alt="Logo image"
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div className="relative mr-[20px]">
              <AiOutlineShoppingCart
                size={35}
                className="mt-3 cursor-pointer"
                onClick={() => setOpenCart(true)}
              />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Cart popup */}
      {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

      {/* wishList popup */}
      {openWishlist ? <WishList setOpenWishList={setOpenWishList} /> : null}
      {/* Header sideBar  */}

      {open && (
        <div
          className={`fixed w-full bg-[#0000005f] z-40 h-full top-0 left-0 sm:hidden`}
        >
          <div className="fixed overflow-y-scroll h-screen left-0 z-10 w-[60%] bg-[#fff] sm:hidden">
            <div className="w-full justify-between flex pr-3">
              <div>
                <div className="relative mr-[15px]">
                  <AiOutlineHeart
                    size={30}
                    className="mt-5 ml-3 cursor-pointer"
                    onClick={() => setOpenWishList(true)}
                  />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {wishList && wishList.length}
                  </span>
                </div>
              </div>
              <RxCross1
                size={25}
                className="cursor-pointer ml-4 mt-5"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="my-8 m-auto w-[92%] h-[40%] relative">
              <input
                type="text"
                name=""
                placeholder="Search Product..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
              />
              {searchData && (
                <div className="absolute bg-[#fff] z-10 shadow w-full  left-0 p-3">
                  {searchData.map((i) => {
                    const d = i.name;
                    const Product_name = d.replace(/\$+/g, "-");
                    return (
                      <Link to={`/product/${Product_name}`}>
                        <div className="flex items-center">
                          <img
                            src={i.image_Url[0].url}
                            alt=""
                            className="w-[50px] mr-2"
                          />
                          <h5>{i.name}</h5>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
              <Navbar active={activeHeading} />
              {user && user.role === "Admin" && (
                <div
                  className={`${styles.button} ml-4 w-[200px] !rounded-[4px]`}
                >
                  <Link to={`/admin-dashboard`}>
                    <h1 className="text-[#fff] flex items-center">
                      Admin Dashboard
                      <IoIosArrowForward className="ml-1" />
                    </h1>
                  </Link>
                </div>
              )}

              <div className={`${styles.button} ml-4 w-[200px] !rounded-[4px]`}>
                {isSeller ? (
                  <Link to={`/dashboard`}>
                    <h1 className="text-[#fff] flex items-center">
                      Go Dashboard
                      <IoIosArrowForward className="ml-1" />
                    </h1>
                  </Link>
                ) : (
                  <Link to="/seller-register">
                    <h1 className="text-[#fff] flex items-center">
                      Become Seller
                      <IoIosArrowForward className="ml-1" />
                    </h1>
                  </Link>
                )}
              </div>
              <br />
              <div className="flex w-full justify-center">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to={`/login`}
                      className="text-[18px] pr-[10px] font-bold text-[#000000b7] "
                    >
                      Login/
                    </Link>
                    <Link
                      to={`/signup`}
                      className="text-[18px] pr-[10px] font-bold text-[#000000b7] "
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center justify-between flex-col">
                    <h3 className="pb-3 font-[700] ">ACOUNT DETAILS</h3>
                    <div className="pb-2">
                      <Link to={`/user/${user._id}`}>
                        <img
                          src={`${backend_url}/uploads/${user.avatar.filename}`}
                          alt=""
                          className="h-[80px] w-[80px] object-cover rounded-full border-[3px] border-[#3ad132]"
                        />
                      </Link>
                    </div>
                    {/* TODO ADD Toggle for hidding or showing accoun info */}
                    <div className="pb-5">
                      <h4 className="font-[600]  pb-2">Account Name:</h4>
                      <h5>{user.name}</h5>
                      <h4 className="font-[600]  pb-2">Account Email:</h4>
                      <h5>{user.email}</h5>
                      <h4 className="font-[600]  pb-2">Account Type:</h4>
                      <h5>{user.role}</h5>
                      <h4 className="font-[600]  pb-2">Joined On:</h4>
                      <h5>{user.createdAt.slice(0, 10)} </h5>
                      <h4 className="font-[600]  pb-2">Time Joined:</h4>
                      <h5>{user.createdAt.slice(11, 19)}</h5>
                      <h4 className="font-[600]  pb-2">Last Account Update:</h4>
                      <h5>{user.updatedAt.slice(0, 10)}</h5>
                      <h4 className="font-[600]  pb-2"> Updated At:</h4>
                      <h5>{user.updatedAt.slice(11, 19)} </h5>
                      {/* <h4 className="font-[600]  pb-2">
                        Number of Days since joined:
                      </h4>
                      <h5>{daysSinceJoined} Days</h5> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
