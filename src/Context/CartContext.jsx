import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
export let CartContext = createContext(null)
export function CartContextProvider({ children }) {
    const [cart, setCart] = useState(null)
    const [numOfCartItems, setNumofCartItems] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)
    const [totalCartPrice, settotalCartPrice] = useState(null)
    const [cartId, setCartId] = useState(null)


    // ^ Get Logged user Cart 
    async function getLoggedUserCart() {
        setIsLoading(true)
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem('token')
                }

            })
            setCartId(data.cartId)
            setNumofCartItems(data.numOfCartItems)
            setCart(data.data.products)
            settotalCartPrice(data.data.totalCartPrice)
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    //  ^ Add Product to cart
    async function addProductToCart(productId) {
        let taostId = toast.loading('Adding your product')
        try {
            const res = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
                {
                    productId,
                },
                {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                }
            )
            toast.success(res.data.message)
            console.log(res)

            setNumofCartItems(res.data.numOfCartItems)
            settotalCartPrice(res.data.data.totalCartPrice)

        } catch (error) {
            console.log(error.message)
        } finally {
            toast.dismiss(taostId)
        }
    }
    //  ^ Remove Product From Cart
    async function removeSpecificProduct(removedProductId) {
        let removedToastId = toast.loading('Deleting your product')
        try {
            const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${removedProductId}`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            toast.success('Product deleted successfully')
            setCart(res.data.data.products)
            setNumofCartItems(res.data.numOfCartItems)
            settotalCartPrice(res.data.data.totalCartPrice)
        } catch (error) {
            console.log(error.message)
        } finally {
            toast.dismiss(removedToastId)
        }
    }
    // ^ Clear User Cart
    async function clearUserCart() {
        const toastId = toast.loading('Waiting...')

        try {
            const { data } = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

            setCart(data.products)
            setNumofCartItems(data.numOfCartItems)
            settotalCartPrice(0)
            toast.success('All Products Deleted Successfully')
        } catch (error) {
            console.log(error.message)
        } finally {
            toast.dismiss(toastId)
        }
    }
    // ^ Update quantity on products In Cart
    async function updateCartProductQuantity(updatedProductId, count) {
        setDisableBtn(true)
        let updatedToastId = toast.loading('Waiting')
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${updatedProductId}`, {
                count
            }, {
                headers: { token: localStorage.getItem('token') }
            })
            console.log(data)
            setCart(data.data.products)
            settotalCartPrice(data.data.totalCartPrice)
            toast.success(`Quantity of products updated`)
        } catch (error) {
            console.log(error.message)

        } finally {
            toast.dismiss(updatedToastId)
            setDisableBtn(false)
        }


    }
    return (
        <CartContext.Provider value={{ cart, totalCartPrice, cartId, disableBtn, numOfCartItems, updateCartProductQuantity, clearUserCart, isLoading, addProductToCart, getLoggedUserCart, removeSpecificProduct }}>
            {children}
        </CartContext.Provider>
    )
}
