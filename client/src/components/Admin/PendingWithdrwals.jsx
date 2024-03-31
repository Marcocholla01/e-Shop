import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { adminGetAllWithdrawal } from "../../redux/actions/withdrawals";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { BASE_URL } from "../../config";
import styles from "../../styles/style";

const PendingWithdrwals = () => {
  const { allAdminWithdrawals } = useSelector((state) => state.withdraw);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState([]);
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");

  const completed =
    allAdminWithdrawals &&
    allAdminWithdrawals.filter((item) => item.status === "Processing");
  useEffect(() => {
    dispatch(adminGetAllWithdrawal());
  }, []);
  //   console.log(allAdminWithdrawals);
  //   console.log(withdrawData);
  //   console.log(withdrawData.status);

  const hadleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${BASE_URL}/withdraw/update-withdraw-request/${withdrawData.id}`,
        {
          shopId: withdrawData.shopId,
          status: "Suceeded",
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setWithdrawData(res.data.withdraw);
        dispatch(adminGetAllWithdrawal());
        setOpen(false);
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
      field: "Update Status",
      flex: 0.5,
      minWidth: 40,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => setOpen(true) || setWithdrawData(params.row)}
            >
              <BsPencil size={20} />
            </Button>
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
          All Pending Withdrawals
        </h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
        <div className="w-full mt-6 justify-end flex gap-3">
          <Link
            to={`/admin-completed-withdraw`}
            className={`${styles.button} text-white !h-[42px] !rounded-[5px] !self-end !w-auto !p-2`}
          >
            view completed withdrawals
          </Link>
        </div>{" "}
      </div>
      {open && (
        <>
          <div className="w-full fixed top-0 left-0 items-center flex bg-[#0000004e] h-screen z-[9999] justify-center">
            <div
              className={`sm:w-[50%] w-[95%] bg-white shadow rounded min-h-[30vh] p-3`}
            >
              <div className="w-full flex justify-end">
                <RxCross1
                  size={25}
                  className="cursor-pointer mr-3"
                  onClick={() => setOpen(false)}
                />
              </div>

              <h1 className="text-center font-Poppins text-[25px]">
                {" "}
                Update Withdraw Status
              </h1>

              <div className="w-full items-center flex  justify-center flex-col">
                <select
                  name=""
                  id=""
                  onChange={(e) => setWithdrawStatus(e.target.value)}
                  className={`w-[270px] mt-2 border h-[35px] rounded-[5px]  `}
                >
                  <option value={withdrawStatus}>{withdrawData.status}</option>
                  <option value={withdrawStatus}>Suceeded</option>
                </select>

                <div className="flex items-center  ">
                  <button
                    className="mt-7 group w-[270px] h-[40px]  py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 uppercase"
                    onClick={hadleSubmit}
                  >
                    submit
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

export default PendingWithdrwals;
