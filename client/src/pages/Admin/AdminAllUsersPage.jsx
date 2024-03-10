import React from "react";
import AllUsers from "../../components/Admin/AllUsers";
import AdminSideBar from "../../components/Admin/Layout/AdminSidebar";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";

const AdminAllUsersPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="w-full flex items-start justify-between">
          <div className="w-[80px] sm:w-[330px]">
            <AdminSideBar active={4} />
          </div>
          <AllUsers />
        </div>
      </div>
    </div>
  );
};

export default AdminAllUsersPage;
