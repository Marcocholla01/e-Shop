import React from 'react'
import AllOrders from '../../components/Admin/AllOrders'
import AdminSideBar from '../../components/Admin/Layout/AdminSidebar'
import AdminHeader from '../../components/Admin/Layout/AdminHeader'

const AdminAllOrdersPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className={`w-[100%] flex `}>
        <div className="flex w-full items-start justify-between">
          <div className={`w-[80px] sm:w-[330px]`}>
            <AdminSideBar active={2} />
          </div>
          <div className="w-full justify-center flex">
            <AllOrders />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAllOrdersPage