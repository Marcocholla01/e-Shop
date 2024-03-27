import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSidebar";
import AdminSales from "../../components/Admin/AdminSales";

const AdminAllSales = () => {
  return (
    <div>
      <AdminHeader />
      <div className={`w-[100%] flex `}>
        <div className="flex w-full items-start justify-between">
          <div className={`w-[80px] sm:w-[330px]`}>
            <AdminSideBar active={11} />
          </div>
          <div className="w-full justify-center flex">
            <AdminSales />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAllSales;
