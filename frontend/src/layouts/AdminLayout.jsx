import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContex';
import { axiosClient } from '../../api/axios';
// import Sidebar from '../components/Sidebar';

export default function AdminLayout() {


  const { Aautenticated, logoutA, setAdmin, admin } = useUserContext()
  const navigate = useNavigate()
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!Aautenticated) {
      navigate('/admin/login')
    } else {
      axiosClient.get('/api/admin').then(
        ({ data }) => {
          setAdmin(data);
        }
      )

    }
  }, [Aautenticated])


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosClient.get('/api/admin/messages');
        console.log(response.data.messages);
        setUnreadCount(response.data.unreadCount);

      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, []);


  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [isHoverable, setHoverable] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => {
    setSidebarOpen(false);
    setHoverable(true);
  };
  const expandSidebar = () => {
    setSidebarOpen(true);
    setHoverable(false);
  };
  const handleMouseEnter = () => {
    if (isHoverable) setSidebarOpen(true);
  };
  const handleMouseLeave = () => {
    if (isHoverable) setSidebarOpen(false);
  };
  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    console.log(isDarkMode);
  };
  const handleSubmenuClick = (index) => {
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };

  const logouttA = async () => {
    await axiosClient.post('/api/logout').then(() => {
      logoutA()
      navigate('/admin/login')

    })
  }
  return (<>
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

.main {
  padding-top: 85px;
  /* Adjust this value to match the height of your navbar */
  margin-left: 80px;
  /* Other styles */
}

.show_submenu {
  display: block;
}

.submenu {
  display: none;
}

.main.open {
  padding-top: 85px;
  /* Adjust this value to match the height of your navbar */
  margin-left: 280px;
  /* Other styles */
}

:root {
  --white-color: #fff;
  --blue-color: #4070f4;
  --grey-color: #707070;
  --grey-color-light: #aaa;
}

body {
  background-color: #e7f2fd;
  transition: all 0.5s ease;
}

// body.dark {
//   // background-color: red;
//   transition: all 0.5s ease;
// }


/* Dark mode specific styles */
.bodyAdmin.dark .navbarAdmin,
.bodyAdmin.dark .sidebar,
.bodyAdmin.dark .bottom {
  background-color: #444;
  color: var(--grey-color);
}

.bodyAdmin.dark .navbarAdmin_content i,
.bodyAdmin.dark .navlink_icon,
.bodyAdmin.dark .submenu_item .arrow-left,
.bodyAdmin.dark .bottom i {
  color: var(--grey-color);
}

.bodyAdmin.dark .search_bar input {
  background-color: #555;
  color: var(--grey-color);
  border: 1px solid #666;
}

.bodyAdmin.dark .nav_link {
  color: var(--grey-color);
}

.bodyAdmin.dark .nav_link:hover {
  color: var(--white-color);
}

.bodyAdmin.dark .submenu .sublink {
  color: var(--grey-color);
}

.bodyAdmin.dark .navlink_icon:hover,
.bodyAdmin.dark .nav_link:hover {
  background: #555;
}

.bodyAdmin.dark .sidebar .menu_title::before,
.bodyAdmin.dark .sidebar.close .menu_title::before {
  background: #666;
}

.bodyAdmin.dark {
  background-color: #333;
}

.bodyAdmin.dark {
  --white-color: #333;
  --blue-color: #fff;
  --grey-color: #f2f2f2;
  --grey-color-light: #aaa;
}

/* navbarAdmin */
.navbarAdmin {
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  background-color: var(--white-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  z-index: 1000;
  box-shadow: 0 0 2px var(--grey-color-light);
}

.logo_item {
  display: flex;
  align-items: center;
  column-gap: 10px;
  font-size: 22px;
  font-weight: 500;
  color: var(--blue);
}

.navbarAdmin img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.search_bar {
  height: 47px;
  max-width: 430px;
  width: 100%;
}

.search_bar input {
  height: 100%;
  width: 100%;
  border-radius: 25px;
  font-size: 18px;
  outline: none;
  background-color: var(--white-color);
  color: var(--grey-color);
  border: 1px solid var(--grey-color-light);
  padding: 0 20px;
}

.navbarAdmin_content {
  display: flex;
  align-items: center;
  column-gap: 25px;
}

.navbarAdmin_content i {
  cursor: pointer;
  font-size: 20px;
  color: var(--grey-color);
}

/* sidebar */
.sidebar {
  background-color: var(--white-color);
  width: 260px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  padding: 80px 20px;
  z-index: 100;
  overflow-y: scroll;
  box-shadow: 0 0 1px var(--grey-color-light);
  transition: all 0.5s ease;
}

.sidebar.close {
  padding: 60px 0;
  width: 80px;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.menu_content {
  position: relative;
}

.menu_title {
  margin: 15px 0;
  padding: 0 20px;
  font-size: 18px;
}

.sidebar.close .menu_title {
  padding: 6px 30px;
}

.menu_title::before {
  color: var(--grey-color);
  white-space: nowrap;
}

.menu_dahsboard::before {
  content: "Dashboard";
}

.menu_editor::before {
  content: "Editor";
}

.menu_setting::before {
  content: "Setting";
}

.sidebar.close .menu_title::before {
  content: "";
  position: absolute;
  height: 2px;
  width: 18px;
  border-radius: 12px;
  background: var(--grey-color-light);
}

.menu_items {
  padding: 0;
  list-style: none;
}

.navlink_icon {
  position: relative;
  font-size: 22px;
  min-width: 50px;
  line-height: 40px;
  display: inline-block;
  text-align: center;
  border-radius: 6px;
}

.navlink_icon::before {
  content: "";
  position: absolute;
  height: 100%;
  width: calc(100% + 100px);
  left: -20px;
}

.navlink_icon:hover {
  background: var(--blue);
}

.sidebar .nav_link {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 15px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--grey-color);
  white-space: nowrap;
}

.sidebar.close .navlink {
  display: none;
}

.nav_link:hover {
  color: var(--white-color);
  background: var(--blue);
}

.sidebar.close .nav_link:hover {
  background: var(--white-color);
}

.submenu_item {
  cursor: pointer;
}

.submenu {
  display: none;
}

.submenu_item .arrow-left {
  position: absolute;
  right: 10px;
  display: inline-block;
  margin-right: auto;
}

.sidebar.close .submenu {
  display: none;
}

.show_submenu~.submenu {
  display: block;
}

.show_submenu .arrow-left {
  transform: rotate(90deg);
}

.submenu .sublink {
  padding: 15px 15px 15px 52px;
}

.bottom_content {
  position: fixed;
  bottom: 60px;
  left: 0;
  width: 260px;
  cursor: pointer;
  transition: all 0.5s ease;
}

.bottom {
  position: absolute;
  display: flex;
  align-items: center;
  left: 0;
  justify-content: space-around;
  padding: 18px 0;
  text-align: center;
  width: 100%;
  color: var(--grey-color);
  border-top: 1px solid var(--grey-color-light);
  background-color: var(--white-color);
}

.bottom i {
  font-size: 20px;
}

.bottom span {
  font-size: 18px;
}

.sidebar.close .bottom_content {
  width: 50px;
  left: 15px;
}

.sidebar.close .bottom span {
  display: none;
}

.sidebar.hoverable .collapse_sidebar {
  display: none;
}

#sidebarOpen {
  display: none;
}

@media screen and (max-width: 768px) {
  #sidebarOpen {
    font-size: 25px;
    display: block;
    margin-right: 10px;
    cursor: pointer;
    color: var(--grey-color);
  }

  .main {
    padding-top: 85px;
    /* Adjust this value to match the height of your navbar */
    margin-left: 20px;
    /* Other styles */
  }

  .main.open {
    display: none;
  }


  .sidebar.close {
    left: -100%;
  }

  .search_bar {
    display: none;
  }

  .sidebar.close .bottom_content {
    left: -100%;
  }
} 
.notification_icon {
  position: relative;
  display: inline-block;
}

