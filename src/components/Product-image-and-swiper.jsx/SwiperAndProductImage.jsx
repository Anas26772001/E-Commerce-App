import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import "swiper/css";

export default function SwiperAndProductImage({ product }) {
    return (
        <div>
            <div className="image-wrapper p-2 max-w-[350px] max-h-[350px]  mx-auto ">
                <img src={product?.imageCover}
                    className='h-full w-full object-contain'
                    alt="image" />
                <Swiper className="mySwiper mt-2 "
                    spaceBetween={10}
                    slidesPerView={3}
                    loop={true}
                    onSlideChange={(Swiper) => Swiper.activeIndex}
                    autoplay={{
                        delay: 500,
                        disableOnInteraction: false
                    }}
                    modules=
                    {[Autoplay]}>
                    {product?.images.map((image, index) => { return <SwiperSlide className='cursor-pointer' key={index}> <img src={image} className='image' alt='image' /></SwiperSlide> })}</Swiper></div>
        </div>
    )
}
