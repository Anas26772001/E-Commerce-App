import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'
import axios from 'axios'
import CategoriesSwiper from '../../components/CategoriesSwiper/CategoriesSwiper'
import DetailsLoader from '../../components/Details-loader/DetailsLoader'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Slack } from 'lucide-react'
export default function Home() {
    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [pagination, setPagination] = useState(null)
    //  ^ Get All Products
    async function getAllProducts(page = 1) {
        setIsLoading(true)
        try {
            const { data } = await axios(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
            setProducts(data.data)
            setPagination(data.metadata)
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getAllProducts()
    }, [])
    if (isLoading) {
        return <>
            <DetailsLoader />
            <div className="container my-10 bg-white">
                <h2 className="text-center text-3xl font-bold animate-pulse bg-gray-200 h-8 w-3/4 mx-auto rounded"></h2>
                <div className="max-w-60 my-2 mx-auto bg-gray-200 h-1 rounded"></div>
                <div className="products-layout py-5">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
                        <div className="bg-gray-100 animate-pulse rounded h-[350px] w-full"></div>
                        <div className="bg-gray-100 animate-pulse rounded h-[350px] w-full"></div>
                        <div className="bg-gray-100 animate-pulse rounded h-[350px] w-full"></div>
                        <div className="bg-gray-100 animate-pulse rounded h-[350px] w-full"></div>
                        <div className="bg-gray-100 animate-pulse rounded h-[350px] w-full"></div>
                        <div className="bg-gray-100 animate-pulse rounded h-[350px] w-full"></div>
                        <div className="bg-gray-100 animate-pulse rounded h-[350px] w-full"></div>
                        <div className="bg-gray-100 animate-pulse rounded h-[350px] w-full"></div>
                        <div className="bg-gray-100 animate-pulse rounded h-[350px] w-full"></div>
                        <div className="bg-gray-100 animate-pulse rounded h-[350px] w-full"></div>
                        <div className="bg-gray-100 animate-pulse rounded h-[350px] w-full"></div>
                        <div className="bg-gray-100 animate-pulse rounded h-[350px] w-full"></div>
                        <div className="bg-gray-100 animate-pulse rounded h-[350px] w-full"></div>
                    </div>
                </div>
            </div>
        </>
    }

    return (
        <div className="container my-5 ">
            <div className="grid grid-cols-12 min-h-[80vh]">
                <div className=" relative col-span-12 row-span-1  md:col-span-8 md:row-span-2">
                    <Swiper
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                        loop={true}
                        className="mySwiper"
                    >
                        <SwiperSlide style={{ border: 'none' }}>
                            <img src="/photo-1487744480471-9ca1bca6fb7d.avif" className='h-full w-full object-cover' alt="Product2-image" />
                            <div className="box absolute flex flex-col gap-5  top-10 left-10 right-10">
                                <div className=" max-w-[250px] flex items-center gap-2 bg-mainLight px-10 py-1 rounded-full">
                                    <Slack className='text-darkPrimary size-10 bg-mainLight' />
                                    <h1 className=' capitalize mt-0 font-bold text-[30px] text-darkPrimary '>freshCart</h1>
                                </div>
                                <p className='text-white text-left bg-mainLight/15 py-5 px-3 text-[15px] text-wrap'>
                                    Whether you’re looking for the freshest produce, pantry staples, or specialty items, FreshCart brings the supermarket to you, redefining the way you shop for groceries.
                                </p>
                                <a href='#products' className='bg-primary max-w-[150px] py-3 text-white rounded-full text-[15px] font-bold'>
                                    Get Started
                                </a>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide style={{ border: 'none' }}>
                            <img src="/product2-Cc8hawmZ.jpg" className='h-full w-full object-cover' alt="Product2-image" />
                        </SwiperSlide>
                        <SwiperSlide style={{ border: 'none' }}>
                            <img src="/product3-CjkhanyU.jpg" className='h-full w-full object-cover' alt="Product2-image" />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="col-span-6 md:col-span-4 row-span-1">
                    <img src="/product4-CxeAzYXu.jpg " className='h-full w-full' alt="Product2-image" />
                </div>
                <div className="col-span-6  md:col-span-4 row-span-1">
                    <img src="/product5-DZxbnV6L.jpg" className='h-full w-full' alt="Product2-image" />
                </div>
            </div>
            <CategoriesSwiper />
            <h2 id='products' className='text-center text-3xl font-bold'>Shope now by popular products</h2>
            <div className=' max-w-60  my-2  mx-auto bg-darkPrimary h-1'></div>
            <div className='products-layout py-5'>
                <div className="grid md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  gap-5">
                    {products?.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                    })}
                </div>
                <div className='Btns flex justify-center items-center gap-3 mt-10'>
                    {[...Array(pagination?.numberOfPages)].map((item, index) => (
                        <button key={index} onClick={() => {
                            getAllProducts(index + 1)
                        }}
                            className=' rounded-full size-10 cursor-pointer border border-darkPrimary text-darkPrimary hover:text-white hover:bg-darkPrimary transition-all duration-700'>{index + 1}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}
