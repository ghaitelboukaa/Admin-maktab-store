import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SpecialOffers from '../components/homepageComponents/SpecialOffers'
import NewLette from '../components/homepageComponents/NewLette'
import Nav from '../components/homepageComponents/Nav'

  function Layout() {
   

  return (
    <div>
      <div className="main-sec">
        {/*header */}
        <Header />
        <Nav/>
        {/*header */}

        <main>

          
          <Outlet />
        </main>

        <SpecialOffers/>
        <NewLette/>

        {/*footer */}
        <Footer />
        {/*/footer */}
      </div>
    </div>
  )
}

export default Layout


