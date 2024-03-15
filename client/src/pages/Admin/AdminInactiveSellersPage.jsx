import React from "react";
import AdminInactiveSellers from "../../components/Admin/AdminInactiveSellers";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSidebar";

const AdminInactiveSellersPage = () => {
  return <div>
  <AdminHeader />
  <div className={`w-[100%] flex `}>
    <div className="flex w-full items-start justify-between">
      <div className={`w-[80px] sm:w-[330px]`}>
        <AdminSideBar  />
      </div>
      <div className="w-full justify-center flex">
        <AdminInactiveSellers />
      </div>
    </div>
  </div>
</div>
};

export default AdminInactiveSellersPage;
