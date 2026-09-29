import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProductContext } from '../context/ProductContext'
import { axiosClient } from '../../api/axios';
import { useUserContext } from '../context/UserContex';

export default function chekout() {

    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');

    const { products, setProducts, updateQuantity, removeProduct, getTotalPrice, setOrderSend } = useProductContext()
    const { autenticated, User } = useUserContext()


    const IncreaseQuantity = (id) => {
        const newQuantity = products.find((product) => product.id === id).quantity + 1;
        updateQuantity(id, newQuantity);
    };

    const DecreaseQuantity = (id) => {
        const newQuantity = Math.max(products.find((product) => product.id === id).quantity - 1, 0);
        updateQuantity(id, newQuantity);
    };

    const Remove = (id) => {
        removeProduct(id)
    }
    // console.log( products.length);

    const getProductCount = () => {
        return products.length;
    };


    // ----------------------------submitOrder----------------------------//


    const [formData, setFormData] = useState({
        full_name: User.name ? User.name : '',
        mobile_number: '',
        shipping_city: '',
        shipping_address: '',
        address_type: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }



    const Submit = async (e, payment_method) => {
        e.preventDefault();
        var total_amount = getTotalPrice();
        const dataToSend = {
            ...formData,
            products,
            total_amount,
            payment_method: payment_method,
            // payment_status: 'pending',
        };

        console.log(dataToSend);

        try {
            const response = await axiosClient.post('/api/orders', dataToSend);
            console.log('Order submitted successfully', response.data);
            console.log(response.data.order.id);
            setOrderSend(response.data.order.id)
            setMessage(response.data.message);
            $('#myModal3').modal('show');
        } catch (error) {
            console.error('Error submitting order', error);
            if (error.response.status === 422 || error.response.status === 400  ) {
                console.log(error.response.data.errors);
                setErrors(error.response.data.message);

            } else {
                setErrors('error');
            }
            $('#myModal4').modal('show');
        }
    }

    return (

        <div>

            <div className="page-head_agile_info_w3l">

            </div>

            <div className="privacy">
                <div className="container">
                    {/* <!-- tittle heading --> */}
                    <h3 className="tittle-w3l">Checkout
                        <span className="heading-style">
                            <i></i>
                            <i></i>
                            <i></i>
                        </span>
                    </h3>
                    {/* <!-- //tittle heading --> */}
                    <div className="checkout-right">
                        <h4>Your shopping cart contains:
                            <span>{getProductCount() ? getProductCount() : 0} Products</span>
                        </h4>
                        <div className="table-responsive">
                            <table className="timetable_sub">
                                <thead>
                                    <tr>
                                        <th>SL No.</th>
                                        <th>Product</th>
                                        <th>Quality</th>
                                        <th>Product Name</th>

                                        <th>Price</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr className="rem1" key={product.num} >
                                            <td className="invert">{product.num}</td>
                                            <td className="invert-image">
                                                <Link to={`/single/${product.id}`} href="single2.html">
                                                    {/* <img src={product.image} alt=" " className="img-responsive" /> */}
                                                    <img src={product.image} alt="" style={{ width: '150px', height: '150px' }} />
                                                </Link>
                                            </td>
                                            <td className="invert">
                                                <div className="quantity">
                                                    <div className="quantity-select">
                                                        <div className="entry value-minus" onClick={() => DecreaseQuantity(product.id)}></div>
                                                        <div className="entry value">
                                                            <span >{product.quantity}</span>
                                                        </div>
                                                        <div className="entry value-plus active" onClick={() => IncreaseQuantity(product.id)}>
                                                            {/* <button onClick={()=>IncreaseQuantity(product.num)}></button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="invert">{product.name}</td>
                                            <td className="invert">{product.price}</td>
                                            <td className="invert">
                                                <div className="rem">
                                                    <div className="close1" onClick={() => Remove(product.id)}> </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>

                                        <td colSpan={6}> somme : {getTotalPrice()}</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="checkout-left">
                        <div className="address_form_agile">
                            <h4>Add a new Details</h4>
                            <form>
                                <div className="creditly-wrapper wthree, w3_agileits_wrapper">
                                    <div className="information-wrapper">
                                        <div className="first-row">
                                            <div className="controls">
                                                <input className="billing-address-name" type="text" name="full_name" placeholder="Full Name" required="" value={formData.full_name}
                                                    onChange={handleChange} />
                                            </div>
                                            <div className="w3_agileits_card_number_grids">
                                                <div className="w3_agileits_card_number_grid_left">
                                                    <div className="controls">
                                                        <input type="text" placeholder="Mobile Number" name="mobile_number" required="" value={formData.mobile_number}
                                                            onChange={handleChange} />
                                                    </div>
                                                </div>
                                                {/* <div className="w3_agileits_card_number_grid_right">
                                                    <div className="controls">
                                                        <input type="text" placeholder="Landmark" name="landmark" required="" />
                                                    </div>
                                                </div> */}
                                                <div className="clear"> </div>
                                            </div>
                                            <div className="controls">
                                                <input type="text" placeholder="Town/City" name="shipping_city" required="" value={formData.shipping_city}
                                                    onChange={handleChange} />
                                            </div>
                                            <div className="controls">
                                                <input type="text" placeholder="shipping_address" name="shipping_address" required="" value={formData.shipping_address}
                                                    onChange={handleChange} />
                                            </div>
                                            <div className="controls">
                                                <select className="option-w3ls">
                                                    <option>Select Address type</option>
                                                    <option>Office</option>
                                                    <option>Home</option>
                                                    <option>Commercial</option>

                                                </select>
                                            </div>
                                        </div>
                                        {!autenticated ? <a href="#" data-toggle="modal" data-target="#myModal1"><button className="submit check_out" >Delivery to this Address</button></a> :
                                            <button className="submit check_out" onClick={(e) => Submit(e, 'cod')}>Delivery to this Address  (COD)</button>}
                                    </div>
                                </div>
                            </form>
                            {/* <div className="checkout-right-basket">
                                <button onClick={(e) => Submit(e, 'Online')}>Make a Payment Online
                                    <span className="fa fa-hand-o-right" aria-hidden="true"></span>
                                </button>
                            </div> */}
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                </div>
            </div>

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



