import React from "react";
import AdminAllRefunds from "../../components/Admin/AdminAllRefunds";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSidebar";

const AdminAllRefundsPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className={`w-[100%] flex `}>
        <div className="flex w-full items-start justify-between">
          <div className={`w-[80px] sm:w-[330px]`}>
            <AdminSideBar active={10} />
          </div>
          <div className="w-full justify-center flex">
            <AdminAllRefunds />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAllRefundsPage;
