import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { BiEdit } from "react-icons/bi";
import { MdVerifiedUser } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import {  getAllUsers } from "../../redux/actions/user";
import styles from "../../styles/style";

const AdminAllUsers = () => {
  const { users, loading } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("choose Role");

  const [userData, setUserData] = useState([]);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const dispatch = useDispatch();

  const updateUserSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(userData.role);
    await axios
      .put(
        `${BASE_URL}/user/update-user-role/${userData.id}`,
        {
          newRole: role,
        },
        { withCredentials: true }
      )
      .then((response) => {
        toast.success(response.data.message);
        setOpen(false);
        dispatch(getAllUsers());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const activateUser = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${BASE_URL}/user/activate-user/${userData.id}`,
        { status: true },
        { withCredentials: true }
      )
      .then((response) => {
        toast.success(response.data.message);
        setOpen(false);
        dispatch(getAllUsers());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const deactivateUser = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${BASE_URL}/user/deactivate-user/${userData.id}`,
        { status: false },
        { withCredentials: true }
      )
      .then((response) => {
        toast.success(response.data.message);
        setOpen(false);
        dispatch(getAllUsers());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const deleteUser = async (e) => {
    e.preventDefault();
    await axios
      .delete(`${BASE_URL}/user/delete-user/${userData.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
        setDeleteOpen(false);
        dispatch(getAllUsers());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const columns = [
    { field: "id", headerName: "Customer ID", minWidth: 150, flex: 0.8 },

    {
      field: "name",
      headerName: "Customer Names",
      type: "text",
      minWidth: 100,
      flex: 0.5,
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
      field: "status",
      headerName: "isActive",
      type: "text",
      minWidth: 50,
      flex: 0.5,
    },

    {
      field: "joinedOn",
      headerName: "Joined On",
      type: "number",
      minWidth: 50,
      flex: 0.5,
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
      headerName: "Edit User",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setOpen(true) || setUserData(params.row)}>
              <BiEdit size={20} />
            </Button>
          </>
        );
      },
    },

    {
      field: "Delete",
      flex: 0.5,
      minWidth: 40,
      headerName: "Delete Customer",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => setDeleteOpen(true) || setUserData(params.row)}
            >
              <AiOutlineDelete size={20} />
            </Button>
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
        status: item.isActive,
        joinedOn: item.createdAt.slice(0, 10),
        joinedAt: item.createdAt.slice(11, 19),
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full flex justify-center mt-3">
          <div className="w-[95%]">
            <h3 className="text-[22px] font-Poppins pb-2">All Customers</h3>
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
                to={`/admin-active-users`}
                className={`${styles.button} text-white !h-[42px] !rounded-[5px] !self-end !w-auto !p-2`}
              >
                view Active Customers
              </Link>
              <Link
                to={`/admin-inactive-users`}
                className={`${styles.button} text-white !h-[42px] !rounded-[5px] !self-end !w-auto !p-2`}
              >
                view Inactive Customers
              </Link>
            </div>{" "}
          </div>{" "}
        </div>
      )}

      {deleteOpen && (
        <>
          <div className="w-full fixed top-0 left-0 items-center flex bg-[#0000004e] h-screen z-[9999] justify-center">
            <div
              className={`sm:w-[40%] w-[95%] bg-white shadow rounded min-h-[25vh] p-3`}
            >
              <div className="w-full flex justify-end">
                <RxCross1
                  size={25}
                  className="cursor-pointer mr-3"
                  onClick={() => setDeleteOpen(false)}
                />
              </div>

              <h1 className="text-center font-Poppins text-[25px]">
                Are you sure you want to delete this User
              </h1>
              <h4 className="text-center font-Poppins text-[20px] text-[#0000007a]">
                {userData.name.slice(0, 30)}...
              </h4>

              <div className="w-full items-center flex  justify-center flex-row gap-10">
                <div className="flex items-center  ">
                  <button
                    className="mt-7 group w-[100px] h-[40px]  py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-red-700 hover:bg-red-600 uppercase"
                    onClick={() => setDeleteOpen(false)}
                  >
                    no
                  </button>
                </div>
                <div className="flex items-center  ">
                  <button
                    className="mt-7 group w-[100px] h-[40px]  py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-green-700 hover:bg-green-600 uppercase"
                    onClick={deleteUser}
                  >
                    yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {open && (
        <>
          <div className="w-full fixed top-0 left-0 items-center flex bg-[#0000004e] h-screen z-[9999] justify-center">
            <div
              className={`sm:w-[25%] w-[70%] bg-gray-200 shadow rounded min-h-[30vh] p-3`}
            >
              <div className="w-full flex justify-end">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full flex items-center justify-center flex-col">
                <h1 className="text-center font-Poppins font-[600] text-[22px]">
                  update user account status
                </h1>

                <form
                  className="w-[80%] items-center flex flex-col mb-7"
                  onSubmit={updateUserSubmitHandler}
                >
                  {/* <img
                    src={`${backend_url}/uploads/`}
                    alt=""
                    srcset=""
                    className="w-[100px] h-[100px] rounded-full self-center m-3"
                  /> */}
                  {userData && userData.status === false ? null : (
                    <>
                      <div className=" w-full items-center flex flex-row mt-7">
                        <MdVerifiedUser
                          className="absolute"
                          size={35}
                          color="gray"
                        />
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="appearance-none block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
                        >
                          <option>Choose Role</option>
                          {["user", "Admin"].map((option, index) => (
                            <option value={option} key={index}>
                              {option}{" "}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        id=""
                        type="submit"
                        className="group relative w-full h-[42px] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 uppercase mt-7 "
                      >
                        change role
                      </button>
                    </>
                  )}

                  {userData && userData.status === false ? (
                    <div className=" w-full items-center flex flex-row mt-7">
                      {/* <IoPersonCircleOutline
      className="absolute "
      size={35}
      color="gray"
    /> */}
                      <div
                        className={`group relative w-full h-[42px] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 uppercase mt-7  cursor-pointer`}
                        onClick={activateUser}
                      >
                        Acivate Customer
                      </div>
                    </div>
                  ) : (
                    <div className=" w-full items-center flex flex-row mt-7">
                      {/* <IoMailOutline
                        className="absolute"
                        size={35}
                        color="gray"
                      /> */}

                      <div
                        className={`group relative w-full h-[42px] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 uppercase mt-7 cursor-pointer`}
                        onClick={deactivateUser}
                      >
                        Deactivate Customer
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
            {/* <div className="w-full sm:w-auto flex ">
                    <div className="w-full  self-center flex-col sm:m-0 m-10">
                      <div>
                        <div
                          className={`${styles.button} text-white mr-7 !h-[42px] `}
                        >
                          Activate User
                        </div>
                      </div>
                      <div>
                        <div
                          className={`${styles.button} text-white mr-7 !h-[42px]`}
                        >
                          Deactivete User
                        </div>
                      </div>
                      <div>
                        <div
                          className={`${styles.button} text-white mr-7 !h-[42px]`}
                        >
                          Delete User
                        </div>
                      </div>
                    </div>
                  </div> */}
          </div>
        </>
      )}
    </>
  );
};

export default AdminAllUsers;
