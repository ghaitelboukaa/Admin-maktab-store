
import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../../api/axios';
import { Link } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import Ex from '../../pages/Ex';
import Flexisel from '../Flexisel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';

export default function SpecialOffers() {


    const adminPhoneNumber = '+212691160668'; // Replace this with your admin's phone number

    const handleClick = () => {
        const message = encodeURIComponent(); // You can customize this message
        window.open(`https://wa.me/${adminPhoneNumber}?text=${message}`, '_blank');
    };
    const [specialProducts, setSpecialProducts] = useState([]);
    const [specialProduct1, setSpecialProduct1] = useState(null);
    const [specialProduct2, setSpecialProduct2] = useState(null);
    const [specialProduct3, setSpecialProduct3] = useState(null);
    const [specialProduct4, setSpecialProduct4] = useState(null);


    const fetchSpecialProducts = async () => {
        try {
            const response = await axiosClient.get('/api/get-special-products');
            const specialProducts = response.data;
            setSpecialProducts(response.data);

            console.log('API Response:', response.data); // Log the API response


        } catch (error) {
            console.error('Error fetching special products:', error);
        }
    };
    useEffect(() => {
        fetchSpecialProducts();
    }, []);


    // add to product Cart
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

            addProduct(newProduct)

            setIsCartVisible(true);


        } catch (error) {
            console.error('Error fetching product:', error);
        }






    };


    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };


    return (
        <div>
            {/* special offers */}
            <div className="featured-section" id="projects">
                <div className="container">
                    {/* tittle heading */}
                    <h3 className="tittle-w3l">Special Offers
                        <span className="heading-style">
                            <i></i>
                            <i></i>
                            <i></i>
                        </span>
                    </h3>
                    {/* //tittle heading */}
                    <div className="content-bottom-in">
                        <ul id="flexiselDemo1">




                            <Slider {...settings}>
                                {specialProducts.map(specialProducts => (
                                    <li key={specialProducts.id}>
                                        <div className="w3l-specilamk">
                                            <div className="speioffer-agile">

                                                <a >
                                                    <img src={specialProducts.image} style={{ width: '150px', height: '150px' }} alt="" />
                                                </a>

                                            </div>
                                            <div className="product-name-w3l">
                                                <h4>
                                                    <a href="single.html">{specialProducts.product.name}</a>
                                                </h4>
                                                <div className="w3l-pricehkj">
                                                    <h6>{specialProducts.product.price}</h6>
                                                    <p>{specialProducts.offer}</p>
                                                </div>
                                                {/* <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                                                    <input type="submit" name="submit" value="Add to cart" className="button" onClick={() => AddToCart(specialProducts.product.id)} />
                                                    <Ex toggleCartFunction={toggleCartFunction} toggleCart={isCartVisible} />
                                                </div> */}
                                                <button className="whatsapp-button" onClick={handleClick}>Open WhatsApp</button>
                                            </div>
                                        </div>
                                    </li>))
                                }

                            </Slider>
                            {/* <li>
                                <div className="w3l-specilamk">
                                    <div className="speioffer-agile">
                                        <a href="single.html">
                                            <img src="images/s2.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="product-name-w3l">
                                        <h4>
                                            <a href="single.html">Madhur Pure Sugar, 1g</a>
                                        </h4>
                                        <div className="w3l-pricehkj">
                                            <h6>$69.00</h6>
                                            <p>Save $20.00</p>
                                        </div>
                                        <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                                            <form action="#" method="post">
                                                <fieldset>
                                                    <input type="hidden" name="cmd" value="_cart" />
                                                    <input type="hidden" name="add" value="1" />
                                                    <input type="hidden" name="business" value=" " />
                                                    <input type="hidden" name="item_name" value="Madhur Pure Sugar, 1g" />
                                                    <input type="hidden" name="amount" value="69.00" />
                                                    <input type="hidden" name="discount_amount" value="1.00" />
                                                    <input type="hidden" name="currency_code" value="USD" />
                                                    <input type="hidden" name="return" value=" " />
                                                    <input type="hidden" name="cancel_return" value=" " />
                                                    <input type="submit" name="submit" value="Add to cart" className="button" />
                                                </fieldset>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="w3l-specilamk">
                                    <div className="speioffer-agile">
                                        <a href="single2.html">
                                            <img src="images/s3.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="product-name-w3l">
                                        <h4>
                                            <a href="single2.html">Surf Excel Liquid, 1.02L</a>
                                        </h4>
                                        <div className="w3l-pricehkj">
                                            <h6>$187.00</h6>
                                            <p>Save $30.00</p>
                                        </div>
                                        <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                                            <form action="#" method="post">
                                                <fieldset>
                                                    <input type="hidden" name="cmd" value="_cart" />
                                                    <input type="hidden" name="add" value="1" />
                                                    <input type="hidden" name="business" value=" " />
                                                    <input type="hidden" name="item_name" value="Surf Excel Liquid, 1.02L" />
                                                    <input type="hidden" name="amount" value="187.00" />
                                                    <input type="hidden" name="discount_amount" value="1.00" />
                                                    <input type="hidden" name="currency_code" value="USD" />
                                                    <input type="hidden" name="return" value=" " />
                                                    <input type="hidden" name="cancel_return" value=" " />
                                                    <input type="submit" name="submit" value="Add to cart" className="button" />
                                                </fieldset>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </li> */}

                            {/* {specialProduct1 && <div>Product 1: {specialProduct1.product.name}</div>} */}
                            {/* 
                    {specialProduct2 && <div>Product 2: {specialProduct2.id}</div>}
                    {specialProduct3 && <div>Product 3: {specialProduct3.id}</div>}
                    {specialProduct4 && <div>Product 4: {specialProduct4.id}</div>}

                    {specialProducts.map(specialProducts => (
                        <li key={specialProducts.id}>
                            {specialProducts.product.name}
                        </li>
                    ))} */}
                            {/* <Flexisel /> */}
                        </ul>
                    </div>


                </div>
            </div>
            {/* //special offers */}
        </div>
    )
}
