import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sigin from './Sigin'
import Signup from './Signup'
import { useUserContext } from '../context/UserContex'
import { axiosClient } from '../../api/axios'
import { Dashboard_ROUTE } from '../router'

function Header() {
    const { autenticated, logout, setUser, User } = useUserContext()
    const navigate = useNavigate()

    const adminPhoneNumber = '+212691160668'; // Replace this with your admin's phone number

    const handleClick = () => {
        const message = encodeURIComponent(); // You can customize this message
        window.open(`https://wa.me/${adminPhoneNumber}?text=${message}`, '_blank');
    };


    const logoutt = async () => {
        await axiosClient.post('/api/logout').then(() => {
            logout()
            navigate('/')

        })
    }

    useEffect(() => {
        if (autenticated) {
            axiosClient.get('/api/client').then(
                ({ data }) => {
                    setUser(data);
                }
            )
        }

    }, [autenticated])



    return (
        <>

            {/* <!-- top-header --> */}

            {autenticated ?
                <div className="header-most-top">
                    <p> Hi  {User.name} </p>
                </div> : ''}

            {/* <!-- //top-header --> */}
            {/* header-bot*/}
            <div className="header-bot">
                <div className="header-bot_inner_wthreeinfo_header_mid">
                    {/* header-bot*/}
                    <div className="col-md-4 logo_agile">
                        <h1>
                            <Link to={'/'}>
                                <span>A</span>dmin
                                <span>M</span>aktab
                                <img src="images/logo.jpg" alt=" " style={{width:'50px',height:'50px'}}/>
                            </Link>
                        </h1>
                    </div>
                    {/* header-bot */}
                    <div className="col-md-8 header">
                        {/* header lists */}
                        <ul>
                            <li>
                                <a className="play-icon popup-with-zoom-anim" href="#small-dialog1">
                                    <span className="fa fa-map-marker" aria-hidden="true"></span> Shop Locator</a>
                            </li>
                            <li>
                                <a href="#" data-toggle="modal" data-target="#myModal1">
                                    <span className="fa fa-truck" aria-hidden="true"></span>Track Order</a>
                            </li>
                            <li>
                                <span className="fa fa-phone" aria-hidden="true" onClick={handleClick}></span> 001 234 5678
                            </li>
                            {autenticated
                                ? <>
                                    <li>
                                        <a onClick={logoutt} >
                                            <span className="fa fa-sign-out" aria-hidden="true"></span>Logout
                                        </a>
                                    </li>
                                    <li>
                                        <Link to={Dashboard_ROUTE}>
                                            <span className="fa fa-pencil-square-o" aria-hidden="true"></span> Dashboard
                                        </Link>
                                    </li>
                                </>
                                : <>
                                    <li>
                                        <a href="#" data-toggle="modal" data-target="#myModal1">
                                            <span className="fa fa-unlock-alt" aria-hidden="true"></span> Sign In </a>
                                    </li>
                                    <li>
                                        <a href="#" data-toggle="modal" data-target="#myModal2">
                                            <span className="fa fa-pencil-square-o" aria-hidden="true"></span> Sign Up </a>
                                    </li>
                                </>
                            }



                        </ul>

                        {/* //header lists */}
                        {/* search */}

                        {/* //search */}
                        {/* cart details */}

                        {/* //cart details */}
                        <div className="clearfix"></div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div >
            {/* shop locator (popup) */}
            {/* Button trigger modal(shop-locator) */}
            <div id="small-dialog1" className="mfp-hide">
                <div className="select-city">
                    <h3>Please Select Your Location</h3>

                    <div className="clearfix"></div>
                </div>
            </div>
            {/* //shop locator (popup) */}
            {/* signin Model */}
            {/* Modal1 Sign In */}
            <div className="modal fade" id="myModal1" tabIndex="-1" role="dialog">
                <Sigin />
            </div>
            {/* //Modal1 */}
            {/* //signin Model */}
            {/* signup Model */}
            {/* Modal2 Sign Up */}
            <div className="modal fade" id="myModal2" tabIndex="-1" role="dialog">
                <Signup />
            </div>
            {/* //Modal2 */}
            {/* //signup Model */}
            {/* //header-bot */}

        </>
    )
}

export default Header