import { Star, X } from 'lucide-react'
import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
export default function ProductInCart({ item }) {

    // console.log(item)

    let { removeSpecificProduct, updateCartProductQuantity, disableBtn , } = useContext(CartContext)
    return (<>
        {/* Product in Cart */}
        <div className='product flex flex-col gap-10 lg:gap-15  items-center lg:flex-row'>
            {/* left Side on product */}
            <div className='flex min-w-[350px] gap-5'>
                <div className='image-wrapper max-h-[250px]'>
                    <img src={item?.product.imageCover}
                        className=' h-full w-full  object-contain  '
                        alt='image' />
                </div>
                <div className="product-details flex flex-col gap-3">
                    {/* product title */}
                    <h2 className='text-[16px] text-primary font-extrabold'>{item?.product.title}</h2>
                    {/* product rate  */}
                    <div className="product-rate flex items-center gap-1">
                        <Star className='text-primary' />
                        <span className='text-primary text-[16px] font-semibold'>{item?.product.ratingsAverage
                        }</span>
                    </div>
                    {/* product-price */}
                    <div className="product-price gap-1
                                 flex items-center ">
                        <span className='text-darkPrimary text-[16px]'>Price : </span>
                        <span className='text-primary font-bold '> EGP {item?.price}</span>
                    </div>
                    {/* product-details in footer */}
                    <div className="flex gap-1  items-center text-gray-400">
                        <span className='text-gray-400 text-[14px]'>{item?.product.category?.name} </span> |
                        <span className='text-gray-400 text-[14px]'>{item?.product.brand?.name}</span> | <span className='text-primary text-[16px] font-semibold'>Available</span>
                    </div>
                </div>
            </div>
            {/* right side on product */}
            <div className='grow w-full flex flex-row gap-4 2xl:gap-0 justify-evenly items-center'>
                <div className="incre-decre border-2 text-darkPrimary text-[16px] font-semibold border-gray-300 px-5 py-2 rounded-2xl flex items-center gap-5">
                    <button
                        disabled={disableBtn}
                        className=' disabled:cursor-not-allowed cursor-pointer' onClick={() => {
                            updateCartProductQuantity(item?.product._id, item?.count + 1)
                        }} >+</button>
                    <button className='
                    font-extrabold cursor-pointer text-[18px]'>{item?.count}</button>
                    <button disabled={disableBtn}
                        className='disabled:cursor-not-allowed cursor-pointer' onClick={() => {
                            updateCartProductQuantity(item?.product._id, item?.count - 1)
                        }}>-</button>
                </div>
                {/* total price */}
                <div className="total-price flex justify-center items-center flex-col">
                    <span className='text-darkPrimary text-[15px] font-semibold'>Total Price :</span>
                    <span className='text-primary text-[14px] '> EGP {item?.count * item?.price}</span>
                </div>
                {/* Delete product */}
                <button onClick={function () { removeSpecificProduct(item?.product._id) }} className='bg-primary min-w-[180px] hover:bg-darkPrimary cursor-pointer text-white text-[16px] border-white border-2 flex items-center gap-1 py-2 px-1 flex items-center justify-center rounded-xl'>
                    <X className='size-6' />
                    <span>Delete Product</span>
                </button>
            </div>
        </div>

    </>
    )
}
