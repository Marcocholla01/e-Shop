import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellers } from "../../redux/actions/seller";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const AllSellers = () => {
  const { sellers } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSellers());
  }, []);
  //   console.log(sellers);

  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.8 },

    {
      field: "name",
      headerName: "Seller Names",
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

  sellers &&
    sellers.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        email: item.email,
        joinedOn: item.createdAt.slice(0, 10),
        joinedAt: item.createdAt.slice(11, 19),
      });
    });
  return (
    <div className="w-full flex justify-center mt-3">
      <div className="w-[95%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Sellers</h3>
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
    </div>
  );
};

export default AllSellers;
