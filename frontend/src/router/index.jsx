import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Layout from "../layouts/Layout";
import Single from "../pages/Single";
import Chekout from "../pages/chekout";
import Ex from "../pages/Ex";
import DashboardLayout from "../layouts/DashboardLayout";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLayout from "../layouts/AdminLayout";
import Product from "../pages/admin/Product";
import EditProduct from "../pages/admin/EditProduct";
import AddProduct from "../pages/admin/AddProduct";
import Profile from "../pages/admin/Profile";
import LoginAdmin from "../pages/admin/Auth/LoginAdmin";
import CategoryProduct from "../pages/admin/CategoryProduct";
import Payment from "../pages/Payment";
import AdminLayout2 from "../layouts/AdminLayout2";
import Orders from "../pages/admin/Orders";
import SpecialOffers from "../components/homepageComponents/SpecialOffers";
import SpecialOffersAdmmin from "../pages/admin/SpecialOffersAdmin";
import Flexisel from "../components/Flexisel";
import About from "../pages/About";
import Category from "../pages/admin/Category";
import Contact from "../pages/Contact";
import Lists from "../pages/admin/Lists";
import ProductList from "../pages/ProductList";
import AllLists from "../pages/admin/AllLists";
import Message from "../pages/admin/Message";

export const Dashboard_ROUTE = '/dashboard'
export const Admin_ROUTE = '/admin'

export const router = createBrowserRouter([

    {

        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />

            },
            {
                path: '/shop',
                element: <Shop />

            },
            {
                path: '/single/:productId',
                element: <Single />

            },
            {
                path: '/chekout',
                element: <Chekout />

            },
            {
                path: '/payment',
                element: <Payment />

            },
            {
                path: '/about',
                element: <About />

            },
            {
                path: '/contact',
                element: <Contact />

            },
            {
                path: '/list',
                element: <ProductList />

            },
            {
                path: Dashboard_ROUTE,
                element: <UserDashboard />

            },


        ]
    },

    {

        element: <DashboardLayout />,
        children: [
            // {
            //     path: Dashboard_ROUTE,
            //     element: <UserDashboard/>

            // },

        ]
    },


    {

        element: <AdminLayout />,
        children: [

            {
                path: Admin_ROUTE,
                element: <AdminDashboard />

            },

            {
                path: '/admin/product/edit/:productId',
                element: <EditProduct />

            },
            {
                path: '/admin/product/category/:categoryId',
                element: <CategoryProduct />

            },
            {
                path: '/admin/product/add',
                element: <AddProduct />

            },
            {
                path: '/admin/product',
                element: <Product />

            },
            {
                path: '/admin/profile',
                element: <Profile />

            },
            {
                path: '/admin/Orders',
                element: <Orders />

            },
            {
                path: '/admin/list',
                element: <Lists />

            },
            {
                path: '/admin/allList',
                element: <AllLists />

            },
            {
                path: '/admin/category',
                element: <Category />

            },
            {
                path: '/admin/message',
                element: <Message />

            },
            {
                path: '/admin/specialOffers',
                element: <SpecialOffersAdmmin />

            },



        ]
    },

    {
        path: '/admin/login',
        element: <LoginAdmin />

    },
    {
        path: '/Flexisel',
        element: <Flexisel />

    },






])