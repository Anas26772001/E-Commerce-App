import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import DetailsLoader from '../../components/Details-loader/DetailsLoader'
import ProductOrdered from '../../components/ProductOrdered/ProductOrdered'
import { Link } from 'react-router-dom'
import { ArrowLeft, CircleCheckBig, CircleSlash2, TruckElectric } from 'lucide-react'
export default function Orders() {
    const { userId } = useContext(AuthContext)
    const [orders, setOrders] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    async function getUserOrders() {
        setIsLoading(true)
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
            setOrders(data)
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getUserOrders()
    }, [])
    if (isLoading) (<DetailsLoader />)
    return (<div className="container min-h-[70vh] flex flex-col gap-5 my-5">
        {/* Track Orders Header */}
        <div className=" flex items-center gap-4 my-2 ">
            <Link to={'/'}>
                <div className="bg-primary p-2 rounded-full hover:scale-115 duration-300 transition-all">
                    <ArrowLeft className='  text-white size-6  ' />
                </div>
            </Link>
            <p className='text-primary text-[25px] font-extrabold'>Track Your orders</p>
            <TruckElectric className='size-12 text-primary' />
        </div>
        {orders?.map((item, index) => {
            return <div key={index} className=' rounded-xl border border-gray-300 flex flex-col gap-5'>
                <div className="orders py-2 px-5 ">
                    {/* Order ===========> Header  */}
                    <div className="order-header py-4 flex flex-col gap-2 justify-center items-center md:justify-between md:items-center  md:flex-row  border-b-1 border-b-gray-300">
                        <p className='text-darkPrimary text-[18px] font-bold'>
                            Transaction Number : <span className='text-primary text-[16px] font-medium'>
                                #{item?.id}</span>
                        </p>
                        <p className='text-darkPrimary text-[18px] font-bold'>
                            Placed on : <span className='text-primary text-[16px] font-medium'>{new Date(item?.createdAt).toLocaleDateString()}</span>
                        </p>
                        <p className='text-darkPrimary text-[18px] font-bold'>
                            Payment : <span className='text-primary text-[16px] font-medium'>{item?.paymentMethodType}</span>
                        </p>
                        <Link to='/'>
                            <button className='bg-primary px-4 cursor-pointer py-2 text-white text-center font-medium rounded-lg'>
                                Add new items
                            </button>
                        </Link>

                    </div>
                    {/* Order ============> body */}
                    <div className="order-body gap-3 py-2 place-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {item?.cartItems.map((productOrdered, index) => {
                            return <ProductOrdered key={index} productOrdered={productOrdered} />

                        })}
                    </div >
                    <div className='py-1 flex flex-col md:flex-row justify-between items-center '>
                        {/* Left Side on confirmed order */}
                        <div className='flex flex-col items-center justify-center md:justify-baseline md:items-start my-4  gap-2'>
                            <p className='text-darkPrimary text-[18px] font-bold'>
                                Products Quantity : <span className='text-primary text-[15px] font-medium'>{item?.cartItems?.length}</span>
                            </p>
                            <p className='text-darkPrimary text-[18px] font-bold'>
                                Shipping Price : <span className='text-primary text-[15px] font-medium'>{item?.shippingPrice} EGP </span>
                            </p>
                            <p className='text-darkPrimary text-[18px] font-bold'>
                                taxes : <span className='text-primary text-[15px] font-medium'>{item?.taxPrice} EGP </span>
                            </p>
                            <p className='text-darkPrimary text-[18px] font-bold'>
                                Total Order Price : <span className='text-primary text-[15px] font-medium'>{item?.totalOrderPrice} EGP</span>
                            </p>
                        </div>
                        <div className="border md:hidden border-gray-200 w-full my-4"></div>
                        {/* Right side on confirmed order */}
                        <ul className='flex flex-col items-center justify-center md:items-start md:justify-center  gap-3'>
                            <li className='flex justify-between gap-2 items-center'>
                                <h2 className='text-[17px] font-bold text-darkPrimary'>Ordered</h2>
                                <CircleCheckBig className='text-primary' />
                            </li>
                            <li className='flex justify-between gap-2 items-center'>
                                <h2 className='text-[17px] font-bold text-darkPrimary'>Confirmed</h2>
                                <CircleCheckBig className='text-primary' />
                            </li>
                            <li className='flex justify-between gap-2 items-center'>
                                <h2 className='text-[17px] font-bold text-darkPrimary'>Out for delivery</h2>
                                <CircleCheckBig className='text-primary' />
                            </li>
                            <li className='flex justify-between gap-2 items-center'>
                                <h2 className='text-[17px] font-bold text-darkPrimary'>Delivered</h2>
                                {item?.isDelivered ? <CircleCheckBig className='text-primary' /> : <CircleSlash2 className='text-red-500' />}

                            </li>
                            <li className='flex justify-between gap-2 items-center'>
                                <h2 className='text-[17px] font-bold text-darkPrimary'>Paid</h2>
                                {item?.isPaid ? <CircleCheckBig className='text-primary' /> : <CircleSlash2 className='text-red-500' />}

                            </li>
                        </ul>
                    </div>


                </div>
            </div>

        })}
    </div>

    )
}
