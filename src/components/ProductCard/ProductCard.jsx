import { Eye, Heart, ShoppingCart, Star } from 'lucide-react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import { WishListContext } from '../../Context/WishlistContext'

export default function ProductCard({ product }) {
    let { AddProductToWishlist, wishlistProducts } = useContext(WishListContext)
    let { addProductToCart } = useContext(CartContext)
    const idAdded = wishlistProducts?.some((item) => (item?._id === product?._id))
    return (
        <div className='card animate__fadeIn   animate__animated  relative group bg-white shadow-lg rounded-xl group'>
            <div className='image-wrapper overflow-hidden  rounded-2xl h-[350px] '>
                <img src={product?.imageCover}
                    className='w-full h-[100%] object-contain lg:object-cover'
                    alt="image" />
            </div>
            <div className='card-body p-4 pb-0'>
                <p className=' product-title text-[14px] text-primary'>{product?.title}</p>
                <p className=' product-category text-[14px] text-darkPrimary '>{product?.category.name}</p>
                <div className=' flex items-center gap-2'>
                    <span className='text-gray-400'>{product?.brand.name}</span>
                    <span className=' text-gray-400'>|</span>
                    <span className='text-primary'> {product?.quantity > 0 ? "Available" : "Out off stock"}</span>
                </div>
            </div>
            <div className='card-foot flex justify-between items-center p-4 pt-2'>
                <p className=' product-price text-primary text-[18px]'>EGP {product?.price}</p>
                <p className=' product-rating-average flex items-center gap-1'>
                    <Star className='text-yellow-600 size-4' />
                    {product?.ratingsAverage}
                </p>
            </div>
            <div className="icons-layer flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-1000 absolute top-[70%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                <div className={`icon cursor-pointer group-hover:-translate-y-30 duration-300 p-3 bg-primary/75 rounded-full hover:bg-primary/100 ${idAdded ? 'text-red-500' : 'text-white'}  `}>
                    <Heart onClick={() => {
                        AddProductToWishlist(product?._id)
                    }} />
                </div>
                <div className="icon cursor-pointer group-hover:-translate-y-20 duration-600 p-3 rounded-full bg-primary/75 hover:bg-primary/100 text-white">

                    <ShoppingCart onClick={() => {
                        addProductToCart(product?._id)
                    }} />

                </div>
                <div className="icon cursor-pointer group-hover:-translate-y-30 duration-900 p-3 rounded-full bg-primary/75 hover:bg-primary/100 text-white">
                    <Link to={`/productDetails/${product?._id}`}>
                        <Eye />
                    </Link>
                </div>

            </div>


        </div>
    )
}


