import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import { SlPrinter } from "react-icons/sl";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const AdminSales = () => {
  const { adminOrders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const [open, setOpen] = useState();
  const [productData, setProductData] = useState();

  const sales =
    adminOrders && adminOrders.filter((item) => item.status === `Delivered`);

  //   console.log(sales);
  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, []);
  // console.log(adminOrders);

  const deleteOrder = async (e) => {
    e.preventDefault();
    await axios
      .delete(`${BASE_URL}/order/delete-order/${productData.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
        dispatch(getAllOrdersOfAdmin());
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Sale ID", minWidth: 150, flex: 0.7 },

    {
      field: "soldto",
      headerName: "Sold To",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.5,
    },

    {
      field: "total",
      headerName: "Total Price",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 0.5,
      minWidth: 10,
      headerName: "View Invoice",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/invoice/${params.id}`}>
              <Button>
                <SlPrinter size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },

    {
      field: "   ",
      flex: 0.5,
      minWidth: 10,
      headerName: "Delete sale",
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

    {
      field: "    ",
      flex: 0.5,
      minWidth: 150,
      headerName: "View More",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  //   console.log(adminOrders);
  const row = [];

  sales &&
    sales.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "KSHS " + item.totalPrice,
        soldto: item.user.name,
      });
    });
  return (
    <div className="w-full flex justify-center mt-3">
      <div className="w-[95%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Sales</h3>
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
                Are you sure you want to delete this Sale
              </h1>
              <h4 className="text-center font-Poppins text-[20px] text-[#0000007a]">
                {productData?.id}
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
                    onClick={deleteOrder}
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

export default AdminSales;
