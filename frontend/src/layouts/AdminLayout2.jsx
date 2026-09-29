import React, { useState } from 'react';
// import './Sidebar.css'; // Import CSS file

export default function AdminLayout2() {
    // const [isSidebarLocked, setSidebarLocked] = useState(false);
    const [isSidebarClosed, setSidebarClosed] = useState(window.innerWidth < 800);

    const toggleLock = () => {
        setSidebarLocked(!isSidebarLocked);
    };

    const hideSidebar = () => {
        if (isSidebarLocked) return;
        setSidebarClosed(true);
    };

    const showSidebar = () => {
        if (isSidebarLocked) return;
        setSidebarClosed(false);
    };



    const [isSidebarLocked, setSidebarLocked] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 800);

    // const toggleLock = () => {
    //     setSidebarLocked(!isSidebarLocked);
    // };

    const toggleSidebar = () => {
        if (!isSidebarLocked) {
            setSidebarOpen(!isSidebarOpen);
        }

        return (
            <>
                <style>
                    {`
            /* Import Google font - Poppins */
            @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: "Poppins", sans-serif;
            }
            body {
              min-height: 100vh;
              background: #eef5fe;
            }
            /* Pre css */
            .flex {
              display: flex;
              align-items: center;
            }
            .nav_image {
              display: flex;
              min-width: 55px;
              justify-content: center;
            }
            .nav_image img {
              height: 35px;
              width: 35px;
              border-radius: 50%;
              object-fit: cover;
            }
            
            /* Sidebar */
            .sidebar {
              position: fixed;
              top: 0;
              left: 0;
              height: 100%;
              width: 270px;
              background: #fff;
              padding: 15px 10px;
              box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
              transition: all 0.4s ease;
            }
            .sidebar.close {
              width: calc(55px + 20px);
            }
            .logo_items {
              gap: 8px;
            }
            .logo_name {
              font-size: 22px;
              color: #333;
              font-weight: 500px;
              transition: all 0.3s ease;
            }
            .sidebar.close .logo_name,
            .sidebar.close #lock-icon,
            .sidebar.close #sidebar-close {
              opacity: 0;
              pointer-events: none;
            }
            #lock-icon,
            #sidebar-close {
              padding: 10px;
              color: #4070f4;
              font-size: 25px;
              cursor: pointer;
              margin-left: -4px;
              transition: all 0.3s ease;
            }
            #sidebar-close {
              display: none;
              color: #333;
            }
            .menu_container {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              margin-top: 40px;
              overflow-y: auto;
              height: calc(100% - 82px);
            }
            .menu_container::-webkit-scrollbar {
              display: none;
            }
            .menu_title {
              position: relative;
              height: 50px;
              width: 55px;
            }
            .menu_title .title {
              margin-left: 15px;
              transition: all 0.3s ease;
            }
            .sidebar.close .title {
              opacity: 0;
            }
            .menu_title .line {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              height: 3px;
              width: 20px;
              border-radius: 25px;
              background: #aaa;
              transition: all 0.3s ease;
            }
            .menu_title .line {
              opacity: 0;
            }
            .sidebar.close .line {
              opacity: 1;
            }
            .item {
              list-style: none;
            }
            .link {
              text-decoration: none;
              border-radius: 8px;
              margin-bottom: 8px;
              color: #707070;
            }
            .link:hover {
              color: #fff;
              background-color: #4070f4;
            }
            .link span {
              white-space: nowrap;
            }
            .link i {
              height: 50px;
              min-width: 55px;
              display: flex;
              font-size: 22px;
              align-items: center;
              justify-content: center;
              border-radius: 4px;
            }
            
            .sidebar_profile {
              padding-top: 15px;
              margin-top: 15px;
              gap: 15px;
              border-top: 2px solid rgba(0, 0, 0, 0.1);
            }
            .sidebar_profile .name {
              font-size: 18px;
              color: #333;
            }
            .sidebar_profile .email {
              font-size: 15px;
              color: #333;
            }
            
            /* Navbar */
            .navbar {
              max-width: 500px;
              width: 100%;
              position: fixed;
              top: 0;
              left: 60%;
              transform: translateX(-50%);
              background: #fff;
              padding: 10px 20px;
              border-radius: 0 0 8px 8px;
              justify-content: space-between;
            }
            #sidebar-open {
              font-size: 30px;
              color: #333;
              cursor: pointer;
              margin-right: 20px;
              display: none;
            }
            .search_box {
              height: 46px;
              max-width: 500px;
              width: 100%;
              border: 1px solid #aaa;
              outline: none;
              border-radius: 8px;
              padding: 0 15px;
              font-size: 18px;
              color: #333;
            }
            .navbar img {
              height: 40px;
              width: 40px;
              margin-left: 20px;
            }
            
            /* Responsive */
            @media screen and (max-width: 1100px) {
              .navbar {
                left: 65%;
              }
            }
            @media screen and (max-width: 800px) {
              .sidebar {
                left: 0;
                z-index: 1000;
              }
              .sidebar.close {
                left: -100%;
              }
              #sidebar-close {
                display: block;
              }
              #lock-icon {
                display: none;
              }
              .navbar {
                left: 0;
                max-width: 100%;
                transform: translateX(0%);
              }
              #sidebar-open {
                display: block;
              }
            }
            `}
                </style>
                <nav className={`sidebar ${isSidebarClosed ? 'close' : ''} ${isSidebarLocked ? 'locked' : ''}`}>
                    <div className="logo_items flex">
                        <span className="nav_image">
                            <img src="images/logo.png" alt="logo_img" />
                        </span>
                        <span className="logo_name">CodingNepal</span>
                        <i className={`bx ${isSidebarLocked ? 'bx-lock-open-alt' : 'bx-lock-alt'}`} onClick={toggleLock} title="Unlock Sidebar"></i>
                        <i className="bx bx-x" onClick={toggleSidebar}></i>
                    </div>
                    <div className="menu_container">
                        {/* Sidebar menu items */}
                        <ul className="menu_item">
                            {/* Dashboard */}
                            <li className="item">
                                <a href="#" className="link flex">
                                    <i className="bx bx-home-alt"></i>
                                    <span>Overview</span>
                                </a>
                            </li>
                            <li className="item">
                                <a href="#" className="link flex">
                                    <i className="bx bx-grid-alt"></i>
                                    <span>All Projects</span>
                                </a>
                            </li>
                        </ul>
                        {/* Editor */}
                        <ul className="menu_item">
                            {/* Editor */}
                            <li className="item">
                                <a href="#" className="link flex">
                                    <i className="bx bxs-magic-wand"></i>
                                    <span>Magic Build</span>
                                </a>
                            </li>
                            <li className="item">
                                <a href="#" className="link flex">
                                    <i className="bx bx-folder"></i>
                                    <span>New Projects</span>
                                </a>
                            </li>
                            <li className="item">
                                <a href="#" className="link flex">
                                    <i className="bx bx-cloud-upload"></i>
                                    <span>Upload New</span>
                                </a>
                            </li>
                        </ul>
                        {/* Setting */}
                        <ul className="menu_item">
                            {/* Setting */}
                            <li className="item">
                                <a href="#" className="link flex">
                                    <i className="bx bx-flag"></i>
                                    <span>Notice Board</span>
                                </a>
                            </li>
                            <li className="item">
                                <a href="#" className="link flex">
                                    <i className="bx bx-award"></i>
                                    <span>Award</span>
                                </a>
                            </li>
                            <li className="item">
                                <a href="#" className="link flex">
                                    <i className="bx bx-cog"></i>
                                    <span>Setting</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Profile section */}
                    <div className="sidebar_profile flex">
                        <span className="nav_image">
                            <img src="images/profile.jpg" alt="logo_img" />
                        </span>
                        <div className="data_text">
                            <span className="name">David Oliva</span>
                            <span className="email">david@gmail.com</span>
                        </div>
                    </div>
                </nav>
                {/* Navbar */}
                <nav className="navbar flex">
                    <i className="bx bx-menu" onClick={toggleSidebar}></i>
                    <input type="text" placeholder="Search..." className="search_box" />
                    <span className="nav_image">
                        <img src="images/profile.jpg" alt="logo_img" />
                    </span>
                </nav>
            </>
        );
    };

}