import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../../api/axios';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';

export default function Product() {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(5);

    useEffect(() => {


        const fetchData = async (page = 1) => {
            try {
                const response = await axiosClient.get('/api/getProducts', {
                    params: {
                        query,
                        // minPrice: values[0],
                        // maxPrice: values[1],
                        // selectedValue,
                        // rating,
                        page,
                        perPage
                    }
                });
                setData(response.data.data);
                setCurrentPage(response.data.current_page);
                setTotalPages(response.data.last_page);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(currentPage);

    }, [currentPage, query])

    const DeleteProduct = async (e, id) => {
        e.preventDefault();
        const clickted = e.currentTarget;
        clickted.innerText = "deleting";

        try {
            await axiosClient.delete(`/api/delete-products/${id}`);
            clickted.closest("tr").remove();
        } catch (error) {
            console.error('Error fetching data:', error);
            clickted.innerText = "delete";
        }

    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    // console.log(data);

    return (
        <div>

            <div className="details">

                <div className="recentOrders">


                    <div className="cardHeader">
                        <h2>All Product</h2>
                        <Link to={'/admin/product/Add'} className="btn"> <i className='fa   fa-plus-circle'></i>  Add Product</Link>
                    </div>
                    <div className="search_bar2" >
                        <i className='fa   fa-search'></i><input type="text" placeholder="Search" value={query} onChange={handleInputChange} />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Name</td>
                                <td>Price</td>
                                <td>newprice</td>
                                <td>description</td>
                                <td>category</td>
                                <td>quantity</td>
                                <td>Update</td>
                                <td>delete</td>
                                {/*
                                <td>Payment</td>
                                <td>Status</td> */}



                            </tr>
                        </thead>

                        <tbody>

                            {data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    {item.newprice ? < td>{item.newprice}</td> : <td style={{ textAlign: 'center' }}>-</td>}
                                    {/* <td>{item.description}</td> */}
                                    <td>{truncateText(item.description, 50)}</td>
                                    <td><Link to={`/admin/product/category/${item.category_id}`} style={{ color: 'rgb(184, 184, 36)' }}>{item.category.name}</Link></td>
                                    <td>{item.quantity}</td>
                                    <td><Link to={`/admin/product/edit/${item.id}`}><button className='btn'>edit</button></Link></td>
                                    <td><button className='btn' style={{ color: 'red' }} onClick={(e) => DeleteProduct(e, item.id)} >delete</button></td>
                                </tr>


                            ))}
                        </tbody>
                    </table>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

                </div>
            </div>
        </div>
    )

}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
}
