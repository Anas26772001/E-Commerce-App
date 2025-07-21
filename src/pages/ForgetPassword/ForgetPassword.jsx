
import axios from 'axios'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
export default function ForgetPassword() {
    const navigate = useNavigate()
    async function ForgetPassword(email) {
        const toastId = toast.loading('waiting')
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email })
            if (response.status == 200 && response.statusText == "OK") {
                toast.success(response.data.message)
                console.log('Reset code sent to your email....')
                navigate("/VerifyCode")
            } else { console.log('failed to sent to your email...') }
        } catch (error) {
            console.log(error.message)
        } finally {
            toast.dismiss(toastId)
        }
    }

    const emailFormik = useFormik({
        initialValues: { email: '' },
        onSubmit: (x) => { ForgetPassword(x.email) }
    })
    return (
        <div className='container animate__fadeInUp animate__animated  flex justify-center items-center flex-col gap-5 min-h-[60vh]'>
            <div className='flex flex-col gap-2 items-center '>
                <p className='text-primary text-[25px] font-extrabold'>Forgot your password?</p>
                <p className='text-[15px] text-gray-400 font-medium'>Your password will be reset by email.</p>
            </div>
            <form onSubmit={emailFormik.handleSubmit} >
                <div className="flex flex-col gap-1.5">
                    <label htmlFor='emailInput' className='text-gray-500 text-[14px]'>Enter your email address</label>
                    <input
                        id='emailInput'
                        name='email'
                        onBlur={emailFormik.handleBlur}
                        value={emailFormik.values.email}
                        onChange={emailFormik.handleChange}
                        type='email' className='text-darkPrimary text-[14px] outline-none border  border-gray-300 focus:border-primary transition-all duration-200 px-3 py-1 rounded-lg' id='emailInput' />
                </div>
                <div className="flex flex-col gap-1 my-2">
                    <button type='submit' className='bg-primary  text-center min-w-[250px]   cursor-pointer py-1 text-white font-bold rounded-lg'>
                        Next
                    </button>
                    <Link to='/login' className='text-primary text-[15px] font-bold hover:underline text-center block '>Back to login</Link>
                </div>
            </form>


        </div>

    )
}
