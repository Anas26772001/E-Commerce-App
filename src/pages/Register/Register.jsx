import axios from 'axios'
import { Formik, useFormik } from 'formik'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup"
export default function Register() {
    // const [name, setName] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [rePassword, setRePassword] = useState("")
    // const [phone, setPhone] = useState("")
    // !! HELPER SHAPE OF DATA FROM SICNUP API 
    // }
    // "name": "Ahmed Abd Al-Muti",
    //     "email": "ahmedmuttii4012@gmail.com",
    //         "password": "Ahmed@123",
    //             "rePassword": "Ahmed@123",
    //                 "phone": "01010700701"
    // }
    // async function sendDataToSignUp(values) {
    //     const options = { data: values, url: "https://ecommerce.routemisr.com/api/v1/auth/signup", method: "post" }
    //     const res = await axios.request(options)
    //     console.log(res)
    // }
    // function handleSubmit(e) {
    //     e.preventDefault()
    //     const data = { name, email, password, rePassword, phone }
    //     console.log(data)
    //     sendDataToSignUp(data)
    // }
    let navigatePages = useNavigate()
    async function sendDataToSignUp(entireData) {
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
            method: "post",
            data: entireData,
        }
        const toastId = toast.loading("    Waiting    ")
        try {
            const response = await axios.request(options)
            toast.success(response.data.message, {
                id: "toastId",
                duration: 5000,
            })
            console.log(response.data.user.name)
            localStorage.setItem('UserName', response.data.user.name)
            navigatePages("/login")
        } catch (error) {
            toast.error(error.response.data.message, {
                id: "toastId",
                duration: 5000,
            })
        }
        finally {
            toast.dismiss(toastId)
        }
    }
    // ** Paswords && Phone Regexes 
    // !! PASSWORD && PHONE REGEXES
    const passRegex = /^\d{6}[A-Z]{2}[a-z]{2}$/
    const phoneRegex = /^01[0125][0-9]{8}$/
    // !! VALIDATION SCHEMA :
    const validationSchema = yup.object({
        name: yup.string().required("Name Required").min(4, "Name shoul be at least 4 chars").max(20, "Name must be less than 20 chars"),
        email: yup.string().required("Email Required").email("This field Should be right email"),
        password: yup.string().required("Passord Required").matches(passRegex, "At least 6 numbers , 2 capital letters , and 2 small letters "),
        rePassword: yup.string().required("Confirm Password Required").oneOf([yup.ref("password")], "Should mAtches password"),
        phone: yup.string().required("Phone Required").matches(phoneRegex, "Must be egyption Number")
    })
    // !! FORMIK TO STATE MANAGMENT  :
    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        onSubmit: (x) => {
            sendDataToSignUp(x)
        }, validationSchema
    })
    return (
        <>
            <div className="  flex items-center min-h-[70vh] justify-center py-5">
                <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8">
                    <h2 className="text-[15px] font-bold text-gray-900 mb-6 text-center">Register</h2>
                    <form className="space-y-1" onSubmit={formik.handleSubmit} >
                        {/* Name Field ************************/}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input type="text"
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="input-filed" placeholder="Enter your name" />

                            {formik.errors.name && formik.touched.name ? <p className='input-guide'>
                                {formik.errors.name}
                            </p> : null}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name='email'
                                className="input-filed" placeholder="your@email.com" />
                            {formik.errors.email && formik.touched.email ? <p className='input-guide'>
                                {formik.errors.email}
                            </p> : null}
                            {/* Password Field ************************/}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password"
                                value={formik.values.password}
                                name='password'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange} className="input-filed" placeholder="••••••••" />
                            {formik.errors.password && formik.touched.password ? <p className='input-guide'>
                                {formik.errors.password}
                            </p> : null}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input type="password"
                                value={formik.values.rePassword}
                                name='rePassword'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                className="input-filed" placeholder="••••••••" />
                            {formik.errors.rePassword && formik.touched.rePassword ? <p className='input-guide'>
                                {formik.errors.rePassword}
                            </p> : null}

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input type="tel"
                                value={formik.values.phone}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name='phone'
                                className="input-filed" placeholder="••••••••" />
                            {formik.errors.phone && formik.touched.phone ? <p className='input-guide'>
                                {formik.errors.phone}
                            </p> : null}

                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-darkPrimary focus:text-darkPrimary" />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-darkPrimary hover:text-darkPrimary">Forgot password?</a>
                        </div>
                        {/* Register Button ************************* */}
                        <button className="w-full cursor-pointer bg-darkPrimary hover:bg-darkPrimary text-white font-medium py-2.5 rounded-lg transition-colors">
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        You have an account?
                        <Link to="/login" className="text-darkPrimary hover:text-darkPrimary font-medium ">Sign in</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
