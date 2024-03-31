import React from 'react'
import AdminHeader from '../../components/Admin/Layout/AdminHeader'
import AdminSideBar from '../../components/Admin/Layout/AdminSidebar'
import CompletedWithdrawals from '../../components/Admin/CompletedWithdrawals'

const AdminCompletedWithdrawals = () => {
  return (
    <div>
        <AdminHeader />
      <div className={`w-[100%] flex `}>
        <div className="flex w-full items-start justify-between">
          <div className={`w-[80px] sm:w-[330px]`}>
            <AdminSideBar  />
          </div>
          <div className="w-full justify-center flex">
            <CompletedWithdrawals />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCompletedWithdrawals