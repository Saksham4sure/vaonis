import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ParalaxScroll = () => {
    const container = useRef(null);
    const paragraph = useRef(null);
    const container2 = useRef(null);
    const paragraph2 = useRef(null);
    const container3 = useRef(null);
    const paragraph3 = useRef(null);

    useGSAP(() => {
        // Slide 1: Image sticks at top-0 while Slide 2 scrolls up over it, and text scrolls up with parallax
        gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        }).to(paragraph.current, { y: -240, ease: "none" });

        // Slide 2: Image sticks at top-0 while Slide 3 scrolls up over it, and text scrolls up with parallax
        gsap.timeline({
            scrollTrigger: {
                trigger: container2.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        }).to(paragraph2.current, { y: -240, ease: "none" });

        // Slide 3: Image sticks at top-0 while following content scrolls up over it, and text scrolls up with parallax
        gsap.timeline({
            scrollTrigger: {
                trigger: container3.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        }).to(paragraph3.current, { y: -240, ease: "none" });
    });

    return (
        <div className="relative w-full">
            {/* Slide 1 */}
            <div
                ref={container}
                className="h-screen w-full sticky top-0 z-10 overflow-hidden"
            >
                <div className="h-full w-full">
                    <img
                        className="h-full w-full hidden lg:flex object-cover"
                        src="https://vaonis.com/cdn/shop/files/Vaonis_-_Homepage_apps_KV_desktop.jpg?format=webp&v=1726071206&width=2000"
                        alt="Singularity & Gravity"
                    />
                    <img
                        className="h-full w-full flex lg:hidden object-cover"
                        src="https://vaonis.com/cdn/shop/files/Vaonis_-_Homepage_apps_KV_mobile_02.jpg?format=webp&v=1726761585&width=1080"
                        alt="Singularity & Gravity"
                    />
                </div>
                <div
                    ref={paragraph}
                    className="text-[#fff] absolute inset-0 flex flex-col justify-end items-start px-[10vw] lg:px-0 lg:items-start lg:justify-center lg:ml-32 mb-20 lg:mb-0 will-change-transform"
                >
                    <h1 className="text-2xl lg:text-3xl pb-2 cursor-default">Singularity &amp; Gravity</h1>
                    <p className="text-sm lg:text-xl mb-3 lg:mb-6 cursor-default">
                        The power of our smart <br /> telescopes controlled with <br /> your smartphone and our <br /> apps: Singularity &amp; Gravity.
                    </p>
                    <p className="py-2 px-5 rounded-full bg-[#36A6E2] lg:text-lg cursor-pointer hover:bg-[#2892c9] transition-all duration-300">
                        Explore our apps
                    </p>
                </div>
            </div>

            {/* Slide 2 */}
            <div
                ref={container2}
                className="h-screen w-full sticky top-0 z-20 overflow-hidden shadow-2xl"
            >
                <div className="h-full w-full">
                    <img
                        className="h-full w-full hidden lg:flex object-cover"
                        src="https://vaonis.com/cdn/shop/files/Vaonis_-_people_Gilles_2-topaz-enhance-2x-2.jpg?format=webp&v=1726758592&width=2000"
                        alt="Vaonis Team"
                    />
                    <img
                        className="h-full w-full flex lg:hidden object-cover"
                        src="https://vaonis.com/cdn/shop/files/Vaonis_-_people_Gilles_2_mobile-topaz-enhance-2x.jpg?format=webp&v=1726758572&width=1280"
                        alt="Vaonis Team"
                    />
                </div>
                <div
                    ref={paragraph2}
                    className="text-[#fff] absolute inset-0 flex flex-col justify-end items-start px-[10vw] lg:px-0 lg:items-start lg:justify-center lg:ml-32 mb-20 lg:mb-0 will-change-transform"
                >
                    <h1 className="text-2xl lg:text-3xl pb-2 cursor-default lg:w-[35vw]">
                        Designed with purpose, passion and precision. We and our smart telescopes are unique in every regard.
                    </h1>
                    <p className="mt-6 py-2 px-5 rounded-full border border-[#36A6E2] hover:bg-[#36A6E2]/20 lg:text-lg cursor-pointer transition-all duration-300">
                        About us
                    </p>
                </div>
            </div>

            {/* Slide 3 */}
            <div
                ref={container3}
                className="h-screen w-full sticky top-0 z-30 overflow-hidden shadow-2xl"
            >
                <div className="h-full w-full">
                    <img
                        className="h-full w-full hidden lg:flex object-cover"
                        src="https://vaonis.com/cdn/shop/files/ENS_KV_desktop_centered-topaz-enhance-2x.jpg?format=webp&v=1726670689&width=2000"
                        alt="ENS"
                    />
                    <img
                        className="h-full w-full flex lg:hidden object-cover"
                        src="https://vaonis.com/cdn/shop/files/ENS_KV_mobile_up-topaz-enhance-2x.jpg?format=webp&v=1726670689&width=1280"
                        alt="ENS"
                    />
                </div>
                <div
                    ref={paragraph3}
                    className="text-[#fff] absolute inset-0 flex flex-col justify-end items-start px-[10vw] lg:px-0 lg:items-start lg:justify-center lg:ml-32 mb-20 lg:mb-0 will-change-transform"
                >
                    <h1 className="text-2xl lg:text-3xl pb-2 lg:pb-4 cursor-default lg:w-[35vw]">
                        ENS.<br />
                        Our Embedded New Solutions.
                    </h1>
                    <p className="text-sm lg:text-xl mb-3 lg:mb-6 cursor-default lg:w-[25vw]">
                        In the dark, our smart technologies work to your service, so that you don't have to worry about anything.
                    </p>
                    <p className="py-2 px-5 rounded-full bg-[#36A6E2] lg:text-lg cursor-pointer hover:bg-[#2892c9] transition-all duration-300">
                        Explore further
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ParalaxScroll;



