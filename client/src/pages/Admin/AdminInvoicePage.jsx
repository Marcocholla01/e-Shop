import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSidebar";
import AdminInvoice from "../../components/Admin/AdminInvoice";

const AdminInvoicePage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="w-full flex items-start justify-between">
          <div className="w-[80px] sm:w-[330px]">
            <AdminSideBar />
          </div>
          <AdminInvoice />
        </div>
      </div>
    </div>
  );
};

export default AdminInvoicePage;
