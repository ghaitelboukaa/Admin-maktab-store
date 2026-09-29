import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { axiosClient } from '../../../api/axios';

export default function EditProduct() {
    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState('');
    const { productId } = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [productInput, setProductInput] = useState({});
    const handelInput = (e) => {
        e.persist()
        setProductInput({ ...productInput, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosClient.get(`/api/products/${productId}`);
                console.log(response.data);
                if (response.data.category_id === 1) {
                    setProductInput({
                        level: response.data.book.level,
                        name: response.data.name,
                        description: response.data.description,
                        price: response.data.price,
                        newprice: response.data.newprice,
                        quantity: response.data.quantity,
                        category_id: response.data.category_id,
                        category_name: response.data.category.name,
                        image: response.data.image,
                    })
                    setLoading(false)
                } else if (response.data.category_id === 2) {
                    setProductInput({
                        // brand: response.data.notebook.brand,
                        // number_of_pages: response.data.notebook.number_of_pages,
                        // size: response.data.notebook.size,
                        name: response.data.name,
                        description: response.data.description,
                        price: response.data.price,
                        newprice: response.data.newprice,
                        quantity: response.data.quantity,
                        category_id: response.data.category_id,
                        category_name: response.data.category.name,
                        image: response.data.image,
                    })
                    setLoading(false)

                } else if (response.data.category_id === 3) {
                    setProductInput({
                        brand: response.data.school_supply.brand,
                        type: response.data.school_supply.type,
                        size: response.data.school_supply.size,
                        name: response.data.name,
                        description: response.data.description,
                        price: response.data.price,
                        newprice: response.data.newprice,
                        quantity: response.data.quantity,
                        category_id: response.data.category_id,
                        category_name: response.data.category.name,
                        image: response.data.image,
                    })
                    setLoading(false)
                }




                // setProductInput(response.data)


            } catch (error) {
                console.error('Error fetching product:', error);

            }
        };
        fetchProduct();
    }, [productId]);


    const updateProduct = async (e) => {
        e.preventDefault()
        console.log(productInput);
        try {
            const response = await axiosClient.put(`/api/update-products/${productId}`, productInput);

            setMessage(response.data.message);
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
    if (loading) {
        return <p>loading ...</p>
    }
    return (
        <>
            <div className="contact agileits">
                <div className=" wthree details ">
                    <div className="recentOrders">
                        <form onSubmit={updateProduct}>
                            <div className="">
                                <input type="text" name="name" placeholder="Name" onChange={handelInput} value={productInput.name} required="" />
                            </div>
                            {/* <div className="">
                                <input className="text" type="text" name="category" onChange={handelInput} placeholder="category" value={productInput.category} required="" />
                            </div> */}
                            <div className="">
                                {/* value={productInput.category_id} */}
                                <select className="text" name="category_id" defaultValue={productInput.category_id} onChange={handelInput} required="">
                                    <option value="">Select category</option>
                                    <option value="1">book</option>
                                    <option value="2">notebooks</option>
                                    <option value="3">school supplies</option>
                                </select>
                            
                            {/* {productInput.category_id} */}
                            {productInput.category_id ===1 ||productInput.category_id ==='1' ? (
                                <div>
                                    {/* <input type="text" name="title" placeholder="Title" onChange={handelInput} value={productInput.title} required="" /> */}
                                    <input type="text" name="level" placeholder="Level" onChange={handelInput} value={productInput.level} required="" />
                                </div>
                            ):''}
                            </div>
                            {productInput.category_id ===2 ||productInput.category_id ==='2' ? (
                                <div>
                                    <input type="text" name="size" placeholder="Size" onChange={handelInput} value={productInput.size} required="" />
                                    <input type="text" name="number_of_pages" placeholder="Number of Pages" onChange={handelInput} value={productInput.number_of_pages} required="" />
                                    <input type="text" name="brand" placeholder="Brand" onChange={handelInput} value={productInput.brand} required="" />
                                </div>
                            ):''}
                            {productInput.category_id === 3  ||productInput.category_id ==='3' ? (
                                <div>
                                    <input type="text" name="size" placeholder="Size" onChange={handelInput} value={productInput.size} required="" />
                                    <input type="text" name="type" placeholder="type" onChange={handelInput} value={productInput.type} required="" />
                                    <input type="text" name="brand" placeholder="Brand" onChange={handelInput} value={productInput.brand} required="" />
                                </div>
                            ):''}
                            <div className="">
                                <input className="text" type="text" name="price" onChange={handelInput} placeholder="price" value={productInput.price} required="" />
                            </div>
                            <div className="">
                                <input className="text" type="text" name="newprice" onChange={handelInput} placeholder="newprice" value={productInput.newprice} required="" />
                            </div>
                            <div className="">
                                <input className="text" type="text" name="quantity" onChange={handelInput} placeholder="quantity" value={productInput.quantity} required="" />
                            </div>
                            <div className="">
                                <textarea placeholder="description" name="description" onChange={handelInput} required="" value={productInput.description}></textarea>
                            </div>
                            <div className="">
                                <label htmlFor="image" className="labell ">
                                    <span>Choisir une image</span>
                                    <input type="file" id="image" name='image' />
                                    <img src={productInput.image} alt="" style={{ width: '150px', height: '150px' }} />

                                </label>
                            </div>
                            {/* <input className="btn" type="submit" value="Submit" /> */}
                            <div className=''>
                                <div className="cardHeader">
                                    <Link to={'/admin/product'} className='btn'> <i className='fa  fa-arrow-circle-left'></i>  back</Link>
                                    <button className='btn'>Update</button>
                                </div>
                            </div>


                        </form>

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
                </div>
                {/* </div> */}
            </div >

        </ >
    )
}
