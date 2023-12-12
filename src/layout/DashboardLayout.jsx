import React from 'react'
import Navbar from '../component/dashpord/navbar/Navbar'
import Footer from '../component/dashpord/footer/Footer'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}
