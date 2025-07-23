
import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import * as Yup from 'yup'
import { CartContext } from '../../Context/CartContext'
import { useNavigate } from 'react-router-dom'
export default function Checkout({ totalPrice }) {
    // ^ Import cartId From CartContext
    let { cartId, getLoggedUserCart } = useContext(CartContext)
    const [paymentMethod, setPaymentMethod] = useState('cash')
    const navigate = useNavigate()

    //  ^ Pay Online
    async function payOnline(values) {
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
                { shippingAddress: values },
                { headers: { token: localStorage.getItem('token') } })
            if (data.status == 'success') {
                window.location.href = `https://e-commerce-app-nine-rho.vercel.app/${data.session.url}`
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    // ^ pay Cash 
    async function payCash(values) {
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
                { shippingAddress: values },
                { headers: { token: localStorage.getItem('token') } }
            )
            console.log(data)

            navigate('/allorders')
            getLoggedUserCart()
        } catch (error) {
            console.log(error.message)
        }
    }
    //  ^ Validaion with Yup
    const phoneRegex = /^01[0125][0-9]{8}$/
    const validationSchema = Yup.object({
        city: Yup.string().required('city required').min(4, 'Must be at least 4 chars'),
        phone: Yup.string().required('phone required').matches(phoneRegex, 'must be egyption phone number'),
        details: Yup.string().required('Details required')
    })
    // ^ Formik to controlled Form 
    const formik = useFormik({
        initialValues: {
            city: '',
            phone: '',
            details: ''
        },
        onSubmit: (x) => {
            if (paymentMethod === 'cash') {
                payCash(x)
            } else {
                payOnline(x)
            }
        }, validationSchema
    })

    return (
        <>
            <div className='  mt-15 '>
                {/* CHeck out Header  */}
                <div className='checkOut-header my-5 flex flex-col items-center justify-center gap-2'>
                    <div className='bg-primary min-w-[200px] h-[2px]'></div>
                    <h2 className='text-[18px]  font-bold text-primary '>Check Out</h2>
                    <div className='bg-primary min-w-[200px]  h-[2px]'></div>
                </div>
                {/*  check out Box */}
                <div className="checkout-box mx-auto p-4  max-w-[450px] rounded-lg  border border-gray-400">
                    {/* check out header In Box  */}
                    <div className="checkout-header flex flex-col items-center justify-center gap-2 mb-5">
                        <h2 className='text-darkPrimary text-[18px] font-extrabold'>Cart total pirce : {totalPrice} EGP</h2>
                        <p className='text-darkPrimary text-[16px]  font-bold'>Sub total : <span className='text-primary text-[16px] font-medium'> EGP 1200</span></p>
                    </div>
                    {/* inputs */}
                    <div className='inputs '>
                        <form onSubmit={formik.handleSubmit}
                            className='flex flex-col mx-auto  max-w-[450px] gap-1'>
                            {/* CITY INPUT */}
                            <input
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name='city'
                                className='w-full focus:placeholder:text-primary  outline-none border-2 border-gray-300 rounded-lg py-2 px-4 focus:border-primary focus:border-2 transition-all duartion-200'
                                type='text'
                                placeholder='Enter your City name' />
                            {formik.errors.city && formik.touched.city ? <p className='input-guide'>{formik.errors.city}</p> : null}
                            {/* PHONE INPUT */}
                            <input
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                name='phone'
                                onBlur={formik.handleBlur}
                                className='w-full focus:placeholder:text-primary outline-none border-2 border-gray-300 rounded-lg py-2 px-4 focus:border-primary focus:border-2 transition-all duartion-200'
                                type='tel' placeholder='Enter your Phone' />
                            {formik.errors.phone && formik.touched.phone ? <p className='input-guide'>{formik.errors.phone}</p> : null}
                            {/* DETAILS INPUT */}

                            <textarea
                                value={formik.values.details}
                                onChange={formik.handleChange}
                                name='details'
                                onBlur={formik.handleBlur}
                                className='w-full focus:placeholder:text-primary min-h-[100px] max-h-[350px] outline-none border-2 border-gray-300 rounded-lg py-2 px-4 focus:border-primary focus:border-2 transition-all duartion-200'
                                type='text'
                                placeholder='Details' />
                            {formik.errors.details && formik.touched.details ? <p className='input-guide'>{formik.errors.details}</p> : null}
                            {/* Check out Btns */}
                            <div className="btns flex justify-center gap-5 my-4 items-center">
                                {/* cash order */}
                                <button type='submit'
                                    onClick={() => {
                                        setPaymentMethod('cash')
                                    }}
                                    className='cash-order-btn cursor-pointer rounded-xl flex justify-center items-center gap-2 bg-primary px-4 py-2'>
                                    <img src="/cash1-DfoK3QaK.png" alt='pay-cash' className='size-8' />
                                    <span className='text-white text-[16px]'>Cash order</span>
                                </button>
                                {/* onlone order */}
                                <button type='submit'
                                    onClick={() => {
                                        setPaymentMethod('online')
                                    }}
                                    className='online-order-btn cursor-pointer rounded-xl flex justify-center items-center gap-2 bg-primary px-4 py-2'>
                                    <img src="/online1-CDuK_NPr.png" alt='pay-online' className='size-8' />
                                    <span className='text-white text-[16px]'>Online order</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
