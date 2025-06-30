const Hero = () => {
    return (
        <div className="h-[100vh] w-full">
            <div className="h-full w-full relative">
                <img className="object-cover w-full h-full" src="https://vaonis.com/cdn/shop/files/VAONIS-V2-HORIZONTAL-Spring_Sale.jpg?format=webp&v=1747660909&width=2000" />
                <div className="text-[#fff] absolute inset-0 flex flex-col justify-end items-center lg:items-start lg:justify-center lg:ml-36 mb-20 lg:mb-0-">
                    <h1 className="text-2xl lg:text-4xl pb-2 lg:pb-5 uppercase tracking-[6px] cursor-default">Vespera II</h1>
                    <p className="text-sm lg:text-xl cursor-default">Designed for discovery, built to last.</p>
                    <p className="text-sm lg:text-xl mb-3 lg:mb-6 cursor-default">Now guaranteed for 3 years.</p>
                    <p className="py-2 px-5 rounded-full bg-[#36A6E2] lg:text-lg cursor-pointer">Discover</p>
                </div>
                <div className="text-stone-300 absolute inset-0 w-full items-end justify-between px-32 mb-28 hidden lg:flex">
                    <div>
                        <p className="text-[13px] text-stone-400 mb-28 pl-5 cursor-default">Vespera II</p>
                    </div>
                    <div>
                        <p className="text-[12px] cursor-default">Scroll to discover</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
