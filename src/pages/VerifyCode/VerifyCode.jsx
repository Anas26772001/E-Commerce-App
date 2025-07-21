import axios from 'axios'
import { useFormik } from 'formik'
import { Mail, X } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

export default function VerifyCode() {
    const navigate = useNavigate()
    async function verifyResetCode(resetCode) {
        const toastId = toast.loading('Waiting...')
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode, })
            if (response.status === 200 || response.statusText === "Ok") {
                console.log('Code verified Successfully')
                toast.success(response.data.status)
                navigate('/ResetPassword')
            } else {
                console.log('Error in verifying your code')
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            toast.dismiss(toastId)
        }
    }
    const verifyCodeFormik = useFormik({
        initialValues: { resetCode: '' },
        onSubmit: (x) => { verifyResetCode(x.resetCode) }
    })
    return (
        <section className='container flex   justify-center items-center flex-col gap-5 min-h-[60vh]'>
            <header className='flex flex-col gap-2 items-center '>
                <Mail className='size-10 text-primary animate__bounce  animate__animated  animate__infinite' />
                <p className='text-primary text-[25px] font-extrabold'>Check Your Email</p>
                <p className='text-[14px] text-darkPrimary font-medium'>Reset code sent to your email</p>
            </header>
            <form onSubmit={verifyCodeFormik.handleSubmit} >
                <div className="flex flex-col gap-1.5">
                    <input
                        value={verifyCodeFormik.values.resetCode}
                        onChange={verifyCodeFormik.handleChange}
                        onBlur={verifyCodeFormik.handleBlur}
                        name='resetCode'
                        placeholder='Enter reset code'
                        type='text'
                        className='text-[14px] text-darkPrimary  outline-none placeholder:text-gray-500 placeholder:text-[14px] border  border-gray-300 focus:border-primary transition-all duration-200 px-3 py-1 rounded-lg' id='emailInput' />
                </div>
                <div className="flex flex-col gap-1 my-2">
                    <button type='submit' className='bg-primary  text-center min-w-[250px]   cursor-pointer py-1 text-white font-bold rounded-lg'>Next</button>
                    <Link to='/forgetPassword' className='text-primary text-[15px] font-bold hover:underline text-center block '>Back to forget your password</Link>
                </div>
            </form>


        </section>

    )
}
