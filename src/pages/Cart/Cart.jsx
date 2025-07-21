
import { useContext, useEffect } from 'react'
import ProductInCart from '../../components/ProductInCart/ProductInCart'
import { CartContext } from '../../Context/CartContext'
import { ArrowLeft } from 'lucide-react'
import DetailsLoader from '../../components/Details-loader/DetailsLoader'
import Checkout from '../../components/Checkout/Checkout'
import { Link } from 'react-router-dom'
import EmptyCart from '../../components/EmptyCart/EmptyCart'
export default function Cart() {
    let { cart, getLoggedUserCart, isLoading, totalCartPrice, numOfCartItems, clearUserCart } = useContext(CartContext)

    useEffect(() => {
        getLoggedUserCart()
    }, [])


    return (
        <>
            <main className="cart my-10">
                <section className="container bg-mainLight px-10 py-5 rounded-2xl">
                    {/* Cart Header  */}
                    <header className=' flex items-center mb-10 justify-between'>
                        <div className='flex items-center  gap-4'>
                            {/* Arrow to go home page */}
                            <Link to='/'>
                                <div className='arrow-wrapper size-8 rounded-full flex justify-center items-center bg-primary'>
                                    <ArrowLeft className='text-white cursor-pointer text-lg' />
                                </div>
                            </Link>
                            <h1 className='text-darkPrimary font-extrabold text-2xl'>Shop cart</h1>
                        </div>
                        {/* Totla Price In Cart */}
                        <div className='flex items-center gap-1.5'>
                            <span className='text-darkPrimary text-[16px] font-medium'>Total Price :</span>
                            <p className='text-primary text-[16px] font-extrabold'>EGP {totalCartPrice}</p>
                        </div>
                    </header>
                    {/* Products In Cart */}
                    {isLoading ? <DetailsLoader /> : <div className="flex flex-col gap-20">
                        {cart?.map((item, index) => {
                            return <ProductInCart key={index} item={item} />
                        })}
                    </div>}
                    {/* Delete ALl products button In cart  */}
                    {numOfCartItems && numOfCartItems > 0 ? <div onClick={clearUserCart}
                        className='bg-primary cursor-pointer text-white hover:bg-darkPrimary max-w-[200px] mx-auto text-center rounded-lg my-5 px-4 py-2 transition-all duration-200'>
                        Delete All Products</div>
                        : <EmptyCart />}
                    {/* CHECK OUT IN CART */}
                    <Checkout totalPrice={totalCartPrice} />

                </section>
            </main>

        </>
    )
}
