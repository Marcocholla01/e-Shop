import React, { useState } from "react";
import {
  AiOutlineCamera,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/style";
import { BASE_URL, backend_url } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";
import { useParams } from "react-router-dom";

const AllSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(seller && seller.description);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [address, setAddress] = useState(seller && seller.address);
  const [zipCode, setZipCode] = useState(seller && seller.zipCode);
  const [avatar, setAvatar] = useState(null);
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];

    try {
      const base64Image = await fileToBase64(file);
      setAvatar(base64Image);

      const form = {
        avatar: base64Image,
      };

      const response = await axios.put(
        `${BASE_URL}/shop/update-avatar/${id}`,
        form,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
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
    }
  };
  const updateShopHandler = async (e) => {
    e.preventDefault();
    if (
      !description ||
      !password ||
      !phoneNumber ||
      !name ||
      !zipCode ||
      !address
    ) {
      return toast.error(`Please fill all the fields`);
    }

    await axios
      .put(
        `${BASE_URL}/shop/update-shop-info/${id}`,
        {
          description,
          password,
          phoneNumber,
          name,
          zipCode,
          address,
        },

        {
          withCredentials: true,
        }
        // console.log(description, password, phoneNumber, name, zipCode, address)
      )
      .then((response) => {
        toast.success(response.data.message);
        dispatch(loadSeller);
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //   console.log(description, password, phoneNumber, name, zipCode, address);

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full h-[100vh] p-5 pb-0 ">
        <div className="w-full bg-white h-full rounded flex flex-col items-center justify-center">
          <div className="flex w-full sm:w-[80%] flex-col justify-center my-5">
            <div className="w-full flex flex-col items-center justify-center">
              <div className="relative">
                <img
                  src={avatar ? avatar : `${seller.avatar.url}`}
                  className="w-[150px] h-[150px] object-cover rounded-full border-[3px] border-[#3ad132]"
                  alt=""
                />
                <div className="absolute flex items-center cursor-pointer rounded-full bg-[#e3e9ee] w-[30px] h-[30px] bottom-[10px] right-[10px]">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={handleImage}
                  />
                  <label htmlFor="image">
                    <AiOutlineCamera
                      size={20}
                      className="relative left-1 cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              <form
                aria-required={true}
                className="w-full px-5 flex flex-col justify-center items-center"
                onSubmit={updateShopHandler}
              >
                <div className="w-[100%] sm:w-[50%] mt-10">
                  <label className="block pb-2">Shop Name</label>
                  <div className={`mt-1 relative`}>
                    <input
                      type="name"
                      placeholder={`${seller.name}`}
                      name=""
                      id=""
                      className={`${styles.input} !w-[95%] mb-1 sm:mb-0 appearance-none cursor-pointer block  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-[100%] sm:w-[50%] mt-3">
                  <label className="block pb-2">Shop Description</label>
                  <div className={`mt-1 relative`}>
                    <textarea
                      type="name"
                      cols={10}
                      rows={5}
                      placeholder={`${
                        seller.description
                          ? seller.description
                          : `Enter your shop description`
                      }`}
                      name=""
                      id=""
                      className={`${styles.input} !w-[95%] mb-1 sm:mb-0 appearance-none cursor-pointer block  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-[100%] sm:w-[50%] mt-3">
                  <label className="block pb-2">Shop Address</label>
                  <div className={`mt-1 relative`}>
                    <input
                      type="name"
                      placeholder={`${seller.address}`}
                      name=""
                      id=""
                      className={`${styles.input} !w-[95%] mb-1 sm:mb-0 appearance-none cursor-pointer block  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-[100%] sm:w-[50%] mt-3">
                  <label className="block pb-2">Shop Phone Number</label>
                  <div className={`mt-1 relative`}>
                    <input
                      type="number"
                      placeholder={`${seller.phoneNumber}`}
                      name=""
                      id=""
                      className={`${styles.input} !w-[95%] mb-1 sm:mb-0 appearance-none cursor-pointer block  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-[100%] sm:w-[50%] mt-3">
                  <label className="block pb-2">Shop Zip Code</label>
                  <div className={`mt-1 relative`}>
                    <input
                      type="name"
                      placeholder={`${seller.zipCode}`}
                      name=""
                      id=""
                      className={`${styles.input} !w-[95%] mb-1 sm:mb-0 appearance-none cursor-pointer block  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-[100%] sm:w-[50%] mt-3 ">
                  <label className="block pb-2">Enter Your Password</label>
                  <div className={`mt-1 relative`}>
                    <input
                      type={visible ? "text" : "password"}
                      name=""
                      id=""
                      placeholder="Enter Your Password"
                      className={`${styles.input} !w-[95%] mb-1 sm:mb-0 appearance-none cursor-pointer block  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {visible ? (
                      <AiOutlineEye
                        className="absolute right-10 top-1 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(false)}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        className="absolute right-10 top-1 cursor-pointer"
                        size={25}
                        onClick={() => setVisible(true)}
                      />
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-7 group w-[250px] h-[40px]  py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 uppercase"
                >
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSettings;
