import React from "react";
import AllSellers from "../../components/Admin/AllSellers";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSidebar";

const AdminAllSellersPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className={`w-[100%] flex `}>
        <div className="flex w-full items-start justify-between">
          <div className={`w-[80px] sm:w-[330px]`}>
            <AdminSideBar active={3} />
          </div>
          <div className="w-full justify-center flex">
            <AllSellers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAllSellersPage;
