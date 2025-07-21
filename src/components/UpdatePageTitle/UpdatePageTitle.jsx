import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function UpdatePageTitle() {
    const location = useLocation()
    const pageTitltes = {
        '/': 'Home',
        '/products': "Products",
        '/brands': 'Brands',
        '/allorders': 'AllOrders',
        '/categories': "Categories",
        '/cart': "Cart",
        '/register': 'Register',
        '/login': "Login",
        '/forgetPassword': 'Forget Password',
        '/verifycode': 'Verify Code',
        '/ResetPassword': 'Reset Password',
        '/wishlist': 'Wishlist',
        '/productDetails/:id': 'Product Detailes',
        '/categories/:id': 'Specific Category',
        '/brands/:brandId': 'Specific Brand',
    }
    useEffect(() => {
        const currPath = location.pathname
        const newTitle = pageTitltes[currPath] || 'Fresh Cart'
        document.title = newTitle
    }, [location.pathname])

    return null

}