.notification_icon .badge {
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 3px 8px;
  border-radius: 50%;
  background: red;
  color: white;
  font-size: 12px;
}

   `}
    </style>
    <div className={`bodyAdmin ${isDarkMode ? 'dark' : ''}`}>
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        toggleSidebar={toggleSidebar}
        admin={admin}
        unreadCount={unreadCount}
      />
      <main className={`main ${isSidebarOpen ? 'open' : ''} `} >
        {/* <main className='main'> */}
        <Outlet />

      </main>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isHoverable={isHoverable}
        closeSidebar={closeSidebar}
        expandSidebar={expandSidebar}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        openSubmenuIndex={openSubmenuIndex}
        handleSubmenuClick={handleSubmenuClick}
        logouttA={logouttA}
      />


    </div >
  </>);
};

const Navbar = ({ isDarkMode, toggleDarkMode, toggleSidebar, admin, unreadCount }) => (
  <nav className="navbarAdmin">
    <div className="logo_item">
      <i className='fa fa-bars' id="sidebarOpen" onClick={toggleSidebar}></i>
      <img src="/images/logo.jpg" alt="Logo" /> AdminMaktab
    </div>

    <div className="navbarAdmin_content">
      <div className="notification_icon">
        <i className="fa fa-bell">
          {unreadCount > 0 && (
            <span className="badge">{unreadCount}</span>
          )}
        </i>
      </div>
      <i
        className={`fa ${isDarkMode ? ' fa-circle' : ' fa-moon-o'}`}
        id="darkLight"
        onClick={toggleDarkMode}
      ></i>
      {/* <i className="bx bx-bell"></i> */}
      <img src={admin.image} alt="Profile" className="profile" />
    </div>
  </nav>
);

const Sidebar = ({
  isSidebarOpen,
  isHoverable,
  closeSidebar,
  expandSidebar,
  handleMouseEnter,
  handleMouseLeave,
  openSubmenuIndex,
  handleSubmenuClick,
  logouttA,
}) => (
  <nav
    className={`sidebar ${isSidebarOpen ? '' : 'close'} ${isHoverable ? 'hoverable' : ''
      }`}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <div className="menu_content">
      {/* <ul className="menu_items">
                <SidebarItem
                    title="Home"
                    icon="fa  fa-home"
                    submenuItems={['Nav Sub Link', 'Nav Sub Link', 'Nav Sub Link', 'Nav Sub Link']}
                    isOpen={openSubmenuIndex === 0}
                    onClick={() => handleSubmenuClick(0)}
                />
                <SidebarItem
                    title="Overview"
                    icon="bx bx-grid-alt"
                    submenuItems={['Nav Sub Link', 'Nav Sub Link', 'Nav Sub Link', 'Nav Sub Link']}
                    isOpen={openSubmenuIndex === 1}
                    onClick={() => handleSubmenuClick(1)}
                />
            </ul> */}
      <ul className="menu_items">
        <SidebarLink link={'/admin'} title="Home" icon="fa  fa-home" />
        <SidebarLink link={'/admin/product'} title="Products" icon="fa fa-rub" />
        <SidebarLink link={'/admin/message'} title="Message" icon="fa fa-envelope-o" />
        <SidebarLink link={'/admin/profile'} title="Profile" icon="fa fa-user-circle-o" />
        <SidebarLink link={'/admin/specialOffers'} title="Special Offers" icon="fa fa-gift" />
        <SidebarLink link={'/admin/allList'} title="Lists" icon="fa  fa-list-alt " />
        <SidebarLink link={'/admin/Orders'} title="Orders" icon="fa fa-shopping-cart " />
      </ul>
      {/* <ul className="menu_items">
                <SidebarLink title="Notice board" icon="bx bx-flag" />
                <SidebarLink title="Award" icon="bx bx-medal" />
                <SidebarLink title="Setting" icon="bx bx-cog" />
                <SidebarLink title="Features" icon="bx bx-layer" />
            </ul> */}
      <div className="bottom_content">
        {/* <SidebarLink title="Features" icon="bx bx-layer" /> */}

        <a className="nav_link" onClick={logouttA} style={{}} >
          <span className="navlink_icon">
            <i className='fa fa-power-off'></i>
          </span>
          <span className="navlink">Logout</span>
        </a>


        <div className="bottom expand_sidebar" onClick={expandSidebar}>
          <span> Expand</span>
          <i className="fa fa-hand-o-right"></i>
        </div>
        <div className="bottom collapse_sidebar" onClick={closeSidebar}>
          <span> Collapse</span>
          <i className="fa  fa-hand-o-left"></i>
        </div>
      </div>
    </div>
  </nav>


);

const SidebarItem = ({ title, icon, submenuItems, isOpen, onClick }) => (
  // <li className="item">
  //     <div className="nav_link submenu_item" onClick={onClick}>
  //         <span className="navlink_icon">
  //             <i className={icon}></i>
  //         </span>
  //         <span className="navlink">{title}</span>
  //         <i className={` fa fa-angle-right arrow-left ${isOpen ? 'open' : ''}`}></i>
  //     </div>
  //     <ul className={`menu_items submenu ${isOpen ? 'show_submenu' : ''}`}>
  //         {submenuItems.map((subitem, index) => (
  //             <a href="/" className="nav_link sublink" key={index}>
  //                 {subitem}
  //             </a>
  //         ))}
  //     </ul>
  // </li>
  <li className="item">
    <div className="nav_link submenu_item" onClick={onClick}>
      <span className="navlink_icon">
        <i className={icon}></i>
      </span>
      <span className="navlink">{title}</span>
      <i className={`fa fa-angle-right arrow-left ${isOpen ? 'open' : ''}`}></i>
    </div>
    <ul className={`menu_items submenu ${isOpen ? 'show_submenu' : ''}`}>
      {submenuItems.map((subitem, index) => (
        <li key={index}>
          <Link to="#" className="nav_link sublink">
            {subitem}
          </Link>
        </li>
      ))}
    </ul>
  </li>
);

const SidebarLink = ({ title, icon, link }) => (
  <li className="item">
    <Link to={link} className="nav_link">
      <span className="navlink_icon">
        <i className={icon}></i>
      </span>
      <span className="navlink">{title}</span>
    </Link>
  </li>
);





