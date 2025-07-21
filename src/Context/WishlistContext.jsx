import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";
export const WishListContext = createContext(null)
export default function WishlistContextProvider({ children }) {
const [wishlistProducts, setWishlistProducts] = useState(null)
    const [numOfProdcuts, setNumOfProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    // ^  Add Product To WishList
    async function AddProductToWishlist(productId) {
        const toastId = toast.loading('Waiting...')
        
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
                { productId, },
                { headers: { token: localStorage.getItem('token') } })
            toast.success(data.message)
            await getLoggedUserWishlist()
        } catch (error) {
            console.log(error.message)
        } finally {
            toast.dismiss(toastId)
        }
    }
    // ^ Get Logged User Wishlist 
    async function getLoggedUserWishlist() {
        setIsLoading(true)
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
                headers: { token: localStorage.getItem('token') }
            })

            setNumOfProducts(data.count)
            console.log(data.count)
            setWishlistProducts(data.data)
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    // ^ Remove specific Product From wishList
    async function removeProductFromWishlist(productId) {
        const toastId = toast.loading('Waiting....')
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                { headers: { token: localStorage.getItem('token') } })
            await getLoggedUserWishlist()
            toast.success(data.message)
        } catch (error) {
            console.log(error.message)
        } finally {
            toast.dismiss(toastId)
        }
    }
    return (
        <WishListContext.Provider value={{ AddProductToWishlist, numOfProdcuts, isLoading, getLoggedUserWishlist, wishlistProducts, removeProductFromWishlist }}>
            {children}
        </WishListContext.Provider>
    )
}
