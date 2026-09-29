import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useUserContext } from '../context/UserContex'

export default function DashboardLayout() {
    // const { autenticated } = useUserContext()
    // const navigate = useNavigate()

    // useEffect(() => {
    //     if (!autenticated) {
    //         navigate('/')
    //     }
    // }, [autenticated])


    return (
        <>
            <div className="main-sec">
                {/*header */}
                <Header />

        
                <Outlet />
            </div>
        </>
    )
}
