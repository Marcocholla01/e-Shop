import React from "react";
import AdminAllSellers from "../../components/Admin/AdminAllSellers";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSidebar";

const AdminSellersPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className={`w-[100%] flex `}>
        <div className="flex w-full items-start justify-between">
          <div className={`w-[80px] sm:w-[330px]`}>
            <AdminSideBar active={3} />
          </div>
          <div className="w-full justify-center flex">
            <AdminAllSellers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSellersPage;
