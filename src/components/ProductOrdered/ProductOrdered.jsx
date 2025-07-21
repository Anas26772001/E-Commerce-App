
export default function ProductOrdered({ productOrdered }) {
    return (
        <>
            <div className="order-info animate__backInUp animate__animated  flex gap-5 items-center">
                {/* Product Image ===> صوره المنتج */}
                <div className="image-wrapper h-[250px] max-w-[250px] rounded-lg overflow-hidden">
                    <img src={productOrdered?.product.imageCover} className='h-full rounded-lg  w-full object-cover' alt="mster-card-photo" />
                </div>
                {/*  Product Info ===> معلومات عن المنتج مثل السعر والبراند وهكذا  */}
                <div className="flex flex-col-gap-y-3">
                    <div className="product">
                        <h2 className='text-darkPrimary text-[18px] font-semibold'>{productOrdered?.product.title.split(" ", 3).join(" ")}</h2>
                        <p className='text-darkPrimary font-bold text-[16px]'>
                            Price : <span className='text-primary text-[15px] font-medium'>{productOrdered?.price} EGP</span>
                        </p>
                        <p className='text-darkPrimary text-[16px] font-bold'>
                            quantity : <span className='text-primary text-[15px] font-medium'>{productOrdered?.count}</span>
                        </p>
                        <div className=' flex flex-col gap-.5'>
                            <p className='text-darkPrimary text-[16px] font-bold'>{productOrdered?.product.brand.name}</p>
                            <span className='text-primary text-[15px] font-medium'>
                                {productOrdered?.product.category.name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
