import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Logo from "../../../assets/images/svg/logo.svg";

import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../config";
import styles from "../../../../styles/style";
import FacebookOauth from "../../../Oauth/FacebookOauth";
import GoogleOauth from "../../../Oauth/GoogleOauth";
import AppleOauth from "../../../Oauth/AppleOauth";

function SellerRegister() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddres] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        if (response.data.success === true) {
          toast.success(response.data.message); // Display success toast
          navigate("/seller-login");
        } else {
          toast.error(response.data.message); // Display error toast
        }
        console.log(newForm);
        // Clear form fields
        setName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
      })
      .catch((error) => {
        console.log("Request failed:", error);
        toast.error("Request failed. Please try again."); // Display error toast for network issues or unexpected errors
      });
  };
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                      required
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
                Alraedy have an account?
                <Link to="/seller-login" className="text-blue-600 pl-2">
                  Login
                </Link>
              </h4>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellerRegister;
