import React from 'react'
import ProductCard from './ProductCard'
import { productItems } from '../constants'

const Prodocuts = () => {
    return (
        <div className='border-t border-stone-300 py-10'>
            <h1 className=' flex justify-start px-5 lg:justify-center w-full text-center text-xl lg:text-5xl pt-5'>Discover our range of products</h1>
            <div className='flex items-center justify-center flex-col lg:flex-row p-[4vh] gap-2 pt-5 lg:pt-20'>
                {
                    productItems.map(({ name, desc, src, button1, button2 }) => (
                        <ProductCard
                            key={name}
                            name={name}
                            desc={desc}
                            src={src}
                            button1={button1}
                            button2={button2}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Prodocuts
