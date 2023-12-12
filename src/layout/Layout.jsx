import React from 'react'
import Navbar from '../component/web/navbar/Navbar'
import Footer from '../component/web/footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <Navbar  />
    <Outlet />
    <Footer />
    </>
  )
}
