import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteShopEvent, getAllEventsShop } from "../../redux/actions/event";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";

const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);
  // console.log(events && events);

  const handledelete = (id) => {
    // console.log(id);
    dispatch(deleteShopEvent(id));
    // dispatch(clearEventState())
    toast.success("Event deleted successfully");
    window.location.reload(true);
  };

  const columns = [
    { field: "id", headerName: "Event Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 70,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 70,
      flex: 0.5,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },

    {
      field: "end_date",
      headerName: "End Date",
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
        const d = params.row.name;
        const event_name = d.replace(/\$+/g, "-");
        return (
          <>
            <Link to={`/event/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Edit",
      flex: 0.5,
      minWidth: 40,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard-edit-event/${params.id}`}>
              <Button
              // onClick={() => setOpen(true) || setProductData(params.row)}
              >
                <BiEdit size={20} />
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
            <Button onClick={() => handledelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        stock:item.stock,
        name: item.name,
        status: item.status,
        start_date: item?.start_date ? item.start_date.slice(0, 10) : null,
        end_date: item?.finish_date ? item.finish_date.slice(0, 10) : null,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};
export default AllEvents;
