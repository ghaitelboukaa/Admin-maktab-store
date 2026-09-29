import React from 'react'
import { Link } from 'react-router-dom'

export default function Baner() {
	return (
		<div>
			<div id="myCarousel" className="carousel slide" data-ride="carousel">
				{/* Indicators*/}
				<ol className="carousel-indicators">
					<li data-target="#myCarousel" data-slide-to="0" className=""></li>
					<li data-target="#myCarousel" data-slide-to="1" className=""></li>
					<li data-target="#myCarousel" data-slide-to="2" className=""></li>
					<li data-target="#myCarousel" data-slide-to="3" className=""></li>
				</ol>
				<div className="carousel-inner" role="listbox">
					<div className="item active" >
						<img src="images/banner8.jpg" alt="" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover' }} />
						<div className="container">
							<div className="carousel-caption">
								<h3>New  
									<span> Products</span>
								</h3>
								<p>Get flat
									<span>10%</span> Cashback</p>
								<Link className="button2" to={'/shop'} >Shop Now </Link>
							</div>
						</div>
					</div>
					{/* <div className="item item2"> */}
					<div className="item item2" >
						<img src="images/banner1.jpg" alt="" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover' }} />
						<div className="container">
							<div className="carousel-caption">
								<h3>Healthy
									<span>Saving</span>
								</h3>
								<p>Get Upto
									<span>30%</span> Off</p>
								<Link className="button2" to={'/shop'} >Shop Now </Link>
							</div>
						</div>
					</div>
					{/* <div className="item item3"> */}
					<div className="item item3" >
						<img src="images/banner3.jpg" alt="" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover' }} />
						<div className="container">
							<div className="carousel-caption">
								<h3>Big
									<span>Deal</span>
								</h3>
								<p>Get Best Offer Upto
									<span>20%</span>
								</p>
								<Link className="button2" to={'/shop'} >Shop Now </Link>
							</div>
						</div>
					</div>
					{/* <div className="item item4"> */}
					<div className="item item4" >
						<img src="images/banner6.jpg" alt="" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover' }} />
						<div className="container">
							<div className="carousel-caption">
								<h3>Today
									<span>Discount</span>
								</h3>
								<p>Get Now
									<span>40%</span> Discount</p>
								<Link className="button2" to={'/shop'} >Shop Now </Link>
							</div>
						</div>
					</div>
				</div>
				<a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
					<span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
					<span className="sr-only">Previous</span>
				</a>
				<a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
					<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
					<span className="sr-only">Next</span>
				</a>
			</div>
		</div>
	)
}
