import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import toast from 'react-hot-toast'

export default function ResetPassword() {
    const navigate = useNavigate()
    const { setToken, verifyPass } = useContext(AuthContext)
    async function resetPassword(values) {
        const toastId = toast.loading('Waiting....')
        try {
            const response = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
            if (response.status == 200 || response.statusText == "Ok") {
                console.log('Password Changed Successfully')
                toast.success('Password Changed Successfully')
                localStorage.setItem('token', response.data.token)
                setToken(response.data.token)
                await verifyPass()
                navigate('/')
            } else {
                console.log('Error in Changing Pasword')
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            toast.dismiss(toastId)
        }
    }
    const resetPasswordFormik = useFormik({
        initialValues: {
            email: 'anassawah267@gmail.com',
            newPassword: ''
        },
        onSubmit: async (x) => { resetPassword(x) }
    })
    return (
        <section className='container flex justify-center items-center flex-col gap-5 min-h-[60vh]'>
            <header className='flex flex-col gap-2 items-center '>
                <p className='text-primary text-[25px] font-extrabold'>Create New Password</p>
                <p className='text-[13px] text-gray-400 animate__shakeX animate__slower animate__infinite animate__animated font-medium text-wrap max-w-[250px] text-center'>The Password should be different from the previous password.</p>
            </header>
            <form onSubmit={resetPasswordFormik.handleSubmit} >
                <div className="flex flex-col gap-2">
                    <div className="password-input">
                        <input
                            placeholder='New Password'
                            value={resetPasswordFormik.values.newPassword}
                            onChange={resetPasswordFormik.handleChange}
                            name='newPassword'
                            type='password'
                            className='text-[14px] text-darkPrimary  placeholder:text-gray-400 placeholder:text-[13px] outline-none border  border-gray-300 focus:border-primary transition-all duration-200 px-3 py-1 rounded-lg'
                        />
                    </div>
                    <div className="repassword-input">
                        <input
                            placeholder='Confirm password'
                            type='password'
                            className='text-[14px] text-darkPrimary  outline-none border placeholder:text-gray-400 placeholder:text-[13px]  border-gray-300 focus:border-primary transition-all duration-200 px-3 py-1 rounded-lg' />
                    </div>
                </div>
                <div className="flex flex-col gap-1 my-2">
                    <button type='submit' className='bg-primary  text-center min-w-[250px]   cursor-pointer py-1 text-white font-bold rounded-lg'>
                        Reset Password
                    </button>
                    <Link to='/login' className='text-primary text-[15px] font-bold hover:underline text-center block '>Back to log in</Link>
                </div>
            </form>


        </section>
    )
}
