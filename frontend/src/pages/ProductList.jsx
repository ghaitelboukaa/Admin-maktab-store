import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../api/axios';
import { useProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import Ex from './Ex';
import Pagination from '../components/Pagination';

export default function ProductList() {
    const [lists, setLists] = useState([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(4);

    const { products, setProducts, addProduct } = useProductContext()

    const [isCartVisible, setIsCartVisible] = useState(false);
    const toggleCartFunction = () => {
        setIsCartVisible(prevIsCartVisible => !prevIsCartVisible);
    };


    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        fetchData();
    };
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const fetchData = (page = 1) => {


        axiosClient.get('/api/getlists', {
            params: {
                query,
                page,
                perPage
            }
        })
            .then(response => {
                setLists(response.data.data);
                setCurrentPage(response.data.current_page);
                setTotalPages(response.data.last_page);
            })
            .catch(error => {
                console.error('Error fetching lists:', error);
            });
    }


    useEffect(() => {

        fetchData(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const AddToCart = async (id) => {
        // console.log(id);
        try {
            const response = await axiosClient.get(`/api/getlistsById/${id}`);
            console.log(response.data.products);
            const productList = response.data.products; // Assuming response.data is an array of products

            productList.forEach((product, i) => {
                const newProduct = {
                    id: product.id,
                    num: products.length + i + 1, // Generate a unique ID
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    newprice: product.newprice,
                    quantity: 1

                };
                console.log(newProduct);
                addProduct(newProduct);
                setIsCartVisible(true);
            });

        } catch (error) {
            console.error('Error fetching list:', error);
        }
    };

    return (
        <div>
            <div className="page-head_agile_info_w3l">

            </div>

            <div className="ads-grid">
                <div className="container">
                    <h3 className="tittle-w3l"> All Lists
                        <span className="heading-style">
                            <i></i>
                            <i></i>
                            <i></i>
                        </span>
                    </h3>

                    <div className="side-bar col-md-3">
                        <div className="search-hotel">
                            <h3 className="agileits-sear-head">Search Here..</h3>
                            <form onSubmit={handleFormSubmit}>
                                <input type="search" placeholder="Product name..." name="search" required="" value={query} onChange={handleInputChange}
                                />
                                <input type="submit" value=" " data-target="#S" />
                            </form>
                        </div>
                    </div>

                    <div className="agileinfo-ads-display col-md-9 w3l-rightpro">
                        <div className="wrapper">
                            {/* first section */}

                            <div className="product-sec1" id='S'>
                                {lists.map(list => (
                                    <div className="col-xs-4 my-6 product-men" style={{ marginTop: '60px' }} key={list.id}>
                                        <div className="men-pro-item simpleCart_shelfItem">
                                            <div className="men-thumb-item">
                                                <img src='images/list.jpeg' alt="" style={{ width: '150px', height: '150px' }} />



                                                <div className="item-info-product ">
                                                    <div className="customer-rev left-side">



                                                    </div>
                                                    <h4>
                                                        <Link href="single.html"> Scholl : {list.school}</Link>
                                                    </h4>
                                                    <h4>
                                                        <Link href="single.html">{list.level}</Link>
                                                    </h4>

                                                    <div className="info-product-price">
                                                        {list.total_new_price !== list.total_price ? <><span className="item_price">{list.total_new_price} DH</span>
                                                            <del>{list.total_price} DH</del> </> : <span className="item_price">{list.total_price} DH</span>}
                                                        {/* <span className="item_price">{list.total_price} DH</span> */}
                                                    </div>

                                                    <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out">

                                                        <input type="submit" name="submit" value="Add to cart" className="button" onClick={() => AddToCart(list.id)} />
                                                        <Ex toggleCartFunction={toggleCartFunction} toggleCart={isCartVisible} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="clearfix"></div>
                            </div>
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />






                            {/* //4th section  */}

                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
