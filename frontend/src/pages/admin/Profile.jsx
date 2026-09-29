import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { axiosClient } from '../../../api/axios';
import { useUserContext } from '../../context/UserContex';

export default function Profile() {

    // const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { admin } = useUserContext();


    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = () => {
        // event.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        axiosClient.post('/api/admin/update-image', formData)
            .then(response => {
                // console.log(response.data.message);
                // Handle success (e.g., show success message)
            })
            .catch(error => {
                console.error(error);
                // Handle error (e.g., show error message)
            });
    };
      useEffect(() => {
        if (image) {
            handleSubmit();
        }
       
      },[image])


    const handleChangePassword = (e) => {

        e.preventDefault()
        axiosClient.put(`/api/admin/password/${admin.id}`, { current_password: currentPassword, new_password: newPassword, password_confirmation: confirmNewPassword })
            .then(response => {
                setSuccessMessage(response.data.message);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
            });
    };
    console.log(admin.image);

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         try {
    //             const response = await axiosClient.get(`/api/products/${productId}`);
    //             // console.log(response.data);
    //             setProduct(response.data);
    //         } catch (error) {
    //             console.error('Error fetching product:', error);
    //         }
    //     };
    //     fetchProduct();
    // }, []);

    const handleUpdateProfile = (e) => {
        e.preventDefault()
        axiosClient.put(`/api/admin/profile/${admin.id}`, { name, email })
            .then(response => {
                setSuccessMessage(response.data.message);
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
            });
    };


    if (!admin) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <style>
                {`
.profile-form {
    // max-width: 600px;
    // margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
}

.profile-form h2 {
    text-align: center;
    margin-bottom: 20px;
}

.profile-form .form-group {
    margin-bottom: 15px;
}

.profile-form .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.profile-form .form-group input[type="text"],
.profile-form .form-group input[type="email"],
.profile-form .form-group input[type="password"],
.profile-form .form-group input[type="file"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.profile-form .form-group input[type="file"] {
    padding: 3px;
}

// .profile-form .form-group .profile-pic {
//     display: block;
//     margin-top: 10px;
//     max-width: 100px;
//     border-radius: 50%;
// }
.profile-form .form-group .image-wrapper img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover; /* Ensure the image covers the entire space */
}

.profile-form .form-group .submit-btn {
    width: auto; /* Set width to auto to allow content to determine width */
    padding: 6px 12px; /* Small padding */
    background-color: #007bff; /* Blue color */
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 14px; /* Small font size */
    cursor: pointer;
    transition: background-color 0.3s;
    align-self: flex-start; /* Align button to the start (left) */
}

.profile-form .form-group .submit-btn:hover {
    background-color: #0056b3; /* Darker blue on hover */
}
`}
            </style>
            <div className="recentOrders details">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            {/* <form onSubmit={handleSubmit}> */}
                                <div className="form-group">
                                    <input type="file" id="image" onChange={handleImageChange} style={{ display: 'none' }} />
                                    <label htmlFor="image" className="image-wrapper">
                                        <img className="rounded-circle" src={admin.image} alt="Profile" style={{ width: '150px', height: '150px' }} />
                                    </label>
                                </div>
                                {/* <button type="submit">Update Image</button> */}
                            {/* </form> */}


                            {/* <span className="font-weight-bold">Edogaru</span><span className="text-black-50">edogaru@mail.com.my</span><span> </span> */}
                        </div>
                    </div>
                    <div className="col-md-5 border-right">
                        
                    </div>
                    
                </div>
                <form className="profile-form">
                    {/* <h2>Admin Profile</h2> */}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    </div>


                    <div className="form-group">
                        <button className="submit-btn" onClick={handleUpdateProfile}>Update Profile</button>
                    </div>
                </form>
               
                <form className="profile-form">
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current Password</label>
                        <input type="password" id="currentPassword" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Current Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" id='newPassword' value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmNewPassword">Confirm New Password</label>
                        <input type="password" id='confirmNewPassword' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} placeholder="Confirm New Password" />

                    </div>

                    <div className="form-group">
                        <button type="submit" className="submit-btn" onClick={handleChangePassword}>Save New Password</button>
                    </div>
                </form>
            </div>

        </ >
    )
}
