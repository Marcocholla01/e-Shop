import React, { useState, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import styles from "../../../styles/style";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const { user } = useSelector((state) => state.user);
  const [userId, setUserId] = useState(user && user._id);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    } else if (!value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    // Check if any  field is empty
    if (!userId) {
      toast.error("Please enter your secret key!");
      return;
    }
    if (userId.length < 24) {
      toast.error("Secret Key can not be less than 24 digits!");
      return;
    }
    if (!otpValue) {
      toast.error("Please enter the OTP CODES ");
      return;
    }
    if (otpValue.length < 4) {
      toast.error("Enter all the OTP digits");
      return;
    }

    axios
      .post(`${BASE_URL}/user/verify-user`, { userId, otp: otpValue })
      .then((response) => {
        if (
          (response.data.success === true &&
            response.data.message ===
              `Account already verified!, Kindly login`) ||
          (response.data.success === true &&
            response.data.message === `Account verified succesfully`)
        ) {
          navigate(`/login`);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
          console.log(response);
        }
        setUserId("");
        setOtp(["", "", "", ""]);
      })
      .catch((error) => {
        toast.error("Internal Server error");
      });
  };

  return (
    <div className="container justify-center border bg-slate-50">
      <div className="row justify-content-md-center">
        <div className="col-md-4 text-center">
          <div className="row">
            <div className="col-sm-12 mt-5 shadow">
              <div className="font-bold mt-[20px]  text-base">
                ACCOUNT VERIFICATION
              </div>
              Enter the <span className="font-semibold">OTP</span> and{" "}
              <span className="font-semibold">SECRET KEY</span> sent to your
              email account
              <form action="" className="mt-5 flex gap-3 items-center flex-col">
                <div className="w-[250px] sm:w-[50%] justify-center">
                  <label
                    htmlFor="email"
                    className="block text-md font-medium text-gray-700"
                  >
                    Secret Key <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className={`${styles.input} !w-[270px] mb-1 mt-1 sm:mb-0 px-3 py-2 mr-2 text-center  border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    required
                    value={userId}
                    placeholder="Input your Secret Key"
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
                <label
                  htmlFor="email"
                  className="block text-md font-medium text-gray-700"
                >
                  OTP CODE <span className="text-red-500">*</span>
                </label>
                <div className={`flex justify-center gap-3`}>
                  {otp.map((value, index) => (
                    <>
                      <input
                        key={index}
                        className="otp text-center appearance-none block w-[50px] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        type="number"
                        autoComplete={false}
                        required
                        placeholder={`${index + 1}`}
                        value={value}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        ref={inputRefs[index]}
                      />
                      <span></span>
                    </>
                  ))}
                </div>
              </form>
              <div className="mt-4 flex justify-center">
                <hr className="mt-4" />
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="m-7 group relative w-auto h-[40] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 self-center"
                >
                  VERIFY ACCOUNT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
