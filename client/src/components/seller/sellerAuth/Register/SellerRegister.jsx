import { React, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Logo from "../../../../assets/images/svg/logo.svg";

import { Link, useNavigate } from "react-router-dom";
import { RxAvatar, RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../config";
import FacebookOauth from "../../../Authentication/Oauth/FacebookOauth";
import GoogleOauth from "../../../Authentication/Oauth/GoogleOauth";
import AppleOauth from "../../../Authentication/Oauth/AppleOauth";
import styles from "../../../../styles/style";
import { useSelector } from "react-redux";

function SellerRegister() {
  const { seller } = useSelector((state) => state.seller);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddres] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  // const [sellerId, setSellerId] = useState(seller && seller._id);
  // const [otp, setOtp] = useState(["", "", "", ""]);
  // const [open, setOpen] = useState(false);
  // const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?!.*(.)\1{7})(?!.*12345678)(?=.*\d).{8,24}$/;
  // Create an array of items for the list
  const items = [
    "Should have atleast 8 -24 characters",
    "Should have atleast 1 special letter @!>",
    "Should have atleast 1 uppercase letter",
    "Should have atleast 1 lowercase letter",
  ];
  // Generate the list markup
  const CustomToast = ({ items }) => (
    <div className=" p-4 rounded shadow-md w-[100%]">
      <ol className="list-disc pl-4">
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            {item}
          </li>
        ))}
      </ol>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.error(`Please input your shop's name`);
    }
    if (name.length < 4) {
      return toast.error(`shop's name should be atleast 4 characters long`);
    }
    if (!phoneNumber) {
      return toast.error(`Please enter your phones number`);
    }

    // Check if email is empty or doesn't match the expected format
    if (!email) {
      return toast.error(`Please input your email`);
    } else if (!emailRegex.test(email)) {
      return toast.error(`Please input a valid email address`);
    }
    if (!address) {
      return toast.error(`Please enter shop's address`);
    }
    if (!zipCode) {
      return toast.error(`Please enter shop's ZipCode`);
    }

    if (!password) {
      return toast.error(`Please input your password`);
    }
    if (!passwordRegex.test(password)) {
      setTimeout(() => {
        // Render the custom toast component inside the toast
        return toast.info(<CustomToast items={items} />, {
          autoClose: 6000, // Keep the toast open indefinitely or set autoClose to a duration in milliseconds
          closeOnClick: true, // Close the toast when clicked
          closeButton: true, // Show a close button
          draggable: true, // Allow the toast to be draggable
        });
      }, 1000);
      // Password does not meet the requirements
      return toast.error("Password does not meet the requirements");
    }
    if (!avatar) {
      return toast.error(`Please select an image`);
    }

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("phoneNumber", phoneNumber);
    newForm.append("email", email);
    newForm.append("address", address);
    newForm.append("zipCode", zipCode);
    newForm.append("password", password);
    axios
      .post(`${BASE_URL}/shop/create-shop`, newForm, config)
      .then((response) => {
        toast.success(response.data.message); // Display success toast
        setName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
        setOpen(true);
        // navigate("/seller-login");
      })
      .catch((error) => {
        toast.error(error.response.data.message); // Display error toast for network issues or unexpected errors
      });
  };

  // const handleOtpChange = (index, value) => {
  //   const newOtp = [...otp];
  //   newOtp[index] = value;
  //   setOtp(newOtp);

  //   if (value && index < inputRefs.length - 1) {
  //     inputRefs[index + 1].current.focus();
  //   } else if (!value && index > 0) {
  //     inputRefs[index - 1].current.focus();
  //   }
  // };

  // const handleAccountVerification = async (e) => {
  //   e.preventDefault();
  //   const otpValue = otp.join("");
  //   // Check if any  field is empty
  //   if (!sellerId) {
  //     toast.error("Please enter your secret key!");
  //     return;
  //   }
  //   if (sellerId.length < 24) {
  //     toast.error("Secret Key can not be less than 24 digits!");
  //     return;
  //   }
  //   if (!otpValue) {
  //     toast.error("Please enter the OTP CODES ");
  //     return;
  //   }
  //   if (otpValue.length < 4) {
  //     toast.error("Enter all the OTP digits");
  //     return;
  //   }

  //   axios
  //     .post(`${BASE_URL}/shop/verify-seller`, { sellerId, otp: otpValue })
  //     .then((response) => {
  //       if (
  //         (response.data.success === true &&
  //           response.data.message ===
  //             `Account already verified!, Kindly login`) ||
  //         (response.data.success === true &&
  //           response.data.message === `Account verified succesfully`)
  //       ) {
  //         navigate(`/login`);
  //         toast.success(response.data.message);
  //       } else {
  //         toast.error(response.data.message);
  //         console.log(response);
  //       }
  //       setUserId("");
  //       setOtp(["", "", "", ""]);
  //     })
  //     .catch((error) => {
  //       toast.error(error.response.data.message);
  //     });
  // };

  return (
    <div className="min-h-screen bg-grsy-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl uppercase font-extrabold text-gray-900">
          Register a seller's account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm::px-10">
          <form
            action=""
            className="space-y-6 flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="self-center">
              <img src={Logo} alt="Logo image" />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Shop Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="text"
                  id="signup-name"
                  autoComplete="name"
                  placeholder="Enter your shop name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  autoComplete="number"
                  placeholder="Enter your shop phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="signup-email"
                  autoComplete="email"
                  placeholder="Enter your shop email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="address"
                  id="address"
                  autoComplete="address"
                  placeholder="Enter your shop address"
                  value={address}
                  onChange={(e) => setAddres(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="zipCode"
                className="block text-sm font-medium text-gray-700"
              >
                Zip code
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="zipCode"
                  id="zipCode"
                  autoComplete="number"
                  placeholder="Enter your shop Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  id="signup-password"
                  autoComplete="current-password"
                  placeholder="Enter you password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              >
                <div className="mt-2 flex items-center">
                  <span className="inline-block h-8 v-8 rounded-full overflow-hidden">
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="avatar"
                        className="h-8 w-8 object-cover rounded-full"
                      />
                    ) : (
                      <RxAvatar className="h-8 w-8" />
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="ml-5 flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <span className="cursor-pointer">Upload an image</span>
                    <input
                      type="file"
                      name="avatar"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileInputChange}
                      className="sr-only "
                    />
                  </label>
                </div>
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                REGISTER
              </button>
            </div>
            <div className="  flex justify-center text-lg font-bold text-gray-700 ">
              -- OR --
            </div>
            <div className="flex justify-center space-x-6 w-full">
              <FacebookOauth />
              <GoogleOauth />
              {/* <AppleOauth /> */}
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4 className="relative font-Poppins w-full flex justify-center">
                Already have an account? Login as
              </h4>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4 className="relative w-full h-[10] flex justify-center">
                <Link to="/login" className="text-white pr-4">
                  <div
                    className={`${styles.button} !h-[42px] !rounded-[5px] uppercase`}
                  >
                    Customer
                  </div>
                </Link>
                <Link to="/seller-login" className="text-white pl-4">
                  <div
                    className={`${styles.button}  !h-[42px] !rounded-[5px] uppercase`}
                  >
                    seller
                  </div>
                </Link>
              </h4>
            </div>
          </form>
        </div>
      </div>

      {/* {open && (
        <>
          <div className="w-full fixed top-0 left-0 items-center flex bg-[#0000004e] h-screen z-[9999] justify-center">
            <div
              className={`sm:w-[40%] w-[75%] bg-gray-200 shadow rounded min-h-[30vh] p-3`}
            >
              {/* <div className="w-full flex justify-end">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div> 
              <div className="w-full flex items-center justify-center flex-col">
                <h3 className="text-[22px] font-Poppins text-center  pb-5 font-[600]">
                  ACCOUNT VERIFICATION
                </h3>
                <p className="text-center">
                  Enter the <span className="font-semibold">OTP</span> and{" "}
                  <span className="font-semibold">SECRET KEY</span> sent to your
                  email account
                </p>
                <form
                  action=""
                  className="mt-5 flex gap-3 items-center flex-col"
                >
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
                    value={seller && seller._id}
                    placeholder="Input your Secret Key"
                    onChange={(e) => setSellerId(e.target.value)}
                  />
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
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
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
                    onClick={handleAccountVerification}
                    type="button"
                    className="m-7 group relative w-auto h-[40] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 self-center"
                  >
                    VERIFY ACCOUNT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )} */}
    </div>
  );
}

export default SellerRegister;
