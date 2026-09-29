import React from 'react'

function Footer() {
	return (
		<>
			<footer>
				<div className="container">
					{/* footer first section */}
					{/* <p className="footer-main">
				<span>"Grocery Shoppy"</span> Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
				magni dolores eos qui ratione voluptatem sequi nesciunt.Sed ut perspiciatis unde omnis iste natus error sit voluptatem
				accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
				beatae vitae dicta sunt explicabo.</p> */}
					{/* //footer first section */}
					{/* footer second section */}
					<div className="w3l-grids-footer">
						<div className="col-xs-4 offer-footer">
							<div className="col-xs-4 icon-fot">
								<span className="fa fa-map-marker" aria-hidden="true"></span>
							</div>
							<div className="col-xs-8 text-form-footer">
								<h3>Track Your Order</h3>
							</div>
							<div className="clearfix"></div>
						</div>
						<div className="col-xs-4 offer-footer">
							<div className="col-xs-4 icon-fot">
								<span className="fa fa-refresh" aria-hidden="true"></span>
							</div>
							<div className="col-xs-8 text-form-footer">
								<h3>Free & Easy Returns</h3>
							</div>
							<div className="clearfix"></div>
						</div>
						<div className="col-xs-4 offer-footer">
							<div className="col-xs-4 icon-fot">
								<span className="fa fa-times" aria-hidden="true"></span>
							</div>
							<div className="col-xs-8 text-form-footer">
								<h3>Online cancellation </h3>
							</div>
							<div className="clearfix"></div>
						</div>
						<div className="clearfix"></div>
					</div>
					{/* //footer second section */}
					{/* footer third section */}
					<div className="footer-info w3-agileits-info">
						{/* footer categories */}
						<div className="col-sm-5 address-right">
							<div className="col-xs-6 footer-grids">
								<h3>Categories</h3>
								<ul>
									<li>
										<a href="/shop">Book</a>
									</li>
									<li>
										<a href="/shop">NoteBook</a>
									</li>

								</ul>
							</div>
							<div className="col-xs-6 footer-grids agile-secomk">
								<ul>
									<li>
										<a href="/shop">school supplies</a>
									</li>
									<li>
										<a href="/shop"> & </a>
									</li>
								</ul>
							</div>
							<div className="clearfix"></div>
						</div>
						{/* //footer categories */}
						{/* quick links */}
						<div className="col-sm-5 address-right">
							<div className="col-xs-6 footer-grids">
								<h3>Quick Links</h3>
								<ul>
									<li>
										<a href="/about">About Us</a>
									</li>
									<li>
										<a href="/contact">Contact Us</a>
									</li>
									<li>
										<a href="help.html">Help</a>
									</li>
									{/* <li>
								<a href="faqs.html">Faqs</a>
							</li>
							<li>
								<a href="terms.html">Terms of use</a>
							</li>
							<li>
								<a href="privacy.html">Privacy Policy</a>
							</li> */}
								</ul>
							</div>
							<div className="col-xs-6 footer-grids">
								<h3>Get in Touch</h3>
								<ul>
									<li>
										<i className="fa fa-map-marker"></i> 123 Sebastian, USA.</li>
									<li>
										<i className="fa fa-mobile"></i> 333 222 3333 </li>
									<li>
										<i className="fa fa-phone"></i> +222 11 4444 </li>
									<li>
										<i className="fa fa-envelope-o"></i>
										<a href="mailto:example@mail.com"> mail@example.com</a>
									</li>
								</ul>
							</div>
						</div>
						{/* //quick links */}
						{/* social icons */}
						<div className="col-sm-2 footer-grids  w3l-socialmk">
							<h3>Follow Us on</h3>
							<div className="social">
								<ul>
									<li>
										<a className="icon fb" href="#">
											<i className="fa fa-facebook"></i>
										</a>
									</li>
									<li>
										<a className="icon tw" href="#">
											<i className="fa fa-twitter"></i>
										</a>
									</li>
									<li>
										<a className="icon gp" href="#">
											<i className="fa fa-google-plus"></i>
										</a>
									</li>
								</ul>
							</div>
							<div className="agileits_app-devices">
								<h5>Download the App</h5>
								<a href="#">
									<img src="images/1.png" alt="" />
								</a>
								<a href="#">
									<img src="images/2.png" alt="" />
								</a>
								<div className="clearfix"> </div>
							</div>
						</div>
						{/* //social icons */}
						<div className="clearfix"></div>
					</div>
					{/* //footer third section */}
					{/* footer fourth section (text) */}
					<div className="agile-sometext">
						<div className="sub-some">
							<h5>Library Online Services in Morocco</h5>
							<p>Access online. Explore a vast collection of books, e-books, journals, and digital resources from the comfort of your home, available across Morocco. Enjoy an extensive selection from bestsellers to academic texts, with authors like Tahar Ben Jelloun, Fatema Mernissi, Driss Chraïbi, and more.</p>
						</div>
						<div className="sub-some">
							<h5>Utilize our online library with the best resources & benefits</h5>
							<p>NNow enjoy up to 40% off on membership plans and access to premium content listed on our offer page. The collection includes Fiction, Non-Fiction, Academic Resources, Children's Books, Magazines, and Research Papers. Discounts may vary depending on the resource.</p>
						</div>
						{/* brands */}
						<div className="sub-some">
							<h5>Popular Brands</h5>
							<ul>
								<li>
									<a href="/shop">Majid</a>
								</li>
								<li>
									<a href="/shop">Lusine</a>
								</li>
								<li>
									<a href="/shop">Carioca</a>
								</li>
								<li>
									<a href="/shop">Atlas</a>
								</li>
								<li>
									<a href="/shop">Renault</a>
								</li>
								<li>
									<a href="/shop">Bic</a>
								</li>
								<li>
									<a href="/shop">Maped</a>
								</li>
								<li>
									<a href="/shop">Pilot</a>
								</li>
								<li>
									<a href="/shop">Faber-Castell</a>
								</li>
								<li>
									<a href="/shop">Casio</a>
								</li>
								<li>
									<a href="/shop">Canon</a>
								</li>
								<li>
									<a href="/shop">HP</a>
								</li>
								<li>
									<a href="/shop">Dell</a>
								</li>
								<li>
									<a href="/shop">Crayola</a>
								</li>
								<li>
									<a href="/shop">Pentel</a>
								</li>
								<li>
									<a href="/shop">Pritt</a>
								</li>
								<li>
									<a href="/shop">Staedtler</a>
								</li>
								<li>
									<a href="/shop">Stabilo</a>
								</li>
								<li>
									<a href="/shop">Parker</a>
								</li>
								<li>
									<a href="/shop">Lamy</a>
								</li>
								<li>
									<a href="/shop">Pelikan</a>
								</li>
								<li>
									<a href="/shop">Uni-Ball</a>
								</li>
								<li>
									<a href="/shop">Sony</a>
								</li>
								<li>
									<a href="/shop">Samsung</a>
								</li>
								<li>
									<a href="/shop">Brother</a>
								</li>
								<li>
									<a href="/shop">Lenovo</a>
								</li>
								<li>
									<a href="/shop">Lexar</a>
								</li>
							</ul>

						</div>
						{/* //brands */}
						{/* payment */}
						<div className="sub-some child-momu">
							<h5>Payment Method</h5>
							<ul>
								<li>
									<img src="images/pay2.png" alt="" />
								</li>
								<li>
									<img src="images/pay5.png" alt="" />
								</li>
								<li>
									<img src="images/pay1.png" alt="" />
								</li>
								<li>
									<img src="images/pay4.png" alt="" />
								</li>
								<li>
									<img src="images/pay6.png" alt="" />
								</li>
								<li>
									<img src="images/pay3.png" alt="" />
								</li>
								<li>
									<img src="images/pay7.png" alt="" />
								</li>
								<li>
									<img src="images/pay8.png" alt="" />
								</li>
								<li>
									<img src="images/pay9.png" alt="" />
								</li>
							</ul>
						</div>
						{/* //payment */}
					</div>
					{/* //footer fourth section (text) */}
				</div>
			</footer>
		</>
	)
}

export default Footer