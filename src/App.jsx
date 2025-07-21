
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import Home from "./pages/Home/Home"
import Products from "./pages/Products/Products"
import Brands from "./pages/Brands/Brands"
import Orders from "./pages/Orders/Orders"
import Categories from "./pages/Categories/Categories"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Cart from './pages/Cart/Cart'
import { Toaster } from 'react-hot-toast'
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes'
import AuthContextProvider from './Context/AuthContext'
import LoginProtected from './ProtectedRoutes/LoginProtected'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import { CartContextProvider } from './Context/CartContext'
import SpeicificCategory from './pages/ProductsInCategory/ProductsInCategory'
import ProductsInBrand from './pages/ProductsInBrand/ProductsInBrand'
import ProductsContextProvider from './Context/ProductsContext'
import Wishlist from './pages/Wishlist/Wishlist'
import WishlistContextProvider from './Context/WishlistContext'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword'
import VerifyCode from './pages/VerifyCode/VerifyCode'
import ResetPassword from './pages/ResetPassword/ResetPassword'
export default function App() {
  // ?? ********************** Routing ***************************
  const routes = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        // ?? ********************** Page Links***************************
        {
          index: true, element: <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        },
        {
          path: "/products", element: <ProtectedRoutes>
            <Products />
          </ProtectedRoutes>
        },
        {
          path: "/brands", element:
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
        },
        {
          path: "/brands/:brandId", element:
            <ProtectedRoutes>
              <ProductsInBrand />
            </ProtectedRoutes>
        },
        {
          path: "/allorders", element: <ProtectedRoutes>
            <Orders />
          </ProtectedRoutes>
        },
        {
          path: "/categories", element:
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
        },
        {
          path: "/categories/:id", element:
            <ProtectedRoutes>
              <SpeicificCategory />
            </ProtectedRoutes>
        },
        {
          path: "/cart", element:
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
        },
        {
          path: '/productDetails/:id', element:
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
        },
        // ?? ********************** Auth Links ***************************
        {
          path: "/register", element: <LoginProtected>
            <Register />
          </LoginProtected>
        },
        {
          path: "/login", element:
            <LoginProtected>
              <Login />
            </LoginProtected>
        },
        {
          path: '/forgetPassword',
          element:
            <ForgetPassword />
        },
        {
          path: '/verifycode',
          element:
            <VerifyCode />
        },
        {
          path: '/ResetPassword',
          element:
            <ResetPassword />
        },
        {
          path: '/wishlist',
          element: <ProtectedRoutes>
            <Wishlist />
          </ProtectedRoutes>
        }
      ]
    }
  ])
  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <ProductsContextProvider>
              <RouterProvider router={routes} />
              <Toaster position='top-center' />
            </ProductsContextProvider>
          </WishlistContextProvider>
        </CartContextProvider>
      </AuthContextProvider >
    </>
  )
}
