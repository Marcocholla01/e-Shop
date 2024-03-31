import React, { useEffect, useState } from "react";
import styles from "../../styles/style";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import axios from "axios";
import { GetAllCouponCodes } from "../../redux/actions/couponCode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditCouponCode = () => {
  const [name, setName] = useState("");
  const [seasson, setSeasson] = useState("");
  const [minAmount, setMinAmout] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [value, setValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [imageLink, setImageLink] = useState("");
  const { seller } = useSelector((state) => state.seller);

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${BASE_URL}/couponCode/code/${id}`)
      .then((res) => {
        const couponCodeData = res.data.couponCode;
        setName(couponCodeData.name);
        setSeasson(couponCodeData.seasson);
        setMinAmout(couponCodeData.minAmount);
        setMaxAmount(couponCodeData.maxAmount);
        setValue(couponCodeData.value);
        setStartDate(new Date(couponCodeData.startDate));
        setEndDate(new Date(couponCodeData.endDate));
        setImageLink(couponCodeData.imageLink);
        dispatch(GetAllCouponCodes(seller._id));
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [dispatch, id, seller._id]);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value || null);
    const minEndDate = new Date(startDate.getTime() + 4 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value || null);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 4 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Please enter your coupon's code name!");
      return;
    }
    if (!value) {
      toast.error("Please enter your coupon's code discount percentage!");
      return;
    }
    if (isNaN(value) || value < 1 || value > 100) {
      toast.error("Percentage discount must be between 1 and 100");
      return;
    }
    if (!startDate && !endDate) {
      toast.error("Please select a date range");
      return;
    }
    if (!startDate) {
      toast.error("Please select a start date for your coupon code");
      return;
    }
    if (!endDate) {
      toast.error("Please select an end date for your coupon code");
      return;
    }
    if (!imageLink) {
      return toast.error("Please upload an Image Link");
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/couponCode/edit-couponCode/${id}`,
        {
          name,
          imageLink,
          seasson,
          value,
          minAmount,
          maxAmount,
          startDate,
          endDate,
        },
        { withCredentials: true }
      );
      toast.success(response.data.message || "Coupon Code Edited successfully");
      dispatch(GetAllCouponCodes(seller._id));
      navigate(`/dashboard-all-discount-codes`);
      // window.location.reload(true);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("No response received from the server");
      } else {
        toast.error("An unexpected error occurred");
      }

      console.error("Error in submitting form:", error);
    }
  };

  return (
    <div className="w-[70%] sm:w-[40%] bg-white shadow p-3 overflow-y-scroll h-[90vh] rounded-[3px] ">
      <h5 className="text-[30px] font-Poppins text-center">Edit Coupon code</h5>
      <form onSubmit={handleSubmit} aria-required={true}>
        <br />
        <div>
          <label className="pb-2">
            Coupon Code Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your coupon code name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Coupon Code Season <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={seasson}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setSeasson(e.target.value)}
            placeholder="Enter your coupon code season..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Discount Percentenge <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="value"
            value={value}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your coupon code value..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Min Amount</label>
          <input
            type="number"
            name="value"
            value={minAmount}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setMinAmout(e.target.value)}
            placeholder="Enter your coupon code min amount..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Max Amount</label>
          <input
            type="number"
            name="value"
            value={maxAmount}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setMaxAmount(e.target.value)}
            placeholder="Enter your coupon code max amount..."
          />
        </div>
        <br />
        <div className="block sm:flex items-center justify-between gap-3">
          <div>
            <label className="pb-2">
              Event Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="stock"
              id="start-date"
              value={startDate ? startDate.toISOString().slice(0, 10) : ""}
              className="appearance-none block cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleStartDateChange}
              min={today}
            />
          </div>
          <div className="sm:pt-2 pt-7">
            <label className="pb-2">
              Event End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="stock"
              id="end-date"
              placeholder="Enter your couponCode stock..."
              value={endDate ? endDate.toISOString().slice(0, 10) : ""}
              className="appearance-none cursor-pointer block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={handleEndDateChange}
              min={minEndDate}
            />
          </div>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Coupon Code Image Link <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={imageLink}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setImageLink(e.target.value)}
            placeholder="Enter your coupon code Link..."
          />
        </div>
        <br />
        <div>
          <button
            type="submit"
            className={`${styles.button} !w-full !-h[42px] !rounded-[5px]`}
          >
            <span className="text-white">Edit Coupon Code</span>
          </button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default EditCouponCode;
