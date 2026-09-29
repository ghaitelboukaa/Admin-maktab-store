import React, { useEffect, useRef, useState } from 'react'
import { axiosClient } from '../../../api/axios';
import { Link } from 'react-router-dom';
import Signup from '../../components/Signup';
import Pagination from '../../components/Pagination';

export default function SpecialOffersAdmmin() {

  const [query, setQuery] = useState('');
  const inputOffer = useRef()
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(6);

  useEffect(() => {


    const fetchData = async (page = 1) => {
      try {
        const response = await axiosClient.get('/api/getProducts', {
          params: {
            query,
            // minPrice: values[0],
            // maxPrice: values[1],
            // selectedValue,
            // rating,
            page,
            perPage
          }
        });
        setData(response.data.data);
        setCurrentPage(response.data.current_page);
        setTotalPages(response.data.last_page);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(currentPage);

  }, [currentPage, query, message])


  const DeleteSpecialeProduct = async (e, id) => {
    e.preventDefault();
    // const clickted = e.currentTarget;
    // clickted.innerText = "deleting";

    try {
      const response = await axiosClient.delete(`/api/Special-products/${id}`);
      // clickted.closest("tr").remove();
      setMessage(response.data.message);
      $('#myModal3').modal('show');
    } catch (error) {
      console.error('Error fetching data:', error);
      // clickted.innerText = "delete";

      if (error.response.status == 422) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.message);

      } else {
        setErrors('error');
      }
      $('#myModal4').modal('show');
    }

  }

  const handleSelectTopProduct = async (e, productId) => {
    e.preventDefault()
    console.log(productId);
    const offerValue = inputOffer.current.value;
    try {
      const response = await axiosClient.post('/api/Special-products', { product_id: productId, offer: offerValue })
      setMessage(response.data.message);
      $('#myModal3').modal('show');
    } catch (error) {
      console.error('Error selecting top product:', error);

      if (error.response.status == 422) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.message);

      } else {
        setErrors('error');
      }
      $('#myModal4').modal('show');
    }
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <div className="details">
        <div className="recentOrders">

          <div className="cardHeader">
            <h2>Add Special Offers</h2>
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
                <td>newprice</td>
                <td>description</td>
                <td>category</td>
                <td>quantity</td>
                <td style={{ textAlign: 'center' }}>Add to Special Offers</td>
                <td>Delete</td>


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
                  <td><Link to={`/admin/product/category/${item.category_id}`} style={{ color: 'rgb(184, 184, 36)' }}>{item.category.name}</Link></td>
                  <td>{item.quantity}</td>
                  {/* <td><button className='btn' style={{ color: 'black' }} onClick={() => handleSelectTopProduct(item.id)} >ADD</button></td> */}
                  <td style={{ textAlign: 'center' }}><a className="play-icon popup-with-zoom-anim" data-toggle="modal" data-target="#Offerdialog" onClick={() => { setId(item.id) }} >ADD</a></td>
                  {item.top_product !== null && <td><button className='btn' style={{ color: 'red' }} onClick={(e) => DeleteSpecialeProduct(e, item.top_product.id)} >delete</button></td>
                  }
                  {/* { item.top_product.id} */}
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

        </div>
      </div>
      <div className="modal fade" id="Offerdialog" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
          {/* Modal content*/}
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" >&times;</button>
            </div>
            <div className="modal-body modal-body-sub_agile">
              <div className="main-mailposi">
                {/* <span className="fa fa-envelope-o" aria-hidden="true"></span> */}
              </div>
              <div className="modal_body_left modal_body_left1">
                <h3 className="agileinfo_sign">Offer</h3>

                <form >
                  <div className="styled-input agile-styled-input-top">
                    <input type="text" placeholder=" Offer descrption" name="Name" required="" ref={inputOffer} />
                  </div>

                  <input type="submit" value="Add Offer" onClick={(e) => handleSelectTopProduct(e, id)} />
                </form>

              </div>
            </div>
          </div>
          {/* //Modal content*/}
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