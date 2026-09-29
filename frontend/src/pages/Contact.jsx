import React, { useState } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { axiosClient } from '../../api/axios';
import { useUserContext } from '../context/UserContex';



export default function Contact() {


	const { autenticated, User } = useUserContext()

	const [content, setContent] = useState('');
	const [recipientId, setRecipientId] = useState(1);
	const [subject, setSubject] = useState('');
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await axiosClient.post('/api/messages/send', {
				content,
				recipientId,
				subject
			});

			setMessage(response.data.message);
			$('#myModal3').modal('show');
		} catch (error) {

			if (error.response.status === 422 || error.response.status === 400) {
				console.log(error.response.data.errors);
				setErrors(error.response.data.message);

			} else {
				setErrors('error');
			}
			$('#myModal4').modal('show');
		} finally {
			setLoading(false);
		}
	};
	return (
		<div>
			{/* contact page */}

			<div className="page-head_agile_info_w3l">

			</div>
			<div className="contact-w3l">
				<div className="container">
					{/* tittle heading */}
					<h3 className="tittle-w3l">Contact Us
						<span className="heading-style">
							<i></i>
							<i></i>
							<i></i>
						</span>
					</h3>
					{/* //tittle heading */}
					{/* contact */}
					<div className="contact agileits">
						<div className="contact-agileinfo">
							<div className="contact-form wthree">
								<form>
									{/* <div className="">
										<input type="text" name="name" placeholder="Name" required="" />
									</div> */}
									<div className="">
										<input className="text" type='text' value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" required="" />
									</div>
									{/* <div className="">
										<input className="email" type="email" name="email" placeholder="Email" required="" />
									</div> */}
									<div className="">
										<textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Message content" required=""></textarea>
									</div>


									{!autenticated ? <a href="#" data-toggle="modal" data-target="#myModal1"><input type="submit" value="Submit" disabled={loading} /></a> :
										<input type="submit" value="Submit" disabled={loading} onClick={handleSubmit} />}

								</form>
							</div>
							<div className="contact-right wthree">
								<div className="col-xs-7 contact-text w3-agileits">
									<h4>GET IN TOUCH :</h4>
									<p>
										<i className="fa fa-map-marker"></i> 123 Sebastian, NY 10002, USA.</p>
									<p>
										<i className="fa fa-phone"></i> Telephone : 333 222 3333</p>
									<p>
										<i className="fa fa-fax"></i> FAX : +1 888 888 4444</p>
									<p>
										<i className="fa fa-envelope-o"></i> Email :
										<a href="mailto:example@mail.com">mail@example.com</a>
									</p>
								</div>
								<div className="col-xs-5 contact-agile">
									<img src="images/contact2.jpg" alt="" />
								</div>
								<div className="clearfix"> </div>
							</div>
						</div>
					</div>
					{/* //contact */}
				</div>
			</div>
			{/* map */}
			<div className="map w3layouts">
				<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55565170.29301636!2d-132.08532758867793!3d31.786060306224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited+States!5e0!3m2!1sen!2sin!4v1512365940398"
					allowfullscreen></iframe>

				{/* <LoadScript
					googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" // Replace with your API key
				>
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={center}
						zoom={5}
					>
					</GoogleMap>
				</LoadScript> */}
			</div>
			{/* //map */}


			<div className="modal fade" id="myModal3" tabIndex="-1" role="dialog">
				<div className="modal-dialog" style={{ width: '400px', height: '300px' }}>
					{/* Modal content*/}
					<div className="modal-content" >
						<div className="modal-header" style={{ backgroundColor: 'lightgreen', color: 'white' }}>
							<button type="button" className="close" data-dismiss="modal">&times;</button>
						</div>
						<div className="modal-body modal-body-sub_agile" style={{ color: 'green', textAlign: 'center' }}>
							<i className='glyphicon glyphicon-ok-circle fa-5x'></i>
							<div>{message}</div>
							<div className="clearfix"></div>
						</div>
					</div>
				</div>
			</div>
			<div className="modal fade" id="myModal4" tabIndex="-1" role="dialog">
				<div className="modal-dialog" style={{ width: '400px', height: '300px' }}>
					{/* Modal content*/}
					<div className="modal-content"  >
						<div className="modal-header" style={{ backgroundColor: 'lightcoral', color: 'white' }}>
							<button type="button" className="close" data-dismiss="modal">&times;</button>
						</div>
						<div className="modal-body modal-body-sub_agile" style={{ color: 'red', textAlign: 'center' }}>

							<i className='glyphicon glyphicon-remove-circle fa-5x'></i>
							<div>{errors}</div>
							<div className="clearfix"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
const containerStyle = {
	width: '100%',
	height: '400px'
};

const center = {
	lat: 31.786,
	lng: -132.085
};
