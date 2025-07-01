import React from 'react'
import { productItems } from '../constants'


const ProductCard = ({name, desc, src, button1, button2}) => {
  return (
    <div className='relative w-[90vw] h-[60vh] lg:w-[50vw] lg:h-auto font-extralight'>
        <img className='rounded-xl h-full w-full object-cover' src={src} />
        <div className='absolute inset-0 text-white flex flex-col px-4 text-center items-center lg:pt-10'>
            <h1 className='uppercase  text-2xl lg:text-4xl tracking-[10px] pb-3 pt-5'>{name}</h1>
            <p className=' text-sm lg:text-xl'>{desc}</p>
            <div className='flex gap-3 items-center justify-center pt-3'>
                <p className='bg-[#34A2DD] text-sm px-5 py-1 rounded-full tracking-wide'>{button1}</p>
                <p className='border border-[#34A2DD] text-sm px-5 py-1 rounded-full tracking-wide'>{button2}</p>
            </div>
        </div>
    </div>
  )
}

export default ProductCard
