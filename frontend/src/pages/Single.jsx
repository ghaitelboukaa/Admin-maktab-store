import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../api/axios';
import { useParams } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import Ex from './Ex';
import { useUserContext } from '../context/UserContex';
import Sigin from '../components/Sigin';

export default function Single() {

    const { productId } = useParams();
    const [product, setProduct] = useState({});

    const { autenticated } = useUserContext()
    const [rating, setRating] = useState(0);
    const handleRatingChange = (event) => {

        if (!autenticated) {
            console.log('opppps');
            // window.location.href = "#myModal2"
            $('#myModal1').modal('show');
        } else {
            const selectedRating = parseInt(event.target.value);
            setRating(selectedRating);
            console.log(selectedRating);

            axiosClient.post(`/api/products/${productId}/rate`, { rating: selectedRating })
                .then(response => {
                    console.log(response.data);
                    // Update UI to reflect new rating
                })
                .catch(error => {
                    console.error('Error rating product:', error);
                });
        }
    };



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosClient.get(`/api/products/${productId}`);
                console.log(response.data);
                // setProduct(response.data);
                setProduct({
                    id: response.data.id,
                    description: response.data.description,
                    image: response.data.image,
                    name: response.data.name,
                    newprice: response.data.newprice,
                    price: response.data.price,
                    quantity: response.data.quantity,
                    nameCategory: response.data.category.name,
                })
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [productId]);




    const { products, setProducts, addProduct } = useProductContext()
    const [isCartVisible, setIsCartVisible] = useState(false);
    const toggleCartFunction = () => {
        setIsCartVisible(prevIsCartVisible => !prevIsCartVisible);
    };
    const AddToCart = async (id) => {
        // console.log(id);

        try {
            const response = await axiosClient.get(`/api/products/${id}`);
            console.log(response.data);
            // setProduct(response.data);
            const newProduct = {
                id: response.data.id,
                num: products.length + 1, // Generate a unique ID
                name: response.data.name,
                image: response.data.image,
                price: response.data.price,
                newprice: response.data.newprice,
                quantity: 1

            };
            console.log(newProduct);
            addProduct(newProduct)
            setIsCartVisible(true);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };


    if (!product) {
        return <div>Loading...</div>;
    }



    return (
        <>

            <div className="page-head_agile_info_w3l">
            </div>
            <div className="banner-bootom-w3-agileits">
                <div className="container">
                    {/* tittle heading */}
                    <h3 className="tittle-w3l">Single Page
                        <span className="heading-style">
                            <i></i>
                            <i></i>
                            <i></i>
                        </span>
                    </h3>
                    {/* //tittle heading */}
                    <div className="col-md-5 single-right-left ">
                        <div className="grid images_3_of_2">
                            <div className="flexslider">
                                {/* <ul className="slides"> */}
                                {/* <li data-thumb={product.image}> */}
                                <div className="thumb-image">
                                    <img src={product.image} data-imagezoom="true" className="img-responsive" alt="" />
                                </div>

                                {/* </li> */}
                                {/* <li data-thumb="images/si2.jpg">
                                        <div className="thumb-image">
                                            <img src="images/si2.jpg" data-imagezoom="true" className="img-responsive" alt="" />
                                        </div>
                                    </li> */}
                                {/*<li data-thumb="images/si3.jpg">
                                        <div className="thumb-image">
                                            <img src="images/si3.jpg" data-imagezoom="true" className="img-responsive" alt=""/> </div>
                                    </li> */}
                                {/* </ul> */}
                                {/* <div className="clearfix"></div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 single-right-left simpleCart_shelfItem">
                        <h3>{product.name}</h3>
                        {/* {!autenticated ? <a href="#" data-toggle="modal" data-target="#myModal1">
                            <div className="rating1">
                                <span className="starRating">
                                    <input id="rating5" type="radio" name="rating" value="5" onChange={handleRatingChange} />
                                    <label htmlFor="rating5">5</label>
                                    <input id="rating4" type="radio" name="rating" value="4" onChange={handleRatingChange} />
                                    <label htmlFor="rating4">4</label>
                                    <input id="rating3" type="radio" name="rating" value="3" defaultChecked="" onChange={handleRatingChange} />
                                    <label htmlFor="rating3">3</label>
                                    <input id="rating2" type="radio" name="rating" value="2" onChange={handleRatingChange} />
                                    <label htmlFor="rating2">2</label>
                                    <input id="rating1" type="radio" name="rating" value="1" onChange={handleRatingChange} />
                                    <label htmlFor="rating1">1</label>
                                </span>

                            </div>
                        </a>
                            :
                            <div className="rating1">
                                <span className="starRating">
                                    <input id="rating5" type="radio" name="rating" value="5" onChange={handleRatingChange} />
                                    <label htmlFor="rating5">5</label>
                                    <input id="rating4" type="radio" name="rating" value="4" onChange={handleRatingChange} />
                                    <label htmlFor="rating4">4</label>
                                    <input id="rating3" type="radio" name="rating" value="3" defaultChecked="" onChange={handleRatingChange} />
                                    <label htmlFor="rating3">3</label>
                                    <input id="rating2" type="radio" name="rating" value="2" onChange={handleRatingChange} />
                                    <label htmlFor="rating2">2</label>
                                    <input id="rating1" type="radio" name="rating" value="1" onChange={handleRatingChange} />
                                    <label htmlFor="rating1">1</label>
                                </span>

                            </div>} */}



                        <div className="rating1">
                            <span className="starRating">
                                <input id="rating5" type="radio" name="rating" value="5" onChange={handleRatingChange} />
                                <label htmlFor="rating5">5</label>
                                <input id="rating4" type="radio" name="rating" value="4" onChange={handleRatingChange} />
                                <label htmlFor="rating4">4</label>
                                <input id="rating3" type="radio" name="rating" value="3" defaultChecked="" onChange={handleRatingChange} />
                                <label htmlFor="rating3">3</label>
                                <input id="rating2" type="radio" name="rating" value="2" onChange={handleRatingChange} />
                                <label htmlFor="rating2">2</label>
                                <input id="rating1" type="radio" name="rating" value="1" onChange={handleRatingChange} />
                                <label htmlFor="rating1">1</label>
                            </span>

                        </div>
                        {/* <div className="modal fade" id="myModal1" tabIndex="-1" role="dialog">
                            <Sigin />
                        </div> */}
                        <p>
                            {product.newprice ? <><span className="item_price">{product.newprice} DH</span>
                                <del>{product.price} DH</del>
                            </> : <>
                                <span className="item_price">{product.price} DH</span>
                            </>}
                            <label>Free delivery</label>
                        </p>
                        <div className="single-infoagile">
                            <ul>
                                <li>
                                    Cash on Delivery Eligible.
                                </li>
                                <li>
                                    Shipping Speed to Delivery.
                                </li>
                                <li>
                                    Sold and fulfilled by Supple Tek (3.6 out of 5 | 8 ratings).
                                </li>
                                <li>
                                    {/* 1 offer from
                                    <span className="item_price">$950.00</span> */}
                                    {product.description}
                                </li>
                            </ul>
                        </div>
                        <div className="product-single-w3l">
                            <p>
                                <i className="fa fa-hand-o-right" aria-hidden="true"></i>This is a  <label>{product.nameCategory}</label> product.

                            </p>

                            {/* <ul>
                                <li>
                                    Best for Biryani and Pulao.
                                </li>
                                <li>
                                    After cooking, Zeeba Basmati rice grains attain an extra ordinary length of upto 2.4 cm/~1 inch.
                                </li>
                                <li>
                                    Zeeba Basmati rice adheres to the highest food afety standards as your health is paramount to us.
                                </li>
                                <li>
                                    Contains only the best and purest grade of basmati rice grain of Export quality.
                                </li>
                            </ul> */}
                            <p>
                                <i className="fa fa-refresh" aria-hidden="true"></i>
                                All {product.nameCategory} products are {product.nameCategory == 'book' ? <label> non-returnable.</label> : <label> returnable.</label>}
                                {/* {product.category_id === 1 && < >All products are  {product.book.name} <label> non-returnable.</label></>} */}
                            </p>
                        </div>
                        <div className="occasion-cart">
                            <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">

                                <input type="submit" name="submit" value="Add to cart" className="button" onClick={() => AddToCart(product.id)} />

                            </div>
                            <Ex toggleCartFunction={toggleCartFunction} toggleCart={isCartVisible} />

                        </div>

                    </div>
                    <div className="clearfix"> </div>
                </div>


            </div>
        </>
    )
}
