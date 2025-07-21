import axios from 'axios'
import { ArrowLeft, Eye, Heart, Search, ShoppingCart, Star } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { WishListContext } from '../../Context/WishlistContext'
import { CartContext } from '../../Context/CartContext'
import DetailsLoader from '../../components/Details-loader/DetailsLoader'
import ProductCard from '../../components/ProductCard/ProductCard'

export default function Products() {

    const { addProductToCart } = useContext(CartContext)
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState(null)
    const [filteredProducts, setFilteredProducts] = useState(null)
    const [searchValue, setSearchValue] = useState('')

    const getAllProducts = async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
            console.log(data.data)
            setProducts(data.data)
            setFilteredProducts(data.data)
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    // Filteration in products 
    useEffect(() => {
        if (products) {
            if (searchValue) {
                const loweredCaseSearchedValue = searchValue.toLowerCase()
                const filteredProducts = products?.filter((product) => {
                    return product.title.toLowerCase().includes(loweredCaseSearchedValue)
                })
                setFilteredProducts(filteredProducts)
            } else {
                setFilteredProducts(products)
            }
        }
    }, [searchValue, products])
    if (isLoading) {
        return <DetailsLoader />
    }
    return (
        <section className="container mb-10 min-h-[70vh]">
            <header className=' bg-mainLight container rounded-b-3xl py-4 px-4 flex items-center justify-between '>
                {/* Arrow left Icon */}
                <div className="arrowIcon-wrapper size-10 rounded-full flex justify-center items-center bg-primary cursor-pointer">
                    <Link to='/'>
                        <ArrowLeft className='text-white size-6 font-extrabold' />
                    </Link>
                </div>
                {/* Input with search icon */}
                <div className=" relative flex items-center justify-between">
                    <input type='text'
                        value={searchValue}
                        // onChange={(e) => (console.log(e.target.value))}
                        onChange={(e) => (setSearchValue(e.target.value))}

                        placeholder='Search'
                        className='text-darkPrimary text-[14px] px-4 py-2 min-w-[250px] focus:min-w-[350px]   rounded-full outline-none border border-gray-300 focus:border-darkPrimary transition-all duration-300'
                    />
                    <div className="search-icon absolute right-2">
                        <Search className='size-5 font-extrabold text-darkPrimary' />
                    </div>
                </div>
            </header>
            <div className="grid gap-5
            grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5">
                {filteredProducts && filteredProducts.length > 0 ? filteredProducts.map((product) => {
                    return <ProductCard key={product?._id} product={product} />
                }) : <div className='img-wrapper min-w-[450px] col-span-full flex justify-center items-center'>
                    <img src="/no-product-found-DncxVh9z.png" alt="" />
                </div>}

            </div>
        </section >
    )
}