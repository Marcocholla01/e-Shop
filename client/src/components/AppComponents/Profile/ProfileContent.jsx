import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { MdTrackChanges } from "react-icons/md";
import Visa from "../../../assets/images/svg/Payment-Methods/Visa.svg";
import styles from "../../../styles/style";
import {
  deleteUserAddress,
  updateUserAddress,
  updateUserInfomation,
} from "../../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL, SOCKETSERVER, backend_url } from "../../../config";
import { Country, State } from "country-state-city";
import EmptyAdderess from "../../../assets/images/Address-bro.png";
import { getAllOrdersOfUser } from "../../../redux/actions/order";
import UserInbox from "../userInbox/UserInbox";
import { SlPrinter } from "react-icons/sl";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // use redux instead of api call
    dispatch(updateUserInfomation(email, password, phoneNumber, name));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append(`image`, e.target.files[0]);

    axios
      .put(`${BASE_URL}/user/update-avatar`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success === true) {
          toast.success(response.data.message);
          window.location.reload(true);
        } else {
          toast.error(res.data.message);
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
    <div className="w-full">
      {/* Profile Page  */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}/uploads/${user.avatar.filename}`}
                alt=""
                className="w-[150px] h-[150px] object-cover rounded-full border-[3px] border-[#3ad132]"
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
          </div>
          <br />
          <br />
          <div className="w-full px-5 flex">
            <form
              className="w-full px-5"
              onSubmit={handleSubmit}
              aria-required={true}
            >
              <div className="flex flex-col justify-center items-center">
                <div className="w-full sm:flex block pb-3">
                  <div className="w-[100%] sm:w-[50%]">
                    <label className="block pb-2">Full Names</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className={`${styles.input} !w-[95%] mb-4 sm:mb-0`}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="w-[100%] sm:w-[50%]">
                    <label className="block pb-2">Email Address</label>
                    <input
                      type="email"
                      name=""
                      id=""
                      className={`${styles.input} !w-[95%] mb-1 sm:mb-0`}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full flex pb-3">
                  <div className="w-full sm:flex block pb-3">
                    <div className="w-[100%] sm:w-[50%]">
                      <label className="block pb-2">Phone Number</label>
                      <input
                        type="number"
                        name=""
                        id=""
                        className={`${styles.input} !w-[95%] mb-4 sm:mb-0`}
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div className="w-[100%] sm:w-[50%] ">
                      <label className="block pb-2">Enter Your Password</label>
                      <div className={`mt-1 relative`}>
                        <input
                          type={visible ? "text" : "password"}
                          name=""
                          id=""
                          className={`${styles.input} !w-[95%] mb-1 sm:mb-0`}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                  </div>
                </div>
                {/* <div className="w-full flex pb-3">
                <div className="w-full sm:flex block pb-3">
                  <div className="w-[100%] sm:w-[50%]">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      name=""
                      id=""
                      className={`${styles.input} !w-[95%] mb-4 sm:mb-0`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-[100%] sm:w-[50%]">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      name=""
                      id=""
                      className={`${styles.input} !w-[95%] mb-4 sm:mb-0`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                </div>
              </div> */}
                <button
                  type="submit"
                  className="mt-7 group relative w-[250px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 uppercase"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Order*/}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}
      {/* Refund Order  */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}
      {/* Order  */}
      {active === 4 && (
        <div>
          <UserInbox />
        </div>
      )}
      {/* Track Order  */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {/* Payment methods */}
      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}

      {/* change password */}
      {active === 7 && (
        <div>
          <ChangePassword />
        </div>
      )}
      {/* Address */}
      {active === 8 && (
        <div>
          <MyAddress />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  // console.log(orders);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        const status = params.getValue(params.id, "status"); // Get the status value from the cell

        // Apply Tailwind CSS classes directly based on the status
        if (status === "Delivered" || "delivered") {
          return "text-green-500";
        } else if (status === "Processing" || "processing") {
          return "text-blue-500";
        } else {
          return "text-red-500";
        }
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "  ",
      flex: 0.5,
      minWidth: 10,
      headerName: "View Invoice",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/invoice/${params.id}`}>
              <Button>
                <SlPrinter size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },

    {
      field: "viewmore",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "KSHS " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === `Processing refund`);

  // console.log(orders);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        const status = params.getValue(params.id, "status"); // Get the status value from the cell

        // Apply Tailwind CSS classes directly based on the status
        if (status === "Delivered" || "delivered") {
          return "text-green-500";
        } else if (status === "Processing" || "processing") {
          return "text-blue-500";
        } else {
          return "text-red-500";
        }
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "KSHS " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  // console.log(orders);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        const status = params.getValue(params.id, "status"); // Get the status value from the cell

        // Apply Tailwind CSS classes directly based on the status
        if (status === "Delivered" || "delivered") {
          return "text-green-500";
        } else if (status === "Processing" || "processing") {
          return "text-blue-500";
        } else {
          return "text-red-500";
        }
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track-order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "KSHS " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba]">
          Payment Methods
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-[#fff] h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img src={Visa} alt="Visa Method" className="h-full w-10" />
          <h5 className="pl-5 font-[600]">Marcocholla Paul</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1234 **** **** ****</h6>
          <h5 className="pl-6">08/2023</h5>
        </div>
        <div className="min-w-[10%] flex justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
const ChangePassword = () => {
  const { user } = useSelector((state) => state.user);

  const [email, setEmail] = useState(user && user.email);
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
        `${BASE_URL}/user/update-user-password`,
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
      <h1 className="block text-center text-[25px] font-[600] text-[#000000ba]">
        Change Password
      </h1>
      <div className="w-full px-5 flex">
        <form
          className="w-full px-5 flex flex-col justify-center items-center"
          onSubmit={changePasswordHandler}
          aria-required={true}
        >
          <div className="w-[100%] sm:w-[50%] mt-5">
            <label className="pb-2 hidden">old Password</label>
            <div className={`mt-1 relative`}>
              <input
                type={"email"}
                name=""
                id=""
                disabled
                className={`${styles.input} !w-[95%] mb-1 sm:mb-0 hidden`}
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
                className={`${styles.input} !w-[95%] mb-1 sm:mb-0`}
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
                className={`${styles.input} !w-[95%] mb-1 sm:mb-0`}
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
                className={`${styles.input} !w-[95%] mb-1 sm:mb-0`}
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
            className="mt-7 group w-[250px] h-[40px]  py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 uppercase"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};
const MyAddress = () => {
  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [addressType, setAddressType] = useState("");
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: `Default`,
    },
    {
      name: `Home`,
    },
    {
      name: `Office`,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      addressType === `` ||
      country === `` ||
      city === `` ||
      address1 === ``
    ) {
      toast.error(`Please fill all fields marked with *`);
    } else {
      dispatch(
        updateUserAddress(
          country,
          city,
          zipCode,
          address1,
          address2,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setZipCode(null);
      setAddress1("");
      setAddress2("");
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    dispatch(deleteUserAddress(item._id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div
          className={`fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center`}
        >
          <div
            className={`w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll`}
          >
            <div className="w-full flex p-3 justify-end">
              <RxCross1
                size={30}
                className="cursor-pointer mt-2 mr-2"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center font-Poppins text-[25px]">
              {" "}
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit}>
                <div className="w-full-block p-4">
                  <div className="w-full pb-2">
                    <label htmlFor="country" className="block pb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px] cursor-pointer"
                    >
                      <option value="" className="block border pb-2">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}{" "}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label htmlFor="city" className="block pb-2">
                      City or County <span className="text-red-500">*</span>
                    </label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px] cursor-pointer"
                    >
                      <option value="" className="block border pb-2">
                        choose your city or County
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}{" "}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label htmlFor="city" className="block pb-2">
                      Address 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="address"
                      name="name"
                      id="name"
                      placeholder="Enter your address 1..."
                      value={address1}
                      // className="appearance-none block w-[95%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"

                      className={`${styles.input} w-[95%]`}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label htmlFor="city" className="block pb-2">
                      Address 2
                    </label>
                    <input
                      type="address"
                      name="name"
                      id="name"
                      placeholder="Enter your address 2..."
                      value={address2}
                      // className="appearance-none block w-[95%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"

                      className={`${styles.input} w-[95%]`}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label htmlFor="city" className="block pb-2">
                      Zip Code
                    </label>
                    <input
                      type="number"
                      name="name"
                      id="name"
                      placeholder="Enter your zip code..."
                      value={zipCode}
                      // className="appearance-none block w-[95%] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"

                      className={`${styles.input} w-[95%]`}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label htmlFor="city" className="block pb-2">
                      Address Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px] cursor-pointer"
                    >
                      <option value="" className="block border pb-2">
                        choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}{" "}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <button
                      type="submit"
                      className="mt-7 group relative w-[95%] h-[40px] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 uppercase"
                    >
                      submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba]">My Address</h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-[#fff] h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6>
                {item.address1} {item.address2}{" "}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6>{user && user.phoneNumber} </h6>
            </div>
            <div className="min-w-[10%] flex justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}
      {user && user.addresses.length === 0 && (
        <div className="text-center items-center  justify-center flex flex-col">
          <img
            src={EmptyAdderess}
            alt=""
            className="w-[20%] h-min p-2 mb-2 object-cover"
          />
          <h5 className="font-semibold">You do not have any saved address</h5>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
