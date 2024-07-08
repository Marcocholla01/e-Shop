import React, { useEffect } from "react";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllSupports } from "../../redux/actions/support";

const AdminGrivances = () => {
  const { adminSupports, isLoading } = useSelector((state) => state.support);

  const dispatch = useDispatch();
  console.log(adminSupports);

  useEffect(() => {
    dispatch(adminGetAllSupports());
  }, []);

  const columns = [
    { field: "id", headerName: "Support ID", minWidth: 150, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "subject",
      headerName: "Subject",
      type: "text",
      minWidth: 40,
      flex: 0.7,
    },

    {
      field: "status",
      headerName: "Status",
      type: "text",
      minWidth: 60,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "number",
      minWidth: 60,
      flex: 0.8,
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
            <Link to={`/admin-support/${params.id}`}>
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

  adminSupports &&
    adminSupports.forEach((item) => {
      row.push({
        id: item._id,
        email: item.email,
        subject: item.subject,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full flex justify-center mt-3">
      <div className="w-[95%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Grivances</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
        <div className="w-full mt-6 justify-between flex">
          <br />
          <Link
            to={`/admin-active-users`}
            className={`${styles.button} text-white !h-[42px] !rounded-[5px] !self-end !w-auto !p-2`}
          >
            view Active users
          </Link>
        </div>{" "}
      </div>
    </div>
  );
};

export default AdminGrivances;
