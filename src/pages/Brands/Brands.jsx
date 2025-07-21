import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import DetailsLoader from '../../components/Details-loader/DetailsLoader'
import { Link } from 'react-router-dom'
import { ProductsContext } from '../../Context/ProductsContext'
export default function Brands() {
    const [brands, setBrands] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { getProductsInBrand } = useContext(ProductsContext)
    // All Brands 
    async function getAllBrands() {
        setIsLoading(true)
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            setBrands(data.data)
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getAllBrands()
    }, [])
    if (isLoading) {
        return <DetailsLoader />
    }
    return (
        <div className="container my-10">
            <div className='category-shop mb-5 text-center text-darkPrimary py-3 text-[20px] font-bold border-b-1 border-t-1   border-b-gray-200 border-t-gray-200'>Shop by Brand</div>
            <div className='grid grid-cols-2 place-items-center sm:grid-cols-3 md:grid-cols-3 gap-y-3 lg:grid-cols-4 xl:grid-cols-6'>
                {brands?.map((brand) => {
                    return <Link onClick={() => {
                        getProductsInBrand(brand?._id)
                    }} to={`/brands/${brand?._id}`} key={brand?._id}>
                        <div className="image-wrapper animate__rollIn animate__animated cursor-pointer rounded-full overflow-hidden size-40  shadow-lg hover:scale-140 transition-all duration-300">
                            <img src={brand?.image} className='w-full h-full object-contain' alt={brand?.name} />
                        </div>
                    </Link>
                })}
            </div>
        </div>
    )
}
