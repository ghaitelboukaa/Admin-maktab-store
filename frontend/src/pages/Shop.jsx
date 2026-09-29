import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Left from '../components/Left';
import Nav from '../components/homepageComponents/Nav';
import { axiosClient } from '../../api/axios';
import { useProductContext } from '../context/ProductContext';
import Ex from './Ex';
import { Range, getTrackBackground } from 'react-range';
import GetStars from '../components/GetStars';
import Pagination from '../components/Pagination';


function Shop() {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);
    const [rating, setRating] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(9);

    const [values, setValues] = useState([minPrice, maxPrice]);

    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/api/getProducts`, {
                params: {
                    query,
                    minPrice: values[0],
                    maxPrice: values[1],
                    selectedValue,
                    rating,
                    page,
                    perPage
                }
            });
            console.log(response.data);
            setData(response.data.data);
            setCurrentPage(response.data.current_page);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);  // Set loading to false after fetching data
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        fetchData();
    };

    // range
    const handleSliderChange = (values) => {
        setValues(values);
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
    const handleCategoriesChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        console.log(selectedValue);
    };
    const handleRatingChange = (selectedRating) => {
        setRating(selectedRating);
        console.log(rating);
    };

    useEffect(() => {

        fetchData(currentPage);
    }, [currentPage, selectedValue, rating, values]);

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


    // print rating
    // const getStars = (rating) => {
    //     let stars = [];
    //     for (let i = 1; i <= 5; i++) {
    //         if (rating >= i) {
    //             stars.push(<i key={i} className="fa fa-star" aria-hidden="true"></i>);
    //         } else if (rating >= i - 0.5) {
    //             stars.push(<i key={i} className="fa fa-star-half-o" aria-hidden="true"></i>);
    //         } else {
    //             stars.push(<i key={i} className="fa fa-star-o" aria-hidden="true"></i>);
    //         }
    //     }
    //     return stars;
    // };





    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>

            {/* <div className="services-breadcrumb">
                <div className="agile_inner_breadcrumb">
                    <div className="container">
                        <ul className="w3_short">
                            <li>
                                <Link to={'/'} href="index.html">Home</Link>
                                <i>|</i>
                            </li>
                            <li>Kitchen Products</li>
                        </ul>
                    </div>
                </div>
            </div> */}

<div className="page-head_agile_info_w3l">

</div>

            {/* top Products */}
            <div className="ads-grid">
                <div className="container">
                    {/* tittle heading */}
                    <h3 className="tittle-w3l"> Products
                        <span className="heading-style">
                            <i></i>
                            <i></i>
                            <i></i>
                        </span>
                    </h3>
                    {/* //tittle heading */}
                    {/* product left */}
                    <div className="side-bar col-md-3">
                        <div className="search-hotel">
                            <h3 className="agileits-sear-head">Search Here..</h3>
                            <form onSubmit={handleFormSubmit}>
                                <input type="search" placeholder="Product name..." name="search" required="" value={query} onChange={handleInputChange}
                                />
                                <input type="submit" value=" " data-target="#S" />
                            </form>
                        </div>
                        <div>
                            <div className="search-hotel">
                                <h3 className="agileits-sear-head">Search With Category Here..</h3>

                                {/* <div className="agileits-navi_search"> */}
                                {/* <form action="#" method="post"> */}
                                <select id="agileinfo-nav_search" name="agileinfo_search" value={selectedValue} onChange={handleCategoriesChange} required="">
                                    <option value="0">All Categories</option>
                                    <option value="1">BOOK</option>
                                    <option value="2">NOTEBOOK</option>
                                    <option value="3">SCHOOL SUPPLIES</option>


                                </select>
                                {/* </form> */}
                            </div>
                            {/* </div> */}
                        </div>
                        <div className="range">
                            <h3 className="agileits-sear-head">Price range</h3>
                            <ul className="dropdown-menu6">
                                <li>
                                    {/* <input type="range" /> */}
                                    <div>
                                        <Range
                                            values={values}
                                            step={10}
                                            min={minPrice}
                                            max={maxPrice}
                                            onChange={handleSliderChange}
                                            renderTrack={({ props, children }) => (
                                                <div
                                                    {...props}
                                                    style={{
                                                        ...props.style,
                                                        height: '6px',
                                                        width: '100%',
                                                        background: getTrackBackground({
                                                            values: values,
                                                            colors: ['#ccc', '#548BF4', '#ccc'],
                                                            min: minPrice,
                                                            max: maxPrice
                                                        }),
                                                        borderRadius: '4px'
                                                    }}
                                                >
                                                    {children}
                                                </div>
                                            )}
                                            renderThumb={({ props }) => (
                                                <div
                                                    {...props}
                                                    style={{
                                                        ...props.style,
                                                        height: '24px', width: '24px', borderRadius: '12px', backgroundColor: '#548BF4', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0px 2px 6px #AAA'
                                                    }}
                                                >

                                                    <div style={{ height: '16px', width: '5px', backgroundColor: '#FFF' }} />
                                                </div>
                                            )}
                                        />
                                        <br />
                                        <div>
                                            <label>Selected Range: </label>
                                            <span>{`${values[0]}DH - ${values[1]}DH`}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="left-side">
                            <h3 className="agileits-sear-head">Discount</h3>
                            <ul>
                                <li>
                                    <input type="checkbox" className="checked" />
                                    <span className="span">5% or More</span>
                                </li>
                                <li>
                                    <input type="checkbox" className="checked" />
                                    <span className="span">10% or More</span>
                                </li>
                                <li>
                                    <input type="checkbox" className="checked" />
                                    <span className="span">20% or More</span>
                                </li>
                                <li>
                                    <input type="checkbox" className="checked" />
                                    <span className="span">30% or More</span>
                                </li>
                                <li>
                                    <input type="checkbox" className="checked" />
                                    <span className="span">50% or More</span>
                                </li>
                                <li>
                                    <input type="checkbox" className="checked" />
                                    <span className="span">60% or More</span>
                                </li>
                            </ul>
                        </div>
                        <div className="customer-rev left-side">
                            <h3 className="agileits-sear-head">Customer Review</h3>
                            <ul>
                                <li>
                                    <a onClick={() => handleRatingChange(5)}>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <span>5.0</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={() => handleRatingChange(4)}>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                        <span>4.0</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={() => handleRatingChange(3.5)}>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                        <span>3.5</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={() => handleRatingChange(3)}>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                        <span>3.0</span>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={() => handleRatingChange(2.5)}>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star" aria-hidden="true"></i>
                                        <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                        <i className="fa fa-star-o" aria-hidden="true"></i>
                                        <span>2.5</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* //product left */}
                    {/* product right */}

                    <div className="agileinfo-ads-display col-md-9 w3l-rightpro">
                        <div className="wrapper">
                            {/* first section */}

                            <div className="product-sec1" id='S'>
                                {loading ? (
                                    <p>Loading...</p>  // Display a loading message
                                ) : (
                                    <>
                                        {data.map(product => (
                                            <div className="col-xs-4 my-6 product-men" style={{ marginTop: '60px' }} key={product.id}>
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
                                                            {product.newprice ? <><span className="item_price">{product.newprice }DH</span>
                                                                <del>{product.price} DH</del> </> : <span className="item_price">{product.price} DH</span>}
                                                        </div>
                                                        <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">

                                                            <input type="submit" name="submit" value="Add to cart" className="button" onClick={() => AddToCart(product.id)} />
                                                            <Ex toggleCartFunction={toggleCartFunction} toggleCart={isCartVisible} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </>)}
                                <div className="clearfix"></div>
                            </div>





                            {/* //4th section  */}

                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

                    </div>
                    {/* //product right */}

                </div>
            </div >
            {/* //top products */}



        </>
    )
}

export default Shop