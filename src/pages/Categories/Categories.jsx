import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import DetailsLoader from '../../components/Details-loader/DetailsLoader'
import { Link } from 'react-router-dom'
import { ProductsContext } from '../../Context/ProductsContext'

export default function Categories() {
    const [categories, setCategories] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { getproductsInCategory } = useContext(ProductsContext)

    async function getAllCategories() {
        setIsLoading(true)
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            setCategories(data.data)
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getAllCategories()
    }, [])
    if (isLoading) {
           return <DetailsLoader />
       }
    return (<div className='my-10 container'>
        <div className='category-shop mb-5 text-center text-darkPrimary py-3 text-[20px] font-bold border-b-1 border-t-1   border-b-gray-200 border-t-gray-200'>Shop by category</div>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5 ">
            {categories?.map((item) => {
                return <Link key={item?._id} to={`/categories/${item?._id}`} onClick={() => {
                    getproductsInCategory(item?._id)

                }}>
                    <div className='flex animate__fadeInUp animate__animated  flex-col gap-3 cursor-pointer group '>
                        <div className="image-wrapper  border-5 border-white shadow-lg  h-[150px] overflow-hidden rounded-2xl">
                            <img src={item?.image} className='w-full group-hover:scale-110 transition-all duration-400 h-full object-contain' alt={`${item?.name}-photo`} />
                        </div>
                        <p className='text-darkPrimary text-center text-[18px] font-bold '>{item?.name}</p>
                    </div>
                </Link>
            })}
        </div>
    </div >

    )
}
