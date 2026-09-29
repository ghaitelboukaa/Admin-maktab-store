import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { axiosClient } from '../../../api/axios';

export default function Orders() {
    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchPendingOrders = async () => {
            try {
                const response = await axiosClient.get('/api/admin/orders');
                console.log('Pending orders', response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching orders', error);
            }
        };
        fetchPendingOrders();
    }, [data.status])


    const handleChange = async (orderId, status) => {
        setData(prevData =>
            prevData.map(order =>
                order.id === orderId ? { ...order, status: status } : order
            )
        );
        try {
            const response = await axiosClient.put(`/api/admin/orders/${orderId}`, { status });
            console.log('Order status updated', response.data);
        } catch (error) {
            console.error('Error updating order status', error);
        }
    };

    return (
        <>

            <style> {` 
  
    }
    `}
            </style>
            <div>
                <div className="details">
                    <div className="recentOrders">
                        <div className="cardHeader">
                            <h2>All Orders</h2>
                            {/* <Link to={'/admin/product'} href="#" className="btn">View All</Link> */}
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Price</td>
                                    <td>Payment</td>
                                    <td>Status</td>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map(order => (
                                    <tr key={order.id}>
                                        {order.status === 'return' ? <del><td>{order.full_name}</td></del> : <td>{order.full_name}</td>}
                                        
                                        <td>{order.total_amount}</td>
                                        <td>non Paid</td>
                                        <td>
                                            < select name="" id=""
                                                className={`status ${order.status} ${order.status === 'return' ? 'status-return-border' : ''}`}
                                                value={order.status}
                                                onChange={(e) => handleChange(order.id, e.target.value)} disabled={order.status === 'return'}>
                                                <option value="pending" className="status pending"><span className="status pending">Pending</span></option>
                                                <option value="completed" className="status completed"><span   >completed</span></option>
                                                <option value="return" className="status return"><span >return</span></option>
                                                <option value="inProgress" className="status inProgress"><span >inProgress</span></option>
                                            </select>

                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
