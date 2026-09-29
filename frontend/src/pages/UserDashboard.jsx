import React, { useEffect, useState } from 'react'
import { useUserContext } from '../context/UserContex'
import { useNavigate } from 'react-router-dom'
import { axiosClient } from '../../api/axios'

export default function UserDashboard() {
  const { autenticated } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!autenticated) {
      navigate('/')
    }
  }, [autenticated])

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient.get('/api/client/orders')
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (orderId) => {
    axiosClient.post(`/api/client/orders/${orderId}/update-status`)
      .then(response => {
        setOrders(prevOrders => prevOrders.map(order =>
          order.id === orderId ? { ...order, status: 'return' } : order
        ));
      })
      .catch(error => {
        setError(error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading orders: {error.message}</p>;
  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const orderStyle = {
    borderBottom: '1px solid #ddd',
    padding: '10px 0',
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };
  return (

    // <div className="page-head_agile_info_w3l">
    // </div>
    <div className="banner-bootom-w3-agileits">
      <div className="container">
        {/* tittle heading */}
        <h3 className="tittle-w3l">Your Orders
          <span className="heading-style">
            <i></i>
            <i></i>
            <i></i>
          </span>
        </h3>
      </div>
      <div style={containerStyle}>
        {orders.length === 0 ? (
          <p>You have no orders.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {orders.map(order => (
              <li key={order.id} style={orderStyle}>
                <h3>Order #{order.id}</h3>
                <p>Status: {order.status}</p>
                <p>Total Amount: {order.total_amount}</p>
                {order.status !== 'return' && order.status !== 'completed' && (
                  <button style={buttonStyle} onClick={() => handleStatusChange(order.id)}>Cancel Order</button>
                )}
                {order.status == 'completed' && (
                  <i className='glyphicon glyphicon-ok-circle '></i>
                )}
                 {order.status == 'return' && (<>
                    <i className='glyphicon glyphicon-remove-circle '></i> order fielde!!</>
                )}

              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )

}
