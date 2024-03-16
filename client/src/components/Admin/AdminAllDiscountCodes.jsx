import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import {
  AiOutlineArrowRight,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { adminGetAllCouponCodes } from "../../redux/actions/couponCode";

const AdminAllDiscountCodes = () => {
  const { adminCouponCode } = useSelector((state) => state.couponCode);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [open, setOpen] = useState();
  const [productData, setProductData] = useState();

  useEffect(() => {
    dispatch(adminGetAllCouponCodes());
  }, []);
  // console.log(adminCouponCode);

  const deleteEvent = async (e) => {
    e.preventDefault();
    await axios
      .delete(`${BASE_URL}/couponCode/delete-coupon-code/${productData.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
        dispatch(adminGetAllCouponCodes());
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "price",
      headerName: "Discount",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 70,
      flex: 0.6,
    },
    {
      field: "shop",
      headerName: "Shop Id",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "startDate",
      headerName: "Start Date",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "endDate",
      headerName: "End Date",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.5,
      minWidth: 40,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
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
      flex: 0.5,
      minWidth: 40,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setOpen(true) || setProductData(params.row)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  adminCouponCode &&
    adminCouponCode.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        status: item.status,
        shop: item.shopId,
        startDate: item.start_date.slice(0, 10),
        endDate: item.finish_date.slice(0, 10),
      });
    });
  return (
    <div className="w-full flex justify-center mt-3">
      <div className="w-[95%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Coupon Codes</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>{" "}
      </div>
      {open && (
        <>
          <div className="w-full fixed top-0 left-0 items-center flex bg-[#0000004e] h-screen z-[9999] justify-center">
            <div
              className={`sm:w-[40%] w-[95%] bg-white shadow rounded min-h-[25vh] p-3`}
            >
              <div className="w-full flex justify-end">
                <RxCross1
                  size={25}
                  className="cursor-pointer mr-3"
                  onClick={() => setOpen(false)}
                />
              </div>

              <h1 className="text-center font-Poppins text-[25px]">
                Are you sure you want to delete this Coupon Code
              </h1>
              <h4 className="text-center font-Poppins text-[20px] text-[#0000007a]">
                {productData.name.slice(0, 30)}...
              </h4>

              <div className="w-full items-center flex  justify-center flex-row gap-10">
                <div className="flex items-center  ">
                  <button
                    className="mt-7 group w-[100px] h-[40px]  py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-red-700 hover:bg-red-600 uppercase"
                    onClick={() => setOpen(false)}
                  >
                    no
                  </button>
                </div>
                <div className="flex items-center  ">
                  <button
                    className="mt-7 group w-[100px] h-[40px]  py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-green-700 hover:bg-green-600 uppercase"
                    onClick={deleteEvent}
                  >
                    yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAllDiscountCodes;
