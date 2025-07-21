
import { ArrowLeft, Heart } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { WishListContext } from '../../Context/WishlistContext'
import DetailsLoader from '../../components/Details-loader/DetailsLoader'
import NoProducts from '../../components/NoProducts/NoProducts'
import WishlistProducts from '../../components/WishlistProducts/WishlistProducts'

export default function Wishlist() {
    const { getLoggedUserWishlist, isLoading, wishlistProducts, numOfProdcuts } = useContext(WishListContext)
    useEffect(() => {
        getLoggedUserWishlist()
    }, [])
    if (isLoading) {
        return <DetailsLoader />
    }
    return (
        <div className='bg-mainLight container  my-10 rounded-2xl p-10  '>
            {/* WishList header : */}
            <div className="flex items-center gap-5">

                <div className="bg-primary flex items-center justify-center  text-white size-8 rounded-full">
                    <Link to='/'><ArrowLeft /></Link>
                </div>
                <div className="flex items-center gap-1">
                    <p className='text-darkPrimary text-[25px] font-extrabold'>Favorite Products</p>
                    <div className="flex justify-center items-center bg-primary rounded-full text-white size-8">
                        <Heart className='size-5' />
                    </div>
                </div>

            </div>
            {numOfProdcuts == 0 ? <NoProducts /> : <WishlistProducts wishlistProducts={wishlistProducts} />}

        </div>
    )
}
