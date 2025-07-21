import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { Facebook, Heart, Instagram, Linkedin, Menu, ShoppingCart, Slack, X } from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishlistContext';


function Navbar() {
    let { numOfCartItems, getLoggedUserCart } = useContext(CartContext)
    const [isMobileOpen, setMobileOpen] = useState(false)
    const { getLoggedUserWishlist, numOfProdcuts } = useContext(WishListContext)
    function toggleMobileMenu() {
        if (isMobileOpen == true) {
            setMobileOpen(false)
        } else {
            setMobileOpen(true)
        }
    }
    const { token, setToken } = useContext(AuthContext)
    const LogOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem('userId')
        setToken(null)
    }

    useEffect(() => {
        getLoggedUserCart()
    }, [])
    useEffect(() => {
        getLoggedUserWishlist()
    }, [])
    return (
        <>
            {/* Navbar */}
            <header className='bg-mainLight shadow-xl py-5  z-50 '>
                {/* Main Logo */}
                <div className='container flex justify-between items-center'>
                    <div className='flex gap-10 items-center '>
                        <div className="flex items-center gap-2">
                            <Slack className='text-darkPrimary size-10' />
                            <h1 className=' capitalize mt-0 font-bold text-[30px] text-darkPrimary '>freshCart</h1>
                        </div>

                        {/* Pages Links *****************************/}
                        {token ?
                            <ul className=' hidden md:flex items-center md:gap-2.5 gap-8'>
                                <li>
                                    <NavLink className={({ isActive }) => { return isActive ? 'active-link' : 'normal-link hover:text-primary font-medium  transition-all duration-300' }} to="/">Home</NavLink>
                                </li >
                                <li>
                                    <NavLink className={({ isActive }) => { return isActive ? 'active-link' : 'normal-link hover:text-primary font-medium  transition-all duration-300' }} to="/products">Products</NavLink>
                                </li >
                                <li>
                                    <NavLink className={({ isActive }) => { return isActive ? 'active-link' : 'normal-link hover:text-primary font-medium  transition-all duration-300' }} to="categories" >Categories</NavLink>
                                </li >
                                <li>
                                    <NavLink className={({ isActive }) => { return isActive ? 'active-link' : 'normal-link hover:text-primary font-medium  transition-all duration-300' }} to="brands">Brands</NavLink>
                                </li >
                                <li>
                                    <NavLink className={({ isActive }) => { return isActive ? 'active-link' : 'normal-link hover:text-primary font-medium  transition-all duration-300' }} to="/allorders" >Orders</NavLink>
                                </li >
                            </ul> : null
                        }
                    </div>
                    {/* Auth Links *********************************/}

                    <ul className=' hidden md:flex items-center  gap-1.5'>
                        {/* WishList ICon */}
                        {token ? <li className='px-2'>
                            <Link to='/wishlist'>
                                <Heart className={`${numOfProdcuts ? 'animate-bounce text-darkPrimary' : 'animate-none text-primary'}`} />
                            </Link>
                        </li> : null}
                        {/* Cart Icon  ******************************/}
                        {token ? <li className=' relative'>
                            <Link to="/cart">
                                <ShoppingCart className='text-primary' /></Link>
                            {numOfCartItems ? <div className='bg-primary text-white size-6 rounded-full absolute -left-4 -top-5.5 text-center'>
                                {numOfCartItems}
                            </div> : null}

                        </li> : null}
                        {/* X Icon ***********************************/}
                        <li className='group  '>
                            <Link to={'https://x.com/'} target='_blank'>
                                <X className=' text-darkPrimary social-icon-effect' />
                            </Link>
                        </li>
                        {/*Linkedin Icon ******************************/}
                        <li className='group'>
                            <Link to={'https://www.linkedin.com/feed/'} target='_blank'>
                                <Linkedin className='text-blue-500 social-icon-effect' />
                            </Link>
                        </li>
                        {/* Instgram Icon *****************************/}
                        <li className='group'>
                            <Link to={'https://www.instagram.com/'} target='_blank'>
                                <Instagram className='text-red-500 social-icon-effect' />
                            </Link>
                        </li>
                        {/* FaceBook Icon *******************************/}
                        <Link to={`https://www.facebook.com/?locale=ar_AR`} target='_blank'>
                            <li className='group'>
                                <Facebook className='text-blue-700 social-icon-effect' />
                            </li>
                        </Link>
                        {/* LogOut Link And login or register ************/}
                        {token ?
                            <li className='normal-link hover:text-primary font-medium  transition-all duration-300' >
                                <NavLink className={({ isActive }) => { return isActive ? 'active-link' : 'noraml-link hover:text-primary font-medium  transition-all duration-300 ' }} to="/login" onClick={LogOut}>
                                    Log out
                                </NavLink>
                            </li>
                            : <>
                                <li className='normal-link hover:text-darkPrimary font-medium  transition-all duration-300'>
                                    <NavLink className={({ isActive }) => { return isActive ? 'active-link' : 'normal-link hover:text-primary font-medium  transition-all duration-300' }} to="/login">
                                        Login
                                    </NavLink>
                                </li>
                                <li className='normal-link hover:text-darkPrimary font-medium  transition-all duration-300'>
                                    <NavLink className={({ isActive }) => { return isActive ? 'active-link' : 'normal-link hover:text-primary font-medium  transition-all duration-300' }} to="/register">
                                        Register
                                    </NavLink>
                                </li>
                            </>}
                    </ul>
                    {/* Toggle icon on responsive *************************/}
                    <div className='block md:hidden'>
                        <div className='flex items-center justify-center gap-2'>
                            {token ? <div>
                                <Link to='/wishlist'>
                                    <Heart className={`size-6 ${numOfProdcuts ? 'animate-pulse  text-darkPrimary' : 'animate-none text-darkPrimary'}`} />
                                </Link>
                            </div> : null}
                            {token ? <div className=' relative '>
                                <NavLink className={({ isActive }) => { return isActive ? 'active-link' : 'normal-link hover:text-darkPrimary font-medium  transition-all duration-300' }} to="/cart"><ShoppingCart className='text-darkPrimary' />
                                </NavLink>
                                {numOfCartItems ? <div className='bg-darkPrimary text-white size-5 flex items-center justify-center rounded-full absolute -left-4 -top-5.5'>
                                    {numOfCartItems}
                                </div> : null}
                            </div> : null}

                            {token ? <Menu onClick={toggleMobileMenu} className='size-6 cursor-pointer text-darkPrimary' /> : null}
                        </div>
                    </div>
                </div>
                {/* In Mobile ***********************************************/}
                <div className={`container block md:hidden transition-all py-3 px-3  ${isMobileOpen ? `max-h-120 opcaity-100 duration-700` : `max-h-0 opacity-0 duration-700`}`}>
                    {token ?
                        <ul className='flex flex-col items-center justify-center gap-y-5 '>
                            <li>
                                <NavLink className={({ isActive }) => { return isActive ? 'active-link' : 'normal-link hover:text-primary font-medium  transition-all duration-300' }} to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => { return isActive ? 'active-link' : 'normal-link hover:text-primary font-medium  transition-all duration-300' }} to="/products">Products</NavLink>

                            </li>
                            <li>
                                <NavLink className={({ isActive }) => { return isActive ? 'active-link' : 'normal-link hover:text-primary font-medium  transition-all duration-300' }} to="categories" >Categories</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => { return isActive ? 'active-link' : 'normal-link hover:text-primary font-medium  transition-all duration-300' }} to="brands">Brands</NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => { return isActive ? 'active-link' : 'normal-link hover:text-primary font-medium  transition-all duration-300' }} to="/allorders" >Orders</NavLink>
                            </li>
                            <li onClick={LogOut}>
                                <NavLink className={({ isActive }) => { return isActive ? 'active-link' : 'normal-link hover:text-primary font-medium transition-all duration-300' }} to='/login'>Log Out</NavLink>
                            </li>
                            <div className="flex justify-center items-center gap-4">
                                {/* X Icon In Mobile ***************************/}
                                <li className='group  '>
                                    <Link to={'https://x.com/'} target='_blank'>
                                        <X className=' text-darkPrimary social-icon-effect' />
                                    </Link>
                                </li>
                                {/*Linkedin Icon ******************************/}
                                <li className='group'>
                                    <Link to={'https://www.linkedin.com/feed/'} target='_blank'>
                                        <Linkedin className='text-blue-500 social-icon-effect' />
                                    </Link>
                                </li>
                                {/* Instgram Icon *****************************/}
                                <li className='group'>
                                    <Link to={'https://www.instagram.com/'} target='_blank'>
                                        <Instagram className='text-red-500 social-icon-effect' />
                                    </Link>
                                </li>
                                {/* FaceBook Icon *******************************/}
                                <li className='group'>
                                    <Link to={`https://www.facebook.com/?locale=ar_AR`} target='_blank'>
                                        <Facebook className='text-blue-700 social-icon-effect' />
                                    </Link>
                                </li>
                            </div>

                        </ul> : null
                    }

                </div>
            </header>
        </>
    )
}
export default Navbar
