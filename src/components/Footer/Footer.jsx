
import React from 'react'
export default function Footer() {
    return (
        <footer className='py-10 px-5 lg:px-0 bg-mainLight '>
            <div className="container ">
                <div className="the-main-parent flex flex-col gap-4">
                    <div className="footer-info flex flex-col gap-2">
                        <h2 className='text-darkPrimary text-[20px] font-bold'>
                            Get the FreshCart App
                        </h2>
                        <p className='text-gray-400 text-[16px]'>
                            We will send you a link, open it on your phone to download the app
                        </p>
                        <div className="flex flex-col md:flex-row gap-10 items-center ">
                            <input type='text' placeholder='Email...' className='px-2 py-1 bg-white focus:border-primary rounded-lg outline-none border border-gray-300 grow' />
                            <button className='px-5 py-2 text-white bg-darkPrimary rounded-lg text-center'>Share App Link</button>
                        </div>
                    </div>
                    <div className="footer-icons flex flex-col lg:flex-row justify-between items-center border-b-2 border-gray-200 py-3 border-t-2 ">
                        {/* left side on footer  */}
                        <ul className='flex gap-3 items-center'>
                            <li>
                                <p className='text-primary  text-[18px] font-medium'>Payment Partners</p>
                            </li>
                            <li>
                                <img src='/amazon-pay-C6yg0mFR.png' className='size-15 object-contain' alt='amazon-pay-photo' />
                            </li>
                            <li>
                                <img className='size-15 object-contain' src="/American-Express-Color-BA04NtD8.png" alt='American-express-photo' />
                            </li>
                            <li>
                                <img src="/mastercard-DpLisAk5.webp" className='size-15 object-contain' alt="master-card-photo" />
                            </li>
                            <li>
                                <img src="/paypal-f_p-vrjl.png" className='object-contain size-15' alt="paypal-photo" />
                            </li>
                        </ul>
                        {/* right side on footer */}
                        <ul className='flex gap-3 items-center'>
                            <li>
                                <p className='text-primary text-[18px] font-medium'>Get deliveries with FreshCart</p>
                            </li>
                            <li>
                                <img src='/get-apple-store-9A-0RbJo.png' className='size-25 object-contain' alt='apple-store-photo' />
                            </li>
                            <li>
                                <img src='/get-google-play-BORhnNzJ.png' alt='google-play-photo' className='size-25 object-contain' />
                            </li>
                        </ul>

                    </div>
                </div>


            </div>
        </footer>
    )
}
