import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../../api/axios';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';

export default function AllLists() {

    const [lists, setLists] = useState([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(4);

    // const { products, setProducts, addProduct } = useProductContext()



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
    }, [currentPage, query]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const DeleteProduct = async (e, id) => {
        e.preventDefault();
        const clickted = e.currentTarget;
        clickted.innerText = "deleting";

        try {
            await axiosClient.delete(`/api/delete-list/${id}`);
            clickted.closest("tr").remove();
        } catch (error) {
            console.error('Error fetching data:', error);
            clickted.innerText = "delete";
        }

    }



    return (
        <div>
            <div className="details">

                <div className="recentOrders">


                    <div className="cardHeader">
                        <h2>All Lists</h2>
                        <Link to={'/admin/list'} className="btn"> <i className='fa   fa-plus-circle'></i>  Add List</Link>
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
                                <td>school</td>
                                <td>level</td>

                                <td>delete</td>




                            </tr>
                        </thead>

                        <tbody>

                            {lists.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.list_name}</td>
                                    {item.total_new_price !== item.total_price ? < td>{item.total_new_price}</td> : < td>{item.total_price}</td>}
                                    <td>{item.school}</td>
                                    <td>{item.level}</td>
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
