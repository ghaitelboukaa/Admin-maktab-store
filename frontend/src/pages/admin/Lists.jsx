import React, { useEffect, useState } from 'react'
import { axiosClient } from '../../../api/axios';
import { Link } from 'react-router-dom';

export default function Lists() {

    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    const [listName, setListName] = useState('');
    const [school, setSchool] = useState('');
    const [level, setLevel] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        // Fetch available products from API
        axiosClient.get('/api/getProducts', {
            params: {
                query,

            }
        })
            .then(response => {
                setProducts(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [query]);



    const handleProductSelect = (productId) => {
        // Add or remove product from selectedProducts array
        const isSelected = selectedProducts.includes(productId);
        setSelectedProducts(isSelected
            ? selectedProducts.filter(id => id !== productId)
            : [...selectedProducts, productId]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Send form data to backend API
        //     try {

        //     } catch (error) {

        //     }
        //    const respose= 
        axiosClient.post('/api/lists', {
            list_name: listName,
            school: school,
            level: level,
            products: selectedProducts
        })
            .then(response => {
                console.log('List created successfully:', response.data);
                // Reset form fields
                setListName('');
                setSchool('');
                setLevel('');
                setSelectedProducts([]);
                setMessage(response.data.message);
                $('#myModal3').modal('show');
            })
            .catch(error => {
                console.error('Error creating list:', error);
                if (error.response.status == 422) {
                    console.log(error.response.data.errors);
                    setErrors(error.response.data.message);

                } else {
                    setErrors('error');
                }
                $('#myModal4').modal('show');
            });
    }

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
    return (
        // <div>
        //     <form onSubmit={handleSubmit}>
        //         <label>List Name:</label>
        //         <input type="text" value={listName} onChange={(e) => setListName(e.target.value)} required />
        //         <label>School:</label>
        //         <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} />
        //         <label>Level:</label>
        //         <input type="text" value={level} onChange={(e) => setLevel(e.target.value)} />
        //         <label>Choose Products:</label>
        //         <select multiple value={selectedProducts} onChange={(e) => handleProductSelect(e.target.value)}>
        //             {products.map(product => (
        //                 <option key={product.id} value={product.id}>{product.name}</option>
        //             ))}
        //         </select>
        //         <button type="submit">Add List</button>
        //     </form>
        // </div>


        <div>
            <style>
                {`
            form {
                display: flex;
                flex-direction: column;
                // width: 300px;
                // margin: auto;
            }
            
            label {
                margin: 10px 0 5px;
            }
            
            input[type="text"] {
                padding: 8px;
                margin-bottom: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
           
            
            button {
                padding: 10px;
                background-color: var(--blue-color);;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            
            // button:hover {
            //     background-color: #45a049;
            // }
          
            `}
            </style>
            <div className="details">

                <div className="recentOrders">

                    <div className="cardHeader">
                        <h2>Add List</h2>
                        <Link to={'/admin/allList'} className="btn"> All Lists </Link>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label>List Name:</label>
                        <input type="text" value={listName} onChange={(e) => setListName(e.target.value)} required />
                        <label>School:</label>
                        <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} />
                        <label>Level:</label>
                        <input type="text" value={level} onChange={(e) => setLevel(e.target.value)} />


                        <div className="cardHeader">
                            <label>Choose Products:</label>
                            <button type="submit " className="button-container">Add List</button>
                        </div>
                        <br />
                        <div className="search_bar2" >
                            <i className='fa   fa-search'></i><input style={{  border:'none'}} type="text" placeholder="Search" value={query} onChange={handleInputChange} />
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
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        {item.newprice ? < td>{item.newprice}</td> : <td style={{ textAlign: 'center' }}>-</td>}
                                        <td>{truncateText(item.description, 50)}</td>
                                        <td><Link to={`/admin/product/category/${item.category_id}`} style={{ color: 'rgb(184, 184, 36)' }}>{item.category.name}</Link></td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedProducts.includes(item.id)}
                                                onChange={() => handleProductSelect(item.id)}
                                            />
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>



                    </form>
                </div>
            </div>

            <div className="modal fade" id="myModal3" tabIndex="-1" role="dialog">
                <div className="modal-dialog" style={{ width: '400px', height: '300px' }}>
                    {/* Modal content*/}
                    <div className="modal-content" >
                        <div className="modal-header" style={{ backgroundColor: 'lightgreen', color: 'white' }}>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body modal-body-sub_agile" style={{ color: 'green', textAlign: 'center' }}>
                            <i className='glyphicon glyphicon-ok-circle fa-5x'></i>
                            <div>{message}</div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="myModal4" tabIndex="-1" role="dialog">
                <div className="modal-dialog" style={{ width: '400px', height: '300px' }}>
                    {/* Modal content*/}
                    <div className="modal-content"  >
                        <div className="modal-header" style={{ backgroundColor: 'lightcoral', color: 'white' }}>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body modal-body-sub_agile" style={{ color: 'red', textAlign: 'center' }}>

                            <i className='glyphicon glyphicon-remove-circle fa-5x'></i>
                            <div>{errors}</div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
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
