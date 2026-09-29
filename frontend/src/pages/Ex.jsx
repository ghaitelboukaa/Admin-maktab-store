import React, { useState } from 'react'
import { useProductContext } from '../context/ProductContext'
import { Link } from 'react-router-dom'

export default function Ex(props) {


    const { products, removeProduct, getTotalPrice } = useProductContext()

    const Remove = (id) => {
        removeProduct(id)
    }


    const { toggleCart, toggleCartFunction } = props

    const cloceCart = () => {
        toggleCartFunction(false)
    };
    return (
        <>

            {/* <button onClick={toggleCartVisibility}>Toggle Display</button> */}
            {toggleCart && (
                <div id="PPminicartkk">
                    <form action="">
                        <fieldset>
                            <button type="button" className="minicartk-closer" onClick={cloceCart}>×</button>
                            <ul>

                                {products.map(product => (
                                    <li className="minicartk-item" key={product.id}>
                                        <div className="minicartk-details-name">
                                            <a className="minicartk-name" href="">{product.name}</a>
                                            {/* <ul className="minicartk-attributes">
                                            <li>                        Discount: $5.00
                                                <input type="hidden" name="discount_amount_1" defaultValue="5" />
                                            </li>
                                        </ul> */}
                                        </div>
                                        <div className="minicartk-details-quantity">
                                            <input className="minicartk-quantity" data-minicartk-idx="0" name="quantity_1" type="text" pattern="[0-9]*" defaultValue={product.quantity} autoComplete="off" ></input>
                                        </div>
                                        <div className="minicartk-details-remove">
                                            <button type="button" className="minicartk-remove" data-minicartk-idx="0" onClick={() => Remove(product.id)}>×</button>
                                        </div>
                                        <div className="minicartk-details-price">
                                            {/* <span className="minicartk-price">{product.newprice}</span> */}
                                            {product.newprice ? <><span className="minicartk-price">{product.newprice}</span>
                                            </> : <span className="minicartk-price">{product.price}</span>}

                                        </div>
                                        <input type="hidden" name="item_name_1" defaultValue="Zeeba Basmati Rice - 5 KG" />
                                        <input type="hidden" name="amount_1" defaultValue="950" />
                                        <input type="hidden" name="shipping_1" defaultValue="undefined" />
                                        <input type="hidden" name="shipping2_1" defaultValue="undefined" />
                                    </li>
                                ))}


                            </ul>
                        </fieldset>
                        <div className="minicartk-subtotal">Subtotal: {getTotalPrice()} USD</div>
                        <Link to={'/chekout'}> <button className="minicartk-submit" type="submit" data-minicartk-alt="undefined">
                            Check Out with
                        </button></Link>
                    </form>
                </div>
            )}
        </>
    )
}
