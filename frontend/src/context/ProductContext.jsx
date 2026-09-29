import React, { createContext, useState } from 'react'
import { useContext } from "react";

export const ProductStateContext = createContext({
    products: [],
    setProducts: () => { },
    updateQuantity: () => { },
    removeProduct: () => { },
    getTotalPrice: () => { },
    addProduct: () => { },
    orderSend:'',
    setOrderSend: () => { },
})

export default function ProductContext({ children }) {
    const [products, setProducts] = useState(
        [
            // { num: 1, name: 'Product 1', quantity: 0 },
            // { num: 2, name: 'Product 2', quantity: 0 },
            // { num: 3, name: 'Product 3', quantity: 0 },
        ]
    )


    const [orderSend, setOrderSend] = useState('')

    const updateQuantity = (id, newQuantity) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, quantity: newQuantity } : product
            )
        );
    };

    const removeProduct = (id) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };

    // const getTotalPrice = () => {

    //     const total = products.reduce((total, product) => total + product.quantity * product.price, 0);
    //     return total.toFixed(3)
    // };
    const getTotalPrice = () => {
        const total = products.reduce((total, product) => {
            const pricee = product.newprice !== null ? product.newprice : product.price;
            const subtotal = product.quantity * pricee;
            // console.log(`Product: ${product.name}, Quantity: ${product.quantity}, Price: ${pricee}, Subtotal: ${subtotal}`);
            return total + subtotal;
        }, 0);
        return total.toFixed(3);
    };

    const addProduct = (newProduct) => {
        const existingProductIndex = products.findIndex((product) => product.id === newProduct.id);
        if (existingProductIndex !== -1) {
            // updateQuantity(newProduct.num, true);
            const newQuantity = products.find((product) => product.id === newProduct.id).quantity + 1;
            updateQuantity(newProduct.id, newQuantity);
        } else {
            setProducts((prevProducts) => [...prevProducts, newProduct]);
        }
    }
    return <>
        <ProductStateContext.Provider value={{
            products,
            setProducts,
            updateQuantity,
            removeProduct,
            getTotalPrice,
            addProduct,
            orderSend,
            setOrderSend

        }}>
            {children}
        </ProductStateContext.Provider>
    </>


}
export const useProductContext = () => useContext(ProductStateContext)
