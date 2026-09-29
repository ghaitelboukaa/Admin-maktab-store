import React, { useState } from 'react'
import { axiosClient } from '../../../api/axios';
import { Link } from 'react-router-dom';

export default function AddProduct() {
    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    const [productInput, setProductInput] = useState({});
    const handelInput = (e) => {
        e.persist()
        setProductInput({ ...productInput, [e.target.name]: e.target.value })

    }
    const handleImageChange = (e) => {
        setProductInput({
            ...productInput,
            image: e.target.files[0]
        });

    };

    const createProduct = async (e) => {
        e.preventDefault()
        console.log(productInput);
        const postData = new FormData();
        postData.append('name', productInput.name);
        postData.append('description', productInput.description);
        postData.append('price', productInput.price);
        postData.append('quantity', productInput.quantity);
        postData.append('category_id', productInput.category_id);
        console.log(productInput.category_id);
        switch (productInput.category_id) {
            case '1':
                // postData.append('title', productInput.title);
                postData.append('level', productInput.level);
                break;
            case '2':
                postData.append('size', productInput.size);
                postData.append('number_of_pages', productInput.number_of_pages);
                postData.append('brand', productInput.brand);
                break;
            case '3':
                postData.append('size', productInput.size);
                postData.append('type', productInput.type);
                postData.append('brand', productInput.brand);
                break;

            default:
                break;
        }

        postData.append('image', productInput.image)
        console.log(postData);
        try {
            const respons = await axiosClient.post('/api/create-products', postData);
            setProductInput({
                name:'',
                image: '',
                description: '',
                quantity: '',
                price: '',
                brand: '',
                type: '',
                size: '',
                number_of_pages: '',
                level: '',
                category_id: ''
            });

            console.log(respons.data.message);
            setMessage(respons.data.message);
            $('#myModal3').modal('show');

        } catch (error) {
            console.error('Error fetching product:', error);
            if (error.response.status == 422) {
                console.log(error.response.data.errors);
                setErrors(error.response.data.message);

            } else {
                setErrors('error');
            }
            $('#myModal4').modal('show');


        }

    }

    // if (loading) {
    //     return <p>loading ...</p>
    // }
    return (
        <div>
            <div className="contact agileits">
                <div className=" wthree details ">
                    <div className="recentOrders">
                        <form onSubmit={createProduct}>
                            <div className="">
                                <input type="text" name="name" placeholder="Name" onChange={handelInput} value={productInput.name} required="" />
                            </div>
                            {/* <div className="">
                                <input className="text" type="text" name="category" onChange={handelInput} placeholder="category" value={productInput.category} required="" />
                            </div> */}
                            <div className="">
                                <select className="text" name="category_id" onChange={handelInput} value={productInput.category_id} required="">
                                    <option value="">Select category</option>
                                    <option value="1">book</option>
                                    <option value="2">notebooks</option>
                                    <option value="3">school supplies</option>
                                </select>
                            </div>

                            {productInput.category_id === "1" && (
                                <div>
                                    {/* <input type="text" name="title" placeholder="Title" onChange={handelInput} value={productInput.title} required="" /> */}
                                    <input type="text" name="level" placeholder="Level" onChange={handelInput} value={productInput.level} required="" />
                                </div>
                            )}
                            {productInput.category_id === "2" && (
                                <div>
                                    <input type="text" name="size" placeholder="Size" onChange={handelInput} value={productInput.size} required="" />
                                    <input type="text" name="number_of_pages" placeholder="Number of Pages" onChange={handelInput} value={productInput.number_of_pages} required="" />
                                    <input type="text" name="brand" placeholder="Brand" onChange={handelInput} value={productInput.brand} required="" />
                                </div>
                            )}
                            {productInput.category_id === "3" && (
                                <div>
                                    <input type="text" name="size" placeholder="Size" onChange={handelInput} value={productInput.size} required="" />
                                    <input type="text" name="type" placeholder="type" onChange={handelInput} value={productInput.type} required="" />
                                    <input type="text" name="brand" placeholder="Brand" onChange={handelInput} value={productInput.brand} required="" />
                                </div>
                            )}
                            <div className="">
                                <input className="text" type="text" name="price" onChange={handelInput} placeholder="price" value={productInput.price} required="" />
                            </div>
                            <div className="">
                                <input className="text" type="text" name="quantity" onChange={handelInput} placeholder="quantity" value={productInput.quantity} required="" />
                            </div>
                            <div className="">
                                <textarea placeholder="description" name="description" onChange={handelInput} required="" value={productInput.description }
                                    ></textarea>
                            </div>
                            <div className="">
                                <label htmlFor="image" className="labell ">
                                    <span>Choisir une image</span>

                                    <input type="file" id="image" name='image' onChange={handleImageChange} />
                                    {productInput.image && (

                                        <img
                                            src={URL.createObjectURL(productInput.image)}
                                            alt="Selected"
                                            style={{ width: '150px', height: '150px', marginLeft: '3px' }}

                                        />

                                    )}
                                    {/* <img src={`/public/images/ ${productInput.image}`} alt="" style={{ width: '150px', height: '150px' }} /> */}
                                </label>
                            </div>
                            {/* <input className="btn" type="submit" value="Submit" /> */}
                            <div className=''>
                                <div className="cardHeader">
                                    <Link to={'/admin/product'} className='btn'> <i className='fa  fa-arrow-circle-left'></i>  back</Link>
                                    <button className='btn'>Add</button>
                                </div>
                            </div>

                            {/* // <div className="modal fade" id="myModal3" tabIndex="-1" role="dialog">
                            //     <div className="modal-dialog" >
                            //         <div className="modal-content" style={{ backgroundColor: 'green' }}>
                            //             <div className="modal-header">
                            //                 <button type="button" className="close" data-dismiss="modal">&times;</button>
                            //             </div>
                            //             <div className="modal-body modal-body-sub_agile">
                            //                 gggggggggggggg
                            //                 <div className="clearfix"></div>
                            //             </div>
                            //         </div>
                            //     </div>
                            // </div> */}
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
                        </form>
                    </div>
                </div>
            </div >
        </div>
    )
}
