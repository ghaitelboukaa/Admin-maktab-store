import React from 'react'

export default function About() {

    const videoStyle = {
        width: '100%', // Adjust width as needed
        height: 'auto', // Adjust height as needed
        borderRadius: '10px', // Add border radius for rounded corners
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Add shadow for a visual effect
    };
    return (
        <div>

<div className="page-head_agile_info_w3l">

</div>
            {/* welcome */}
            <div className="welcome">
                <div className="container">
                    {/* tittle heading */}
                    <h3 className="tittle-w3l">Welcome to our Site
                        <span className="heading-style">
                            <i></i>
                            <i></i>
                            <i></i>
                        </span>
                    </h3>
                    {/* //tittle heading */}
                    <div className="w3l-welcome-info">
                        <div className="col-sm-6 col-xs-6 welcome-grids">
                            <div className="welcome-img">
                                <img src="images/about5.jpg"  className="img-responsive zoom-img" alt="" />
                            </div>
                        </div>
                        <div className="col-sm-6 col-xs-6 welcome-grids">
                            <div className="welcome-img">
                                <img src="images/about6.jpg"  className="img-responsive zoom-img" alt="" />
                            </div>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                    <div className="w3l-welcome-text">
                        <p> </p>
                        <p> </p>
                    </div>
                </div>
            </div>
            {/* //welcome */}
            {/* <!-- video --> */}
            <div className="about">
                <div className="container">
                    {/* <!-- tittle heading --> */}
                    <h3 className="tittle-w3l">Our Video
                        <span className="heading-style">
                            <i></i>
                            <i></i>
                            <i></i>
                        </span>
                    </h3>
                    {/* <!-- //tittle heading --> */}
                    <div className="about-tp">
                        <div className="col-md-8 about-agileits-w3layouts-left">
                            <video controls src="/videos/video1.mp4" style={videoStyle}></video>
                        </div>
                        <div className="col-md-4 about-agileits-w3layouts-right">
                            <div className="img-video-about">
                                <img src="images/videoimg2.png" alt="" />
                            </div>
                            <h4>Grocery Shoppy</h4>
                            <p>No.1 Leading E-commerce marketplace with over 7000  Products</p>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
            {/* <!-- //video--> */}
        </div>
    )
}
