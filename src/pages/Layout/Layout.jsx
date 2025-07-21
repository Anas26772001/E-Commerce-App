import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import UpdatePageTitle from '../../components/UpdatePageTitle/UpdatePageTitle'

export default function Layout() {





    return (
        <div>
            <Navbar />
            <UpdatePageTitle />
            <Outlet />
            <Footer />

        </div>
    )
}
