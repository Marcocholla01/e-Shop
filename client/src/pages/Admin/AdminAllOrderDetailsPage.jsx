import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import Footer from "../../components/Layout/Footer";
import AdminOrderDetails from "../../components/Admin/AdminOrderDetails";

const AdminAllOrderDetailsPage = () => {
  return (
    <div>
      <AdminHeader />
      <AdminOrderDetails />
      <Footer />
    </div>
  );
};

export default AdminAllOrderDetailsPage;
