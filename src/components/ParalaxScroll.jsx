import { useRef, useLayoutEffect } from "react"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


const ParalaxScroll = () => {
    const container = useRef(null);
    const paragraph = useRef(null);
    const container2 = useRef(null);
    const paragraph2 = useRef(null);
    const container3 = useRef(null);
    const paragraph3 = useRef(null);

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,

                }
            })

            tl.to(paragraph.current, {y: -230}, 0);
            

            const jl = gsap.timeline({
                scrollTrigger: {
                    trigger: container2.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,

                }
            })

            jl.to(paragraph2.current, {y: -230}, 0);

            const kl = gsap.timeline({
                scrollTrigger: {
                    trigger: container3.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,

                }
            })

            kl.to(paragraph3.current, {y: -230}, 0);
        })

        return () => context.revert();
    }, [])


    return (
        <div>
            <div className="relative">
                <div ref={container} className="h-[100vh] w-[100vw] sticky top-0 ">
                    <div className="h-full w-full">
                        <img className="h-full w-full hidden lg:flex object-cover" src="https://vaonis.com/cdn/shop/files/Vaonis_-_Homepage_apps_KV_desktop.jpg?format=webp&v=1726071206&width=2000" />
                        <img className="h-full w-full flex lg:hidden object-cover" src="https://vaonis.com/cdn/shop/files/Vaonis_-_Homepage_apps_KV_mobile_02.jpg?format=webp&v=1726761585&width=1080" />

                    </div>
                    <div ref={paragraph} className="text-[#fff] absolute inset-0 flex flex-col justify-end items-start px-[10vw] lg:px-0 lg:items-start lg:justify-center lg:ml-32 mb-20 lg:mb-0">
                        <h1 className="text-2xl lg:text-3xl pb-2 lg:pb-2 cursor-default">Singularity & Gravity</h1>
                        <p className="text-sm lg:text-xl mb-3 lg:mb-6 cursor-default">The power of our smart <br /> telescopes controlled with <br /> your smartphone and our <br /> apps: Singularity & Gravity.</p>
                        <p className="py-2 px-5 rounded-full bg-[#36A6E2] lg:text-lg cursor-pointer">Explore our apps</p>
                    </div>
                </div>
                <div ref={container2} className="h-[100vh] w-[100vw] sticky top-0">
                    <div className="h-full w-full">
                        <img className="h-full w-full hidden lg:flex object-cover" src="https://vaonis.com/cdn/shop/files/Vaonis_-_people_Gilles_2-topaz-enhance-2x-2.jpg?format=webp&v=1726758592&width=2000" />
                        <img className="h-full w-full flex lg:hidden object-cover" src="https://vaonis.com/cdn/shop/files/Vaonis_-_people_Gilles_2_mobile-topaz-enhance-2x.jpg?format=webp&v=1726758572&width=1280" />

                    </div>
                    <div ref={paragraph2} className="text-[#fff] absolute inset-0 flex flex-col justify-end items-start px-[10vw] lg:px-0 lg:items-start lg:justify-center lg:ml-32 mb-20 lg:mb-0">
                        <h1 className="text-2xl lg:text-3xl pb-2 lg:pb-2 cursor-default lg:w-[35vw]">Designed with purpose, passion and precision. We and our smart telescopes are unique in every regard.</h1>
                        <p className="mt-6 py-2 px-5 rounded-full border border-[#36A6E2] lg:text-lg cursor-pointer">About us</p>
                    </div>
                </div>
                <div ref={container3}  className="h-[100vh] w-[100vw] sticky top-0">
                    <div className="h-full w-full">
                        <img className="h-full w-full hidden lg:flex object-cover" src="https://vaonis.com/cdn/shop/files/ENS_KV_desktop_centered-topaz-enhance-2x.jpg?format=webp&v=1726670689&width=2000" />
                        <img className="h-full w-full flex lg:hidden object-cover" src="https://vaonis.com/cdn/shop/files/ENS_KV_mobile_up-topaz-enhance-2x.jpg?format=webp&v=1726670689&width=1280" />

                    </div>
                    <div ref={paragraph3} className="text-[#fff] absolute inset-0 flex flex-col justify-end items-start px-[10vw] lg:px-0 lg:items-start lg:justify-center lg:ml-32 mb-20 lg:mb-0">
                        <h1 className="text-2xl lg:text-3xl pb-2 lg:pb-4 cursor-default lg:w-[35vw]">ENS.<br />
                            Our Embedded New Solutions.
                        </h1>
                        <p className="text-sm lg:text-xl mb-3 lg:mb-6 cursor-default lg:w-[25vw]">
                            In the dark, our smart technologies work to your service, so that you don't have to worry about anything.</p>
                        <p className="py-2 px-5 rounded-full bg-[#36A6E2] lg:text-lg cursor-pointer">Explore further</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParalaxScroll
