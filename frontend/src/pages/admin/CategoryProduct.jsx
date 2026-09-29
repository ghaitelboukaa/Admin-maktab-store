import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { axiosClient } from '../../../api/axios';

export default function CategoryProduct() {
    const { categoryId } = useParams();

    const [data, setData] = useState([])
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosClient.get(`/api/CtegoryProducts/${categoryId}`);
                console.log(response.data);
                setData(response.data)


            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [categoryId]);

    return (
        <div>
            <div className="details">
                <div className="recentOrders">
                    <table>
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Name</td>
                                <td>Price</td>
                                <td>newprice</td>
                                <td>description</td>
                                {/* <td>category</td> */}
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
                                    <td>{truncateText(item.description, 50)}</td>
                                    {/* <td><Link to={`/admin/product/category/${item.category_id}`} >{item.category.name}</Link></td> */}
                                    <td>{item.quantity}</td>
                                    <td><Link to={`/admin/product/edit/${item.id}`}><button className='btn'>edit</button></Link></td>
                                    <td><button className='btn' style={{ color: 'red' }} onClick={(e) => DeleteProduct(e, item.id)} >delete</button></td>
                                </tr>


                            ))}
                        </tbody>
                    </table>
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
