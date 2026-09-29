import React, { useEffect, useState } from 'react'
import Ex from '../../pages/Ex'
import { useProductContext } from '../../context/ProductContext';
import { axiosClient } from '../../../api/axios';
import { Link } from 'react-router-dom'
import GetStars from '../GetStars';

export default function topProducts() {


    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axiosClient.get('/api/top-rated-products');
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

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

    // calculate daysDifference
    const isNewProduct = (createdAt) => {
        const creationDate = new Date(createdAt);
        const currentDate = new Date();
        const timeDifference = currentDate - creationDate;
        // console.log(timeDifference);
        const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
        // console.log(daysDifference);
        return daysDifference < 2;
    };
    return (
        <div>
            <div className="ads-grid">
                <div className="container">
                    {/* tittle heading */}
                    <h3 className="tittle-w3l">Our Top Products
                        <span className="heading-style">
                            <i></i>
                            <i></i>
                            <i></i>
                        </span>
                    </h3>
                    {/* //tittle heading */}

                    {/* product right */}
                    <div className="agileinfo-ads-display col-md-12">
                        <div className="wrapper">
                            {/* first section (nuts) */}
                            <div className="product-sec1 product-sec2">
                                <div className="col-xs-7 effect-bg">
                                    <h3 className="">special offers</h3>
                                    <h6>Enjoy our all healthy Products</h6>
                                    <p>Protecting your children's backs</p>
                                </div>
                                <h3 className="w3l-nut-middle">School portfolioss</h3>
                                <div className="col-xs-5 bg-right-nut">
                                    <img src="images/nut4.png" alt="" />
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            {Object.keys(data).map(item => (
                                <div className="product-sec1" key={item}>
                                    {/* <h3 className="heading-tittle">{item}</h3> */}
                                    <h3 className="heading-tittle">{data[item][0].category.name}</h3>

                                    {data[item].map(product => (
                                        <div className="col-md-4 my-6 product-men" style={{ marginTop: '60px' }} key={product.id}>
                                            <div className="men-pro-item simpleCart_shelfItem">
                                                <div className="men-thumb-item">
                                                    <img src={product.image} alt="" style={{ width: '150px', height: '150px' }} />
                                                    <div className="men-cart-pro">
                                                        <div className="inner-men-cart-pro">
                                                            <Link to={`/single/${product.id}`} href="single.html" className="link-product-add-cart">Quick View</Link>
                                                        </div>
                                                    </div>
                                                    {product.created_at && isNewProduct(product.created_at) &&
                                                        < span className="product-new-top" > New</span>}
                                                </div>
                                                <div className="item-info-product ">
                                                    <div className="customer-rev left-side">

                                                        <ul>
                                                            <li>
                                                                <GetStars rating={product.rating} />
                                                            </li>
                                                        </ul>

                                                    </div>
                                                    <h4>
                                                        <Link href="single.html">{product.name}</Link>
                                                    </h4>
                                                    <div className="info-product-price">
                                                        {product.newprice ? <><span className="item_price">{product.newprice}</span>
                                                            <del>{product.price}</del> </> : <span className="item_price">{product.price}</span>}
                                                    </div>
                                                    <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">

                                                        <input type="submit" name="submit" value="Add to cart" className="button" onClick={() => AddToCart(product.id)} />
                                                        <Ex toggleCartFunction={toggleCartFunction} toggleCart={isCartVisible} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                    <div className="clearfix"></div>

                                </div>
                            ))}
                            {/* //first section (nuts) */}
                            {/* second section (nuts special) */}

                            {/* //second section (nuts special) */}
                            {/* third section (oils) */}
                            {/* <div className="product-sec1">
                                <h3 className="heading-tittle">Oils</h3>
                                <div className="col-md-4 product-men">
                                    <div className="men-pro-item simpleCart_shelfItem">
                                        <div className="men-thumb-item">
                                            <img src="images/mk4.jpg" alt="" />
                                            <div className="men-cart-pro">
                                                <div className="inner-men-cart-pro">
                                                    <a href="single.html" className="link-product-add-cart">Quick View</a>
                                                </div>
                                            </div>
                                            <span className="product-new-top">New</span>
                                        </div>
                                        <div className="item-info-product ">
                                            <h4>
                                                <a href="single.html">Freedom Oil, 1L</a>
                                            </h4>
                                            <div className="info-product-price">
                                                <span className="item_price">$78.00</span>
                                                <del>$110.00</del>
                                            </div>
                                            <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                                                <form action="#" method="post">
                                                    <fieldset>
                                                        <input type="hidden" name="cmd" value="_cart" />
                                                        <input type="hidden" name="add" value="1" />
                                                        <input type="hidden" name="business" value=" " />
                                                        <input type="hidden" name="item_name" value="Freedom Sunflower Oil, 1L" />
                                                        <input type="hidden" name="amount" value="78.00" />
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
                                </div>
                             
                       
                                <div className="clearfix"></div>
                            </div> */}
                            {/* //third section (oils) */}
                            {/* fourth section (noodles) */}
                            {/* <div className="product-sec1">
                                <h3 className="heading-tittle">Pasta & Noodles</h3>
                                <div className="col-md-4 product-men">
                                    <div className="men-pro-item simpleCart_shelfItem">
                                        <div className="men-thumb-item">
                                            <img src="images/mk7.jpg" alt="" />
                                            <div className="men-cart-pro">
                                                <div className="inner-men-cart-pro">
                                                    <a href="single.html" className="link-product-add-cart">Quick View</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-info-product ">
                                            <h4>
                                                <a href="single.html">Yippee Noodles, 65g</a>
                                            </h4>
                                            <div className="info-product-price">
                                                <span className="item_price">$15.00</span>
                                                <del>$25.00</del>
                                            </div>
                                            <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                                                <form action="#" method="post">
                                                    <fieldset>
                                                        <input type="hidden" name="cmd" value="_cart" />
                                                        <input type="hidden" name="add" value="1" />
                                                        <input type="hidden" name="business" value=" " />
                                                        <input type="hidden" name="item_name" value="YiPPee Noodles, 65g" />
                                                        <input type="hidden" name="amount" value="15.00" />
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
                                </div>

                                <div className="col-md-4 product-men">
                                    <div className="men-pro-item simpleCart_shelfItem">
                                        <div className="men-thumb-item">
                                            <img src="images/mk9.jpg" alt="" />
                                            <div className="men-cart-pro">
                                                <div className="inner-men-cart-pro">
                                                    <a href="single.html" className="link-product-add-cart">Quick View</a>
                                                </div>
                                            </div>
                                            <span className="product-new-top">New</span>

                                        </div>
                                        <div className="item-info-product ">
                                            <h4>
                                                <a href="single.html">Chinese Noodles, 68g</a>
                                            </h4>
                                            <div className="info-product-price">
                                                <span className="item_price">$11.99</span>
                                                <del>$15.00</del>
                                            </div>
                                            <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                                                <form action="#" method="post">
                                                    <fieldset>
                                                        <input type="hidden" name="cmd" value="_cart" />
                                                        <input type="hidden" name="add" value="1" />
                                                        <input type="hidden" name="business" value=" " />
                                                        <input type="hidden" name="item_name" value="Chinese Noodles, 68g" />
                                                        <input type="hidden" name="amount" value="11.99" />
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
                                </div>

                                <div className="col-md-4 product-men">
                                    <div className="men-pro-item simpleCart_shelfItem">
                                        <div className="men-thumb-item">
                                            <img src="images/mk7.jpg" alt="" />
                                            <div className="men-cart-pro">
                                                <div className="inner-men-cart-pro">
                                                    <a href="single.html" className="link-product-add-cart">Quick View</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-info-product ">
                                            <h4>
                                                <a href="single.html">Yippee Noodles, 65g</a>
                                            </h4>
                                            <div className="info-product-price">
                                                <span className="item_price">$15.00</span>
                                                <del>$25.00</del>
                                            </div>
                                            <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">
                                                <form action="#" method="post">
                                                    <fieldset>
                                                        <input type="hidden" name="cmd" value="_cart" />
                                                        <input type="hidden" name="add" value="1" />
                                                        <input type="hidden" name="business" value=" " />
                                                        <input type="hidden" name="item_name" value="YiPPee Noodles, 65g" />
                                                        <input type="hidden" name="amount" value="15.00" />
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
                                </div>


                                <div className="clearfix"></div>
                            </div> */}
                            {/* //fourth section (noodles) */}
                        </div>
                    </div>
                    {/* //product right */}
                </div>
            </div>
        </div>
    )
}
