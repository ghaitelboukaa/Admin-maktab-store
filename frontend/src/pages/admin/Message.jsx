import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../../api/axios';

export default function Message() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);


    useEffect(() => {
        // Function to fetch messages for the admin
        const fetchMessages = async () => {
            try {
                const response = await axiosClient.get('/api/admin/messages');
                console.log(response.data.messages);
                setMessages(response.data.messages);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);



    const handleClickMessage = async (id) => {
        try {
            const response = await axiosClient.post(`/api/admin/messages/read/${id}`);
            const updatedMessage = response.data.message;
            console.log(updatedMessage);
            setMessages(messages.map(msg => (msg.id === id ? updatedMessage : msg)));
            // console.log(messages.map(msg => (msg.id === id ? updatedMessage : msg)));
            setSelectedMessage(updatedMessage);
        } catch (error) {
            console.error('Failed to mark message as read');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <style>
                {`
              /* MessageList.module.css */

              .messageItem {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                transition: background-color 0.3s ease;
                cursor: pointer;
              }
              
              .messageItem:hover {
                background-color: #f9f9f9;
              }
              
              .messageDetails {
                flex-grow: 1;
                margin-left: 10px;
              }
              
              .messageFrom {
                font-weight: bold;
                margin-bottom: 5px;
              }
              
              .messageContent {
                margin-bottom: 5px;
              }
              
              .iconContainer {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: #e0e0e0;
              }
              
              .iconContainer .fa {
                font-size: 20px;
                color: #555;
              }
              
              .subject {
                font-weight: bold;
              }
              
              .content {
                margin-top: 10px;
              }
              `}
            </style>

            <div className="details">

                <div className="recentOrders">
                    <div className="cardHeader">
                        <h2>Message</h2>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        {/* {messages.map(item => (
                            <div key={item.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                                <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>From: {item.sender.name}</p>
                                <p style={{ marginBottom: '5px' }}>Subject: {item.subject}</p>
                                <p style={{ marginBottom: '5px' }}>Content: {item.content}</p>
                                <hr style={{ marginTop: '5px', marginBottom: '5px', borderColor: '#ccc' }} />
                            </div>
                        ))} */}

                        {messages.map(item => (
                            <div
                                key={item.id}
                                className='messageItem'
                                onClick={() => handleClickMessage(item.id)}
                            >
                                <div className='iconContainer'>
                                    <i className='fa fa-envelope'></i>
                                </div>
                                <div className='messageDetails'>
                                    <p className='messageFrom'>
                                        From: {item.sender ? item.sender.name : 'Unknown'}
                                    </p>
                                    {selectedMessage && selectedMessage.id === item.id && (
                                        <div className='content'>
                                            <p className='subject'>Subject: {item.subject}</p>
                                            <p className='messageContent'>Content: {item.content}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
