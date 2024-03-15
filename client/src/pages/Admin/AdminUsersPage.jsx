import React from "react";
import AdminAllUsers from "../../components/Admin/AdminAllUsers";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSidebar";

const AdminUsersPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className={`w-[100%] flex `}>
        <div className="flex w-full items-start justify-between">
          <div className={`w-[80px] sm:w-[330px]`}>
            <AdminSideBar active={4} />
          </div>
          <div className="w-full justify-center flex">
            <AdminAllUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
