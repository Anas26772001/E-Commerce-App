import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import SwiperAndProductImage from '../../components/Product-image-and-swiper.jsx/SwiperAndProductImage';
import DetailsLoader from '../../components/Details-loader/DetailsLoader';
import RelatedProducts from '../../components/Related-products/RelatedProducts';
function ProductDetails() {
    const [loading, setLoading] = useState(false)
    let { id } = useParams()

    const [product, setProduct] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState(null)
    async function getSpecificProduct() {
        setLoading(true)
        try {
            const { data } = await axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            getRelatedProducts(data.data.category._id)
            setProduct(data.data)
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }
    async function getRelatedProducts(categoryId) {
        try {
            const { data } = await axios(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`)
            console.log(data.data)
            setRelatedProducts(data.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getSpecificProduct()
    }, [id])
    return (<>
        <div className='product-details min-h-[100vh]'>
            <div className="container  flex flex-col gap-y-70 md:flex-row   md:flex md:gap-20  mt-5 ">
                {loading ? <DetailsLoader /> : <>
                    <SwiperAndProductImage product={product} />
                    <ProductInfo  product={product} />
                </>}
            </div>
        </div>

        <RelatedProducts relatedProducts={relatedProducts} />
    </>
    )
}

export default ProductDetails
