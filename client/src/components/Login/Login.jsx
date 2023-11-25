import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/style";
import Logo from "../../assets/images/svg/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import FacebookOauth from "../Oauth/FacebookOauth";
import GoogleOauth from "../Oauth/GoogleOauth";
import AppleOauth from "../Oauth/AppleOauth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        `${BASE_URL}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message || "Login success!");
          navigate("/");
        } else {
          toast.error(res.data.message || "Login failed. Please try again.");
        }
      })
      .catch((error) => {
        if (error.response) {
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
      });
  };
  return (
    <div className="min-h-screen bg-grsy-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 uppercase text-center text-3xl font-extrabold text-gray-900">
          Login
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
                  required
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
                  required
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
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
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
            <div className="  flex justify-center py-2 text-lg font-bold text-gray-700 ">
              -- OR --
            </div>
            <div className="flex justify-center space-x-6 pb-2 px-2 w-full">
              <FacebookOauth />
              <GoogleOauth />
              <AppleOauth />
              
              
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4 className="relative w-full h-[40] flex justify-center">
                Do not have any account?
                <Link to="/signup" className="text-blue-600 pl-2">
                  Register
                </Link>
              </h4>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
