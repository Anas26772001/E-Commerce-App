import React from 'react'
import { HashLoader } from 'react-spinners'

export default function DetailsLoader() {
    return (
        <div className='h-[80vh] w-full flex items-center  justify-center'>
            <div className="flex flex-col gap-5 items-center justify-center">
                <HashLoader
                    color="#00cc74"
                    size={180}
                    speedMultiplier={1}
                />
                <p className='text-primary font-extrabold text-[22px]'>Fresh Cart <span className='text-[18px] font-medium text-primary'>is Loading...</span></p>
            </div>
        </div>

    )
}
