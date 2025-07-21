import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import { WishListContext } from '../../Context/WishlistContext'
import { ShoppingCart, Star, Trash2 } from 'lucide-react'
export default function WishlistProducts({ wishlistProducts }) {
    const { addProductToCart } = useContext(CartContext)
    const { removeProductFromWishlist } = useContext(WishListContext)

    return (<>
        {wishlistProducts?.map((product) => {
            return <div key={product?._id} className="flex flex-col lg:flex-row justify-between items-center border-b border-b-gray-200 py-8">
                {/* Left side  */}
                <div className="flex items-center gap-5">
                    <div className="image-wrapper border border-gray-200 max-w-[250px] rounded-2xl overflow-hidden">
                        <img src={product?.imageCover} className='h-[250px] object-contain w-full' alt="product1-Image" />
                    </div>
                    {/* Product Details */}
                    <div className="product-info flex flex-col gap-1">
                        <h2 className='text-[22px] font-extrabold text-darkPrimary'>{product?.title.split(" ", 3).join(" ")}</h2>
                        <p className='flex items-center gap-1.5'>
                            <span className='text-darkPrimary text-[17px]'>Rate :  </span>
                            <Star className='size-5 text-primary' />
                            <span className='text-primary text-[17px]'> {product?.ratingsAverage}</span>
                        </p>
                        <p>
                            <span className='text-darkPrimary text-[17px]'>Price : </span>
                            <span className='text-primary text-[17px]'>{product?.price} EGP</span>
                        </p>
                        <p className='text-[16px]'>
                            <span className='text-gray-500'>{product?.category.name} |  </span>
                            <span className='text-gray-500'>{product?.brand.name} | </span>
                            <span className='text-primary'>Available </span>
                        </p>
                    </div>
                </div>
                {/* RIght Side */}
                <div className="flex  items-center gap-3">
                    <div
                        onClick={() => {
                            addProductToCart(product?._id)
                        }}
                        className="shopping-cart group  cursor-pointer bg-primary flex items-center justify-center gap-1.5 px-10 py-2 rounded-full">
                        <ShoppingCart className='text-white size-5 transition-all duration-200 group-hover:animate-bounce' />
                        <span className='text-[14px] font-medium text-white uppercase'>add to cart</span>
                    </div>
                    <div
                        onClick={() => {
                            removeProductFromWishlist(product?._id)
                        }}
                        className="remove-product group cursor-pointer flex items-center justify-center gap-1.5 bg-red-500 px-5 py-2 rounded-full">
                        <Trash2 className='text-white size-5 transition-all duration-200 group-hover:animate-bounce' />
                        <span className='text-[14px] font-medium text-white uppercase'>remove</span>

                    </div>
                </div>
            </div>
        })}
    </>
    )
}
