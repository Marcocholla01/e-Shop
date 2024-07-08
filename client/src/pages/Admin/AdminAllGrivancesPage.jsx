import React from "react";
import AdminSideBar from "../../components/Admin/Layout/AdminSidebar";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminGrivances from "../../components/Admin/AdminGrivances";

const AdminAllGrivancesPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className={`w-[100%] flex `}>
        <div className="flex w-full items-start justify-between">
          <div className={`w-[80px] sm:w-[330px]`}>
            <AdminSideBar active={12} />
          </div>
          <div className="w-full justify-center flex">
            <AdminGrivances />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAllGrivancesPage;
