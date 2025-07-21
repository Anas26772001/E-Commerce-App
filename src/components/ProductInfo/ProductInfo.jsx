import { ArrowLeft, Heart, ShoppingCart, Star } from 'lucide-react'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import { WishListContext } from '../../Context/WishlistContext'

export default function ProductInfo({ product }) {

    let { addProductToCart } = useContext(CartContext)
    const { AddProductToWishlist, wishlistProducts } = useContext(WishListContext)
    const isAdded = wishlistProducts?.some((item) => (item?._id === product?._id))
    return (
        <>
            <div className="product-info flex flex-col   gap-3 p-4  mt-15 lg:mt-25  grow">
                <div className='flex items-center justify-between '>
                    <p className='text-primary text-[20px] font-bold'>{product?.category.name}</p>
                    <div className='size-10 rounded-full bg-primary text-white flex justify-center items-center'>
                        <Link to='/'> <ArrowLeft /></Link>
                    </div>
                </div>
                <div className="product-category text-[14px] text-primary font-semibold">{product?.slug}</div>
                <div className="product-brand-and-available space-x-2">
                    <span className='text-gray-400 text-[15px]'>{product?.brand.name}</span>
                    <span className='text-gray-400 text-[18px] '>|</span>
                    <span className='text-primary text-[18px] font-semibold '>{product?.quantity > 0 ? 'Available' : 'not Available'}</span>
                </div>
                <div className="product-rating flex gap-1">
                    <Star />
                    <span className='text-[16px] text-primary font-semibold'>{product?.
                        ratingsAverage
                    }</span>
                </div>
                <div className="product-description text-gray-400 text-[16px]">
                    {product?.description
                    }
                </div>
                <div className="product-price flex gap-1 items-center text-primary">
                    EGP <span className='font-extrabold text-[18px] '>{product?.price}</span>
                </div>
                <div className="buy-product flex gap-2 items-center">
                    <div className=' cursor-pointer rounded-md bg-primary flex justify-center items-center px-8 py-2'>
                        <Heart onClick={() => {
                            AddProductToWishlist(product?._id)
                        }}
                            className={`${isAdded ? 'text-red-500' : 'text-white'}`} />
                    </div>
                    <div className='flex items-center cursor-pointer rounded-md text-white justify-center gap-3 bg-primary grow py-2' onClick={function () {
                        addProductToCart(product?._id)
                    }}>
                        <ShoppingCart />
                        Add to cart
                    </div>
                </div>
            </div>

        </>
    )
}
