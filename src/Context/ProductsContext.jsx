import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";

export let ProductsContext = createContext(null);
export default function ProductsContextProvider({ children }) {

  const [productsInBrand, setProductsInBrand] = useState(null)
  const [productsInCategory, setProductsInCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  // Get Products in Specific Brand 

  async function getProductsInBrand(id) {

    setIsLoading(true)
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
      console.log(data.data)
      setProductsInBrand(data.data)

    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Get Products in Specific Category 
  async function getproductsInCategory(id) {
    setIsLoading(true)
    // 
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`)

      console.log(data.data)
      setProductsInCategory(data.data)

    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProductsContext.Provider value={{ getProductsInBrand, productsInCategory, productsInBrand, isLoading, getproductsInCategory }}>
      {children}
    </ProductsContext.Provider>
  )
}
