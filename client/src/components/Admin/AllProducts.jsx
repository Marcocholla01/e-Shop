import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import {
  AiOutlineArrowRight,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { adminGetAllProducts } from "../../redux/actions/product";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../config";
import { RxCross1 } from "react-icons/rx";

const AllProducts = () => {
  const { adminProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [open, setOpen] = useState();
  const [productData, setProductData] = useState();

  useEffect(() => {
    dispatch(adminGetAllProducts());
  }, []);
  // console.log(adminProducts);

  const deleteProduct = async (e) => {
    e.preventDefault();
    await axios
      .delete(`${BASE_URL}/product/delete-product/${productData.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
        dispatch(adminGetAllProducts());
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 70,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
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
            <Link to={`/product/${params.id}`}>
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

  adminProducts &&
    adminProducts.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "KSHS " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });
  return (
    <div className="w-full flex justify-center mt-3">
      <div className="w-[95%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Products</h3>
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
                Are you sure you want to delete this product
              </h1>
              <h4 className="text-center font-Poppins text-[20px] text-[#0000007a]">
                {productData?.name?.slice(0, 30)}...
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
                    onClick={deleteProduct}
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

export default AllProducts;
