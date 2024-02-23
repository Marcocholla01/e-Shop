import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/style";
import Loader from "../Layout/Loader";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";

const AllDiscountCodes = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupouns, setCoupouns] = useState([]);
  const [minAmount, setMinAmout] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [value, setValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { seller } = useSelector((state) => state.seller);
  const { product } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  // console.log(product && seller);
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

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/couponCode/all-couponCodes-shop/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupouns(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch, seller._id]);

  const handleDelete = async (id) => {
    axios
      .delete(`${BASE_URL}/couponCode/delete-shop-couponCode/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Coupon code deleted succesfully!");
      });
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Please enter your coupons's code name!");
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

    try {
      const response = await axios.post(
        `${BASE_URL}/couponCode/create-coupon-code`,
        {
          name,
          value,
          minAmount,
          maxAmount,
          selectedProduct: selectedProducts,
          start_date: startDate,
          finish_date: endDate,
          shop: seller,
          shopId: seller._id,
        },
        { withCredentials: true }
      );
      toast.success(
        "Coupon Code created successfully" || response.data.message
      );
      window.location.reload(true);
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

  const columns = [
    { field: "id", headerName: "Id", minWidth: 70, flex: 0.4 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "price",
      headerName: "Discount",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 70,
      flex: 0.5,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },

    {
      field: "end_date",
      headerName: "End Date",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.4,
      minWidth: 30,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        const couponCode_name = d.replace(/\$+/g, "-");
        return (
          <>
            <Link to={`/couponCode/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.4,
      minWidth: 30,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupouns &&
    coupouns.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        status: item.status,
        start_date: item?.start_date ? item.start_date.slice(0, 10) : null,
        end_date: item?.finish_date ? item.finish_date.slice(0, 10) : null,
        sold: 10,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20] flex items-center justify-center">
              <div className="w-[70%] sm:w-[40%] bg-white shadow p-3 overflow-y-scroll h-[70vh] rounded-[3px] ">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Create Coupon code
                </h5>
                {/* create coupoun code */}
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
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your coupon code name..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Discount Percentenge{" "}
                      <span className="text-red-500">*</span>
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
                  {/* <div>
                    <label className="pb-2">Selected Product</label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="Choose your selected products">
                        Choose a product for the coupon code
                      </option>
                      {product &&
                        product.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div> */}
                  {/* <br />
                  <br /> */}
                  <div className="block sm:flex items-center justify-between gap-3">
                    <div>
                      <label className="pb-2">
                        Event Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="stock"
                        id="start-date"
                        value={
                          startDate ? startDate.toISOString().slice(0, 10) : ""
                        }
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
                        placeholder="Enter your event stock..."
                        value={
                          endDate ? endDate.toISOString().slice(0, 10) : ""
                        }
                        className="appearance-none cursor-pointer block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={handleEndDateChange}
                        min={minEndDate}
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <div>
                    <button
                      type="submit"
                      className={`${styles.button} !w-full !-h[42px] !rounded-[5px]`}
                    >
                      <span className="text-white">Create Coupon Code</span>
                    </button>
                  </div>
                  <br />
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllDiscountCodes;
