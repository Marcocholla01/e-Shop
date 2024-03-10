import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../redux/actions/user";

const AllUsers = () => {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

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

    {
      field: "   ",
      flex: 0.5,
      minWidth: 10,
      headerName: "View More",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard/order/`}>
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
    <div className="w-full flex justify-center mt-3">
      <div className="w-[95%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>{" "}
    </div>
  );
};

export default AllUsers;
