import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { adminGetAllWithdrawal } from "../../redux/actions/withdrawals";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import { Button } from "@material-ui/core";
import axios from "axios";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";

const CompletedWithdrawals = () => {
  const { allAdminWithdrawals } = useSelector((state) => state.withdraw);
  const dispatch = useDispatch();

  const [openDelete, setOpenDelete] = useState(false);
  const [productData, setProductData] = useState("");

  const completed =
    allAdminWithdrawals &&
    allAdminWithdrawals.filter((item) => item.status === "Suceeded");
  useEffect(() => {
    dispatch(adminGetAllWithdrawal());
  }, []);
  //   console.log(allAdminWithdrawals);
  //   console.log(withdrawData);
  //   console.log(withdrawData.status);

  const deleteWithdrawal = async (e) => {
    e.preventDefault();
    await axios
      .delete(`${BASE_URL}/withdraw/delete-withdraw/${productData.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
        dispatch(adminGetAllWithdrawal());
        setOpenDelete(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Withdraw Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Shop Name",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "shopId",
      headerName: "Shop Id",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 70,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "createdAt",
      headerName: "Date",
      type: "number",
      minWidth: 100,
      flex: 0.6,
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
            <Button
              onClick={() => setOpenDelete(true) || setProductData(params.row)}
            >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: "viewmore",
      flex: 0.5,
      minWidth: 150,
      headerName: "View More",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/withdrawal-details/${params.id}`}>
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

  completed &&
    completed.forEach((item) => {
      row.push({
        id: item._id,
        name: item.seller.name,
        shopId: item.seller._id,
        amount: "KSHS " + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });
  return (
    <div className="w-full flex justify-center mt-3">
      <div className="w-[95%]">
        <h3 className="text-[22px] font-Poppins p-2 text-center">
          All Completed Withdrawals
        </h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>{" "}
        <div className="w-full mt-6 justify-end flex gap-3">
          <Link
            to={`/admin-incompleted-withdraw`}
            className={`${styles.button} text-white !h-[42px] !rounded-[5px] !self-end !w-auto !p-2`}
          >
            view pending withdrawals
          </Link>
        </div>{" "}
      </div>

      {openDelete && (
        <>
          <div className="w-full fixed top-0 left-0 items-center flex bg-[#0000004e] h-screen z-[9999] justify-center">
            <div
              className={`sm:w-[40%] w-[95%] bg-white shadow rounded min-h-[25vh] p-3`}
            >
              <div className="w-full flex justify-end">
                <RxCross1
                  size={25}
                  className="cursor-pointer mr-3"
                  onClick={() => setOpenDelete(false)}
                />
              </div>

              <h1 className="text-center font-Poppins text-[25px]">
                Are you sure you want to delete withdrawal data
              </h1>
              <h4 className="text-center font-Poppins text-[20px] text-[#0000007a]">
                {productData.name.slice(0, 30)}...
              </h4>

              <div className="w-full items-center flex  justify-center flex-row gap-10">
                <div className="flex items-center  ">
                  <button
                    className="mt-7 group w-[100px] h-[40px]  py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-red-700 hover:bg-red-600 uppercase"
                    onClick={() => setOpenDelete(false)}
                  >
                    no
                  </button>
                </div>
                <div className="flex items-center  ">
                  <button
                    className="mt-7 group w-[100px] h-[40px]  py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-green-700 hover:bg-green-600 uppercase"
                    onClick={deleteWithdrawal}
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

export default CompletedWithdrawals;
