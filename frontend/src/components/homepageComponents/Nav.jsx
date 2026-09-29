import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {

	const location = useLocation();
	return (
		<div>
			<div className="ban-top">
				<div className="container">
					<div className="top_nav_right">
						<Link to={'/chekout'}><button className="w3view-cart" type="submit" name="submit" value="">
							<i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
						</button>
						</Link>
					</div>
					{/* <div className="agileits-navi_search">
						<form action="#" method="post">
							<select id="agileinfo-nav_search" name="agileinfo_search" required="">
								<option value="">All Categories</option>
								<option value=""></option>
								<option value=""></option>
								<option value=""></option>
								<option value=""> </option>

							</select>
						</form>
					</div> */}

					<div className="top_nav_left">
						<nav className="navbar navbar-default">
							<div className="container-fluid">
								{/* Brand and toggle get grouped for better mobile display */}
								<div className="navbar-header">
									<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
										aria-expanded="false">
										<span className="sr-only">Toggle navigation</span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
									</button>
								</div>
								{/* Collect the nav links, forms, and other content for toggling */}
								<div className="collapse navbar-collapse menu--shylock" id="bs-example-navbar-collapse-1">
									<ul className="nav navbar-nav menu__list">
										<li className={location.pathname === '/' ? 'active' : ''}>
											<Link className="nav-stylehead" to="/">
												Home
												{location.pathname === '/' && <span className="sr-only">(current)</span>}
											</Link>
										</li>
										<li className={location.pathname === '/about' ? '' : ''}>
											<Link className="nav-stylehead" to="/about">
												About Us
											</Link>
										</li>
										<li className={location.pathname === '/shop' ? 'active' : ''}>
											<Link to="/shop" className="nav-stylehead">
												Shop now
											</Link>
										</li>
										<li className={location.pathname === '/list' ? 'active' : ''}>
											<Link className="nav-stylehead" to="/list">
												Lists
											</Link>
										</li>
										<li className={location.pathname === '/contact' ? 'active' : ''}>
											<Link className="nav-stylehead" to="/contact">
												Contact
											</Link>
										</li>
										{/* <li className="active">
											<Link className="nav-stylehead" to={'/'}>Home
												<span className="sr-only">(current)</span>
											</Link>
										</li>
										<li className="">
											<Link className="nav-stylehead" to={'/about'} href="about.html">About Us</Link>
										</li>
										<li className="">
											<Link href="#" to={'/shop'} className="nav-stylehead">Shop now</Link>

										</li>

										<li className="">
											<Link className="nav-stylehead" href="faqs.html">Faqs</Link>
										</li>

										<li className="">
											<Link className="nav-stylehead" to={'/contact'} href="contact.html">Contact</Link>
										</li> */}
										{/* <li className="dropdown">
											<Link className="nav-stylehead dropdown-toggle" href="#" data-toggle="dropdown">Pages
												<b className="caret"></b>
											</Link>
											<ul className="dropdown-menu agile_short_dropdown">
												<li>
													<Link href="icons.html">Web Icons</Link>
												</li>
												<li>
													<Link href="typography.html">Typography</Link>
												</li>
											</ul>
										</li> */}
										{/* <li className="dropdown">
											<Link href="#" className="dropdown-toggle nav-stylehead" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Household
												<span className="caret"></span>
											</Link>
											<ul className="dropdown-menu multi-column columns-3">
												<div className="agile_inner_drop_nav_info">
													<div className="col-sm-6 multi-gd-img">
														<ul className="multi-column-dropdown">
															<li>
																<Link href="product2.html">Kitchen & Dining</Link>
															</li>
															<li>
																<Link href="product2.html">Detergents</Link>
															</li>
															<li>
																<Link href="product2.html">Utensil Cleaners</Link>
															</li>
															<li>
																<Link href="product2.html">Floor & Other Cleaners</Link>
															</li>
															<li>
																<Link href="product2.html">Disposables, Garbage Bag</Link>
															</li>
															<li>
																<Link href="product2.html">Repellents & Fresheners</Link>
															</li>
															<li>
																<Link href="product2.html"> Dishwash</Link>
															</li>
														</ul>
													</div>
													<div className="col-sm-6 multi-gd-img">
														<ul className="multi-column-dropdown">
															<li>
																<Link href="product2.html">Pet Care</Link>
															</li>
															<li>
																<Link href="product2.html">Cleaning Accessories</Link>
															</li>
															<li>
																<Link href="product2.html">Pooja Needs</Link>
															</li>
															<li>
																<Link href="product2.html">Crackers</Link>
															</li>
															<li>
																<Link href="product2.html">Festive Decoratives</Link>
															</li>
															<li>
																<Link href="product2.html">Plasticware</Link>
															</li>
															<li>
																<Link href="product2.html">Home Care</Link>
															</li>
														</ul>
													</div>
													<div className="clearfix"></div>
												</div>
											</ul>
										</li> */}
									</ul>
								</div>
							</div>
						</nav>
					</div>


				</div>
			</div>
		</div>
	)
}
