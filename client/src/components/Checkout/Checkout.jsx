import React, { useEffect, useState } from "react";
import styles from "../../styles/style";
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import EmptyAdderess from "../../assets/images/Address-bro.png";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import axios from "axios";
import { setLatestOrder } from "../../redux/actions/order";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState(false);
  const [city, setCity] = useState(``);
  const [country, setCountry] = useState(``);
  const [address1, setAddress1] = useState(``);
  const [address2, setAddress2] = useState(``);
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState(``);
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);

  // console.log(cart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if (!address1 || !address2 || zipCode === null || !city || !country) {
      toast.error(`Please choose your delivery address`);
    } else {
       const shippingAddress = { address1, address2, zipCode, city, country };
      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        shippingAddress,
        discountPrice,
        user,
      };

      // Dispatch the action to update the Redux state
      dispatch(setLatestOrder(orderData));
      navigate(`/payment`);
    }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  // shipping cost variable
  const shipping = subTotalPrice * 0.15;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!couponCode) {
      toast.error(`Enter a coupon code`);
    }

    const name = couponCode;

    await axios
      .get(`${BASE_URL}/couponCode/get-coupon-value/${name}`)
      .then((res) => {
        const shopId = res.data.couponCode?.shopId;
        const couponCodeValue = res.data.couponCode?.value;

        if (res.data.couponCode !== null) {
          const isCouponCodeValid =
            cart && cart.filter((item) => item.shopId === shopId);

          if (isCouponCodeValid.length === 0) {
            toast.error(`coupon code not valid for this product's shop`);
            setCouponCode(``);
          } else {
            const eligiblePrice = isCouponCodeValid.reduce(
              (acc, item) => acc + item.qty * item.discountPrice,
              0
            );

            const discountPrice = (eligiblePrice * couponCodeValue) / 100;
            setDiscountPrice(discountPrice);
            setCouponCodeData(res.data.couponCode);
            setCouponCode(``);
          }
        }
        if (res.data.couponCode === null) {
          toast.error(`Coupon code invalid`);
          setCouponCode(``);
        }
      });
  };

  const discountPercentage = couponCodeData ? discountPrice : ``;

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentage).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  // console.log(discountPercentage)
  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[80%] md:w-[70%] block sm:flex gap-10">
        <div className="w-full sm:w-[70%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full sm:w-[35%] sm:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentage={discountPercentage}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] sm:w-[280px] mt-10 items-center`}
        onClick={paymentSubmit}
      >
        <h1 className="text-[#fff]">Go to Payment</h1>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              value={user && user.name}
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              value={user && user.email}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              required
              value={user && user.phoneNumber}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your City
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Address1</label>
            <input
              type="address"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Address2</label>
            <input
              type="address"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div></div>
      </form>

      {user && user.addresses.length === 0 ? (
        <>
          <div className="text-center items-center  justify-center flex flex-col">
            <img
              src={EmptyAdderess}
              alt=""
              className="w-[20%] h-min p-2 mb-2 object-cover"
            />
            <h5 className="font-semibold">You do not have any saved address</h5>
          </div>
        </>
      ) : (
        <>
          <h5
            className="text-[18px] cursor-pointer inline-block"
            onClick={() => setUserInfo(!userInfo)}
          >
            Choose From saved address
          </h5>
          {userInfo && (
            <div>
              {user &&
                user.addresses.map((item, index) => (
                  <div className="w-full flex mt-1">
                    <input
                      type="checkbox"
                      // id={item.addressType}
                      className="mr-3"
                      value={item.addressType}
                      onClick={() =>
                        setAddress1(item.address1) ||
                        setAddress2(item.address2) ||
                        setZipCode(item.zipCode) ||
                        setCountry(item.country) ||
                        setCity(item.city)
                      }
                    />
                    <h2>{item.addressType}</h2>
                  </div>
                ))}
            </div>
          )}{" "}
        </>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentage,
}) => {
  // console.log(subTotalPrice);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">
          Kshs: {subTotalPrice.toFixed(2)}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">Kshs: {shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          -{" "}
          {discountPercentage ? `kshs: ` + discountPercentage.toString() : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        Kshs: {totalPrice}{" "}
      </h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;
