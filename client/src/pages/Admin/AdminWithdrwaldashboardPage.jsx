import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSidebar";
import WithdrwalDashBoard from "../../components/Admin/WithdrwalDashBoard";

const AdminWithdrwaldashboardPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className={`w-[100%] flex `}>
        <div className="flex w-full items-start justify-between">
          <div className={`w-[80px] sm:w-[330px]`}>
            <AdminSideBar active={7} />
          </div>
          <div className="w-full justify-center flex">
            <WithdrwalDashBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWithdrwaldashboardPage;
