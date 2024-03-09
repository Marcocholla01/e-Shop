import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "../../styles/style";
import axios from "axios";
import { BASE_URL } from "../../config";

const ChangePassword = () => {
  const { seller } = useSelector((state) => state.seller);

  const [email, setEmail] = useState(seller && seller.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible, setVisible] = useState(false);

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

  const changePasswordHandler = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error(`kindly fill all the fields`);
    }
    if (!passwordRegex.test(newPassword || confirmPassword)) {
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

    await axios
      .put(
        `${BASE_URL}/shop/update-seller-password`,
        { oldPassword, newPassword, confirmPassword, email },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res.data);
        if (res.data.success === true) {
          toast.success(res.data.message);

          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
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
    <div className="w-full px-5">
      <div className="w-full h-[100vh] p-5 pb-0 ">
        <div className="w-full bg-white h-full rounded flex flex-col items-center justify-center">
          <h1 className="block text-center bg-white text-[25px] font-[600] text-[#000000ba]">
            Change Password
          </h1>
          <div className="w-full px-5 flex">
            <form
              className="w-full px-5 flex flex-col justify-center items-center"
              onSubmit={changePasswordHandler}
              aria-required={true}
            >
              <div className="w-[100%] sm:w-[50%] mt-5">
                <label className="pb-2 hidden">email</label>
                <div className={`mt-1 relative`}>
                  <input
                    type={"email"}
                    name=""
                    id=""
                    disabled
                    className={`${styles.input} !w-[95%] mb-1 sm:mb-0 appearance-none cursor-pointer  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm hidden`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-[100%] sm:w-[50%] mt-10">
                <label className="block pb-2">old Password</label>
                <div className={`mt-1 relative`}>
                  <input
                    type={visible ? "text" : "password"}
                    name=""
                    id=""
                    className={`${styles.input} !w-[95%] mb-1 sm:mb-0 appearance-none cursor-pointer block  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-8 top-1 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-8 top-1 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div className="w-[100%] sm:w-[50%] mt-2">
                <label className="block pb-2">New Password</label>
                <div className={`mt-1 relative`}>
                  <input
                    type={visible1 ? "text" : "password"}
                    name=""
                    id=""
                    className={`${styles.input} !w-[95%] mb-1 sm:mb-0 appearance-none cursor-pointer block  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {visible1 ? (
                    <AiOutlineEye
                      className="absolute right-8 top-1 cursor-pointer"
                      size={25}
                      onClick={() => setVisible1(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-8 top-1 cursor-pointer"
                      size={25}
                      onClick={() => setVisible1(true)}
                    />
                  )}
                </div>
              </div>
              <div className="w-[100%] sm:w-[50%] mt-2">
                <label className="block pb-2">confirm Password</label>
                <div className={`mt-1 relative`}>
                  <input
                    type={visible2 ? "text" : "password"}
                    name=""
                    id=""
                    className={`${styles.input} !w-[95%] mb-1 sm:mb-0 appearance-none cursor-pointer block  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {visible2 ? (
                    <AiOutlineEye
                      className="absolute right-8 top-1 cursor-pointer"
                      size={25}
                      onClick={() => setVisible2(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-8 top-1 cursor-pointer"
                      size={25}
                      onClick={() => setVisible2(true)}
                    />
                  )}
                </div>
              </div>
              <button
                type="submit"
                className={`mt-7 group w-[250px] h-[40px]  py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 uppercase `}
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
