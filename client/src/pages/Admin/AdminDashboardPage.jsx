import React from "react";
import AdminDashboardmain from "../../components/Admin/Layout/AdminDashboardmain";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSidebar";

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className={`w-[100%] flex `}>
        <div className="flex w-full items-start justify-between">
          <div className={`w-[80px] sm:w-[330px]`}>
            <AdminSideBar active={1} />
          </div>
          <AdminDashboardmain />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
