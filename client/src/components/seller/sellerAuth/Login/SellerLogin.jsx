import { React, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Logo from "../../../../assets/images/svg/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { BASE_URL } from "../../../../config";
import styles from "../../../../styles/style";
import FacebookOauth from "../../../Authentication/Oauth/FacebookOauth";
import GoogleOauth from "../../../Authentication/Oauth/GoogleOauth";
import AppleOauth from "../../../Authentication/Oauth/AppleOauth";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { loadSeller } from "../../../../redux/actions/user";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [passwordResset, setPasswordResset] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [sellerId, setSellerId] = useState("");
  // const [otp, setOtp] = useState(["", "", "", ""]);
  // const [open, setOpen] = useState(false);
  // const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
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

    // Check if email is empty or doesn't match the expected format
    if (!email) {
      return toast.error(`Please input your email`);
    } else if (!emailRegex.test(email)) {
      return toast.error(`Please input a valid email address`);
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
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/shop/login-shop`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message || "Login success!");
          navigate("/dashboard");
          dispatch(loadSeller());
          // window.location.reload(true);
        } else {
          toast.error(res.data.message || "Login failed. Please try again.");
        }

        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          // if (error.response.data.errorCode === 600) {
          //   setOpen(true);
          // }

          // The request was made and the server responded with a non-2xx status code
          if (error.response.status === 404) {
            toast.error(error.response.data.message);
          } else if (error.response.status === 401) {
            toast.error(error.response.data.message);
          } else if (error.response.status === 400) {
            toast.error(error.response.data.message);
          } else {
            toast.error(`Server error: ${error.response.data.message}`);
          }
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("Network error. Please check your internet connection.");
        } else {
          // Something happened in setting up the request that triggered an error
          toast.error("Request failed. Please try again later.");
        }

        setLoading(false);
      });
  };

  const handlePasswordResetRequest = () => {
    if (!passwordResset) {
      return toast.error(`Kindly input your email`);
    } else if (!emailRegex.test(passwordResset)) {
      return toast.error(`Invalid email address`);
    }
    setLoading(true);
    axios
      .post(
        `${BASE_URL}/shop/password/forgot-password`,
        { passwordResset },
        { withCredentials: false }
      )
      .then((res) => {
        toast.success(res.data.message);
        setForgotPassword(false);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoading(false);
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
        <h2 className="mt-6 uppercase text-center text-3xl font-extrabold text-gray-900">
          Login to your shop
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm::px-10">
          <form
            action=""
            className="space-y-6  flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="self-center">
              <img src={Logo} alt="Logo image" />
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
                  id="login-email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  id="login-password"
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
            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                  onClick={() => setForgotPassword(true)}
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                LOGIN
              </button>
            </div>
            {/* <div className="  flex justify-center  text-lg font-bold text-gray-700 ">
              -- OR --
            </div>
            <div className="flex justify-center space-x-6  w-full">
              <FacebookOauth />
              <GoogleOauth />
               <AppleOauth /> 
            </div> */}
            <div className={`${styles.normalFlex} w-full`}>
              <h4 className="relative w-full flex justify-center font-Poppins">
                Do not have an account? Register as
              </h4>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4 className="relative w-full h-[10] flex justify-center">
                <Link to="/register" className="text-white pr-4">
                  <div
                    className={`${styles.button} !h-[42px] !rounded-[5px] uppercase`}
                  >
                    Customer
                  </div>
                </Link>
                <Link to="/seller-register" className="text-white pl-4">
                  <div
                    className={`${styles.button} !h-[42px] !rounded-[5px] uppercase`}
                  >
                    seller
                  </div>
                </Link>
              </h4>
            </div>
          </form>
        </div>
      </div>
      {forgotPassword && (
        <>
          <div className="w-full fixed top-0 left-0 items-center flex bg-[#0000004e] h-screen z-[9999] justify-center">
            <div
              className={`sm:w-[40%] w-[75%] bg-gray-200 shadow rounded min-h-[30vh] p-3`}
            >
              <div className="w-full flex justify-end">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setForgotPassword(false)}
                />
              </div>
              <div className="w-full flex items-center justify-center flex-col">
                <h3 className="text-[22px] font-Poppins text-center  pb-5 font-[600]">
                  Forgot Password
                </h3>
                <h5 className="text-[16px] font-Poppins text-center  pb-2 ">
                  Enter your current accout email address to recieve a password
                  reset link
                </h5>
                <div className="flex items-center w-[80%] gap-3">
                  <input
                    type="email"
                    value={passwordResset}
                    onChange={(e) => setPasswordResset(e.target.value)}
                    placeholder="Enter your email address..."
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mt-7 h-[42px]"
                  />
                  <button
                    onClick={handlePasswordResetRequest}
                    className={`${
                      loading
                        ? `bg-slate-600 hover:bg-slate-700 cursor-not-allowed`
                        : `bg-blue-600 hover:bg-blue-700`
                    } mt-7 group w-[200px] h-[40px]  px-3 py-2 border border-transparent text-md font-medium rounded-md text-white uppercase `}
                  >
                    {loading ? `Loading....` : `submit`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/*}  {open && (
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
                    value={sellerId}
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

export default Login;
