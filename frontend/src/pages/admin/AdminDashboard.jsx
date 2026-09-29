import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosClient } from '../../../api/axios';
// import '../../App.css'

export default function AdminDashboard() {
    const [data, setData] = useState([]);

    const [stats, setStats] = useState({
        dailyViews: 0,
        sales: 0,
        comments: 0,
        earning: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axiosClient.get('/api/dashboard-stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats', error);
            }
        };

        fetchStats();
    }, []);

    useEffect(() => {
        const fetchPendingOrders = async () => {
            try {
                const response = await axiosClient.get('/api/admin/orders');
                // console.log('Pending orders', response.data);
                // setData(response.data);
                const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort orders by createdAt in descending order
                const limitedOrders = sortedOrders.slice(0, 3); // Limit to 3 orders
                console.log('Pending orders', limitedOrders);
                setData(limitedOrders);
            } catch (error) {
                console.error('Error fetching orders', error);
            }
        };
        fetchPendingOrders();
    }, [])

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





            {/* <!-- ======================= Cards ================== --> */}
            <div className="cardBox">
                <div className="card">
                    <div>
                        <div className="numbers">{stats.dailyViews}</div>
                        <div className="cardName">Daily Views</div>
                    </div>

                    <div className="iconBx">
                        <ion-icon name="eye-outline"></ion-icon>
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">{stats.sales}</div>
                        <div className="cardName">Sales</div>
                    </div>

                    <div className="iconBx">
                        <ion-icon name="cart-outline"></ion-icon>
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">{stats.comments}</div>
                        <div className="cardName">Rating</div>
                    </div>

                    <div className="iconBx">
                        <ion-icon name="chatbubbles-outline"></ion-icon>
                    </div>
                </div>

                <div className="card">
                    <div>
                        <div className="numbers">{stats.earning}DH</div>
                        <div className="cardName">Earning</div>
                    </div>

                    <div className="iconBx">
                        <ion-icon name="cash-outline"></ion-icon>
                    </div>
                </div>
            </div>

            {/* <!-- ================ Order Details List ================= --> */}
            <div className="details">
                <div className="recentOrders">
                    <div className="cardHeader">
                        <h2>Recent Orders</h2>
                        <Link to={'/admin/orders'} href="#" className="btn">View All</Link>
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

                {/* <!-- ================= New Customers ================ --> */}
                <div className="recentCustomers">
                    <div className="cardHeader">
                        <h2>Recent Customers</h2>
                    </div>

                    <table>
                    

                        <tr>
                            <td width="60px">
                                <div className="imgBx"></div>
                            </td>
                            <td>
                                <h4>David <br /> <span>Agadir</span></h4>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"></div>
                            </td>
                            <td>
                                <h4>Amit <br /> <span>Ait melloul</span></h4>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"></div>
                            </td>
                            <td>
                                <h4>David <br /> <span>Azro</span></h4>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"></div>
                            </td>
                            <td>
                                <h4>Amit <br /> <span>inzghan</span></h4>
                            </td>
                        </tr>

                        {/* <tr>
                            <td width="60px">
                                <div className="imgBx"><img src="assets/imgs/customer01.jpg" alt="" /></div>
                            </td>
                            <td>
                                <h4>David <br /> <span>Italy</span></h4>
                            </td>
                        </tr>

                        <tr>
                            <td width="60px">
                                <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt="" /></div>
                            </td>
                            <td>
                                <h4>Amit <br /> <span>India</span></h4>
                            </td>
                        </tr> */}
                    </table>
                </div>
            </div >
        </>
    )
}
