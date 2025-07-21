import React from 'react'

export default function DetailsSkelaton() {
    return (
        <div>
            <div className="product-details  animate-pulse">
                <div className="container flex flex-col gap-10 md:flex-row  md:flex md:gap-20  mt-10 ">
                    <div className="image-wrapper shadow-none p-4  max-h-[500px] mb-20 mx-auto ">
                        <div className="h-full w-full bg-gray-200" />
                    </div>
                    <div className="product-info flex flex-col gap-3 p-4 grow">
                        <div className="flex items-center justify-between ">
                            <div className="bg-gray-200 rounded h-6 w-40" />
                            <div className="size-10 rounded-full bg-primary text-white flex justify-center items-center">
                                <div className="animate-pulse bg-gray-200 p-2 rounded-full" />
                            </div>
                        </div>
                        <div className="product-category bg-gray-200 rounded h-4 w-44" />
                        <div className="product-brand-and-available space-x-2">
                            <div className="bg-gray-200 rounded h-4 w-20 inline-block" />
                            <div className="bg-gray-200 rounded h-4 w-1 inline-block mt-2" />
                            <div className="bg-gray-200 rounded h-4 w-20 inline-block" />
                        </div>
                        <div className="product-rating flex gap-1">
                            <div className="animate-pulse bg-gray-200 p-2 rounded-full" />
                            <div className="bg-gray-200 rounded h-4 w-10 inline-block" />
                        </div>
                        <div className="product-description bg-gray-200 rounded h-5 w-full" />
                        <div className="product-price flex gap-1 items-center">
                            <div className="bg-gray-200 rounded h-5 w-8 inline-block" />
                            <div className="bg-gray-200 rounded h-5 w-10 inline-block" />
                        </div>
                        <div className="buy-product flex gap-2 items-center">
                            <div className=" rounded-md bg-primary flex justify-center items-center px-8 py-2">
                                <div className="animate-pulse bg-gray-200 p-2 rounded-full" />
                            </div>
                            <div className="flex items-center rounded-md text-white justify-center gap-3 bg-primary grow py-2">
                                <div className="animate-pulse bg-gray-200 p-2 rounded-full" />
                                <div className="bg-gray-200 rounded h-6 w-20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
