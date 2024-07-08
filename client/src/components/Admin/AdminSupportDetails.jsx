import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { AdminGetSupportdetails } from "../../redux/actions/support";
// import { Spinner } from "./Layout/Spinner";

const AdminSupportDetails = () => {
  const { support, isLoading } = useSelector((state) => state.support);
  const { supportId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState(support && support.status);

  useEffect(() => {
    dispatch(AdminGetSupportdetails(supportId));
  }, [supportId, dispatch]);

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(
        `${BASE_URL}/contactForm/update-form/${supportId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setStatus(newStatus);
      toast.success(`Status updated successfully to ${newStatus}`);
      dispatch(AdminGetSupportdetails(supportId));
    } catch (error) {
      toast.error("Failed to update status");
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/contactForm/delete-form/${supportId}`, {
        withCredentials: true,
      });
      toast.success("Support entry deleted successfully");
      navigate("/admin-support");
    } catch (error) {
      toast.error("Failed to delete support entry");
      console.log(error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-500";
      case "not solved":
        return "text-red-500";
      case "solved":
        return "text-green-500";
      case "in progress":
        return "text-blue-500";
      default:
        return "";
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Spinner />
  //     </div>
  //   );
  // }

  if (!support) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load support details</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-lg mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Support Details</h2>
      <table className="min-w-full bg-white">
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-bold">Support ID:</td>
            <td className="border px-4 py-2">{support._id}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">Name:</td>
            <td className="border px-4 py-2">{support.name}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">Email:</td>
            <td className="border px-4 py-2">{support.email}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">Subject:</td>
            <td className="border px-4 py-2">{support.subject}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">Status:</td>
            <td
              className={`border px-4 py-2 ${getStatusClass(support.status)}`}
            >
              {support.status}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          id="message"
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
          rows="10"
          readOnly
          value={support.message}
        ></textarea>
      </div>
      <div className="mt-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="status"
        >
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="pending">Pending</option>
          <option value="not solved">Not Solved</option>
          <option value="solved">Solved</option>
          <option value="in progress">In Progress</option>
        </select>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminSupportDetails;
