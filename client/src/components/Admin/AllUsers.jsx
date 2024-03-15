import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../redux/actions/user";
import styles from "../../styles/style";
import { MdBorderClear } from "react-icons/md";

const AllUsers = () => {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userVerifiedData, setUserVerifiiedData] = useState("");
  const [userNotVerifiedData, setUserNotVerifiiedData] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
    const userVerifiedData =
      users && users.filter((item) => item.isActive === true);
    setUserVerifiiedData(userVerifiedData);
    const userNotVerifiedData =
      users && users.filter((item) => item.isActive === false);
    setUserNotVerifiiedData(userNotVerifiedData);
  }, []);

  const verified =
    userVerifiedData &&
    userVerifiedData.reduce((acc, item) => acc + item.isActive, 0);
  const notVerified = users?.length - verified;

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.8 },

    {
      field: "name",
      headerName: "User Names",
      type: "text",
      minWidth: 100,
      flex: 0.8,
    },

    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "role",
      headerName: "User Role",
      type: "text",
      minWidth: 70,
      flex: 0.5,
    },

    {
      field: "joinedOn",
      headerName: "Joined On",
      type: "number",
      minWidth: 100,
      flex: 0.8,
    },

    {
      field: "joinedAt",
      headerName: "Joined At",
      type: "number",
      minWidth: 40,
      flex: 0.7,
    },

    // {
    //   field: "   ",
    //   flex: 0.5,
    //   minWidth: 10,
    //   headerName: "View More",
    //   type: "number",
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={`/admin-user/${params.id}`}>
    //           <Button>
    //             <AiOutlineArrowRight size={20} />
    //           </Button>
    //         </Link>
    //       </>
    //     );
    //   },
    // },
  ];

  const row = [];

  users &&
    users.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        joinedOn: item.createdAt.slice(0, 10),
        joinedAt: item.createdAt.slice(11, 19),
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
              Total Users{" "}
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {users && users.length}
          </h5>
          <Link to="/admin-all-users">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View All Users</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Active Users
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{verified} </h5>
          <Link to="/admin-active-users">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Active Users</h5>
          </Link>
        </div>

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
              Inactive Users
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {notVerified}{" "}
          </h5>
          <Link to="/admin-inactive-users">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Inactive Users</h5>
          </Link>
        </div>
      </div>
      <br />
      <h3 className="text-[22px] font-Poppins pb-2">Latest Users</h3>
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
    //     <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
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

export default AllUsers;
