import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/style";
import { MdPendingActions } from "react-icons/md";
import { GrAchievement } from "react-icons/gr";
import { Link } from "react-router-dom";
import { adminGetAllWithdrawal } from "../../redux/actions/withdrawals";

const WithdrwalDashBoard = () => {
  const { allAdminWithdrawals } = useSelector((state) => state.withdraw);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(adminGetAllWithdrawal());
  }, []);
  //   console.log(allAdminWithdrawals);
  //   console.log(withdrawData);
  //   console.log(withdrawData.status);

  const completed =
    allAdminWithdrawals &&
    allAdminWithdrawals.reduce(
      (acc, item) => acc + (item.status === "Suceeded"),
      0
    );

  const incompleted = allAdminWithdrawals
    ? allAdminWithdrawals.length - completed
    : 0;

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
  ];

  const row = [];

  allAdminWithdrawals &&
    allAdminWithdrawals.forEach((item) => {
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
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="w-full gap-5 sm:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Total Withdrawals{" "}
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {allAdminWithdrawals && allAdminWithdrawals.length}
          </h5>
          <Link to="/admin-withdraw-request">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View All Withdrawals</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <GrAchievement
              size={30}
              className="mr-2"
              fill="#00000085"
              color="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Completed Withdrawals
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {completed}{" "}
          </h5>
          <Link to="/admin-completed-withdraw">
            <h5 className="pt-4 pl-2 text-[#077f9c]">
              View Completed Withdrawals
            </h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdPendingActions
              size={30}
              className="mr-2"
              fill="#00000085"
              color="#00000085"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Pending Withdrawals
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {incompleted}{" "}
          </h5>
          <Link to="/admin-incompleted-withdraw">
            <h5 className="pt-4 pl-2 text-[#077f9c]">
              View Pending Withdrawals
            </h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Latest Withdrwals</h3>
      <div className="w-full min-h-[45vh] bg-white rounded">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>

    // <div className="w-full flex justify-center mt-3">
    //   <div className="w-[95%]">
    //     <h3 className="text-[22px] font-Poppins pb-2">All Shops</h3>
    //     <div className="w-full min-h-[45vh] bg-white rounded">
    //       <DataGrid
    //         rows={row}
    //         columns={columns}
    //         pageSize={10}
    //         disableSelectionOnClick
    //         autoHeight
    //       />
    //     </div>
    //   </div>{" "}
    // </div>
  );
};

export default WithdrwalDashBoard;
