import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { data, Link, useNavigate } from 'react-router-dom'
import * as yup from "yup"
import { AuthContext } from '../../Context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'
export default function Login() {
    const [errorLogin, setErrorLogin] = useState("")
    let { setToken, verifyPass } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState('password')
    function toggleShowPass() {
        setShowPassword(showPassword === 'password' ? 'text' : 'password')
    }
    let navigatePages = useNavigate()
    async function sendDataToSignUp(entireData) {
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
            method: "post",
            data: entireData
        }

        let toastId = toast.loading("Waiting...")
        try {
            const response = await axios.request(options)
            toast.success(`Welcome back`, {
                duration: 1500,
            })
            setErrorLogin(response.data.message)
            navigatePages("/")
            localStorage.setItem("token", response.data.token)
            setToken(response.data.token)
            verifyPass()
        } catch (error) {
            setErrorLogin(error.response.data.message)
            toast.error(error.response.data.message, {
                id: "toastId",
                duration: 10000,
            })
        } finally {
            toast.dismiss(toastId)
        }

    }
    //  const passRegex = /^[A-Z|a-z|0-9]{5,}[A-Z][a-z]$/
    const validationSchema = yup.object({
        email: yup.string().required("Email Required").email("This field Should be right email"),
        password: yup.string().required("Passord Required")

    })
    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (x) => {
            console.log(x)
            sendDataToSignUp(x)
        },
        validationSchema

    })

    return (
        <>
            <div className="  flex items-center min-h-[70vh] justify-center py-5">
                <div className="max-w-md w-full animate__fadeInUp animate__animated bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-[15px] font-bold text-gray-900 mb-6 text-center">Login</h2>
                    <form className="space-y-1" onSubmit={formik.handleSubmit} >
                        {/* Email Field *************************** */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name='email'
                                className=" input-filed" placeholder="your@email.com" />
                            {formik.errors.email && formik.touched.email ? <p className='input-guide'>
                                {formik.errors.email}
                            </p> : null}

                        </div>
                        {/* Password Field ************************** */}
                        <div className='relative'>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type={showPassword}
                                value={formik.values.password}
                                name='password'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange} className="input-filed" placeholder="••••••••" />
                            {formik.errors.password && formik.touched.password ? <p className='input-guide'>
                                {formik.errors.password}
                            </p> : null}
                            <div className=' absolute top-[45%] translate-x-[-50%] right-2' onClick={toggleShowPass}>
                                {showPassword == 'password' ? <EyeOff className='eye-icon' /> : <Eye className='eye-icon' />}
                            </div>
                        </div>
                        {errorLogin && <p className='text-darkPrimary text-[14px] text-center'>{errorLogin}</p>}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-darkPrimary focus:text-darkPrimary" />
                                <span className="ml-2 text-sm text-darkPrimary">Remember me</span>
                            </label>
                            <Link to="/forgetPassword" className="text-sm text-darkPrimary hover:text-darkPrimary">Forgot password?</Link>
                        </div>
                        {/* Sign in Button *****************************  */}
                        <button className="w-full bg-darkPrimary hover:bg-darkPrimary text-white font-medium my-2 py-2.5 rounded-lg transition-colors">
                            Sign In
                        </button>
                    </form>
                    {/* Don't have an account in login  */}
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?
                        <Link to="/register" className="text-darkPrimary hover:text-darkPrimary font-medium">Sign up</Link>
                    </div>
                </div>
            </div >
        </>
    )
}
