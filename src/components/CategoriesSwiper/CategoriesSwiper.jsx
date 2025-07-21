import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import DetailsLoader from '../Details-loader/DetailsLoader';
import { ProductsContext } from '../../Context/ProductsContext';
import { Link } from 'react-router-dom';

export default function CategoriesSwiper() {
    const [categoryInSwiper, setCategoryInSwiper] = useState(null)
    const { getproductsInCategory } = useContext(ProductsContext)
    const [isLoading, setIsLoading] = useState(false)
    // Get All Categories in home page ===============> 
    async function getAllCategories() {
        setIsLoading(true)
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            setCategoryInSwiper(data.data)
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <div className='container  my-10'>
            <p className='text-darkPrimary py-3 text-[20px] font-bold'>Shope now by popular categories</p>
            {isLoading ? <DetailsLoader /> : <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                slidesPerView={1}
                navigation={true}
                loop={true}
                breakpoints={
                    {
                        1024: { slidesPerView: 6 },
                        768: { slidesPerView: 3 },
                        480: { slidesPerView: 2 },
                    }}
                autoplay={{
                    delay: 1500
                }}

            >
                {categoryInSwiper?.map((item) => {
                    return <SwiperSlide style={{border:'none'}}>
                        <Link to={`/categories/${item?._id}`}>
                            <div
                                onClick={() => {
                                    getproductsInCategory(item?._id
                                    )
                                }}
                                className="flex cursor-pointer bg-mainLight gap-3 pb-2 flex-col  items-center justify-center">
                                <img src={item?.image} className='h-[320px] object-cover categorySlide ' alt={item?.name} />
                                <p className='text-[18px] font-extrabold text-darkPrimary'>{item?.name}</p>
                            </div>
                        </Link>

                    </SwiperSlide>
                })}
            </Swiper>}
        </div >
    )
}   
