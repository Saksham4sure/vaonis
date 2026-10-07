import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Slide = ({ desktopSrc, mobileSrc, alt, className = "", children }) => (
    <section className={`parallax-panel relative h-screen w-full overflow-hidden ${className}`}>
        {/* Outer media layer: entrance drift as the slide rises into view */}
        <div className="panel-media absolute inset-0 will-change-transform">
            {/* Inner media layer: slow zoom while pinned and being covered */}
            <div className="panel-media-inner h-full w-full will-change-transform">
                <img className="h-full w-full hidden lg:flex object-cover" src={desktopSrc} alt={alt} />
                <img className="h-full w-full flex lg:hidden object-cover" src={mobileSrc} alt={alt} />
            </div>
        </div>
        {/* Subtle dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        {/* Darkens as the next slide covers this one */}
        <div className="panel-shade absolute inset-0 bg-black opacity-0 pointer-events-none" />

        <div className="panel-content text-[#fff] absolute inset-0 flex flex-col justify-end items-start px-6 sm:px-12 lg:px-0 lg:items-start lg:justify-center lg:ml-32 mb-20 lg:mb-0 will-change-transform pointer-events-auto">
            {children}
        </div>
    </section>
);

const ParalaxScroll = () => {
    const mainWrapper = useRef(null);

    useGSAP(() => {
        const panels = gsap.utils.toArray(".parallax-panel");
        const mm = gsap.matchMedia();

        mm.add({
            motion: "(prefers-reduced-motion: no-preference)",
            reduce: "(prefers-reduced-motion: reduce)",
        }, ({ conditions }) => {
            const { reduce } = conditions;

            panels.forEach((panel, i) => {
                const media = panel.querySelector(".panel-media");
                const mediaInner = panel.querySelector(".panel-media-inner");
                const shade = panel.querySelector(".panel-shade");
                const content = panel.querySelector(".panel-content");
                const isLast = i === panels.length - 1;

                // Entrance: image settles into place while the slide scrolls up
                if (!reduce) {
                    gsap.fromTo(
                        media,
                        { yPercent: -8, scale: 1.2 },
                        {
                            yPercent: 0,
                            scale: 1,
                            ease: "none",
                            scrollTrigger: { trigger: panel, start: "top bottom", end: "top top", scrub: true },
                        }
                    );
                }

                // Last slide is not pinned — it scrolls away normally with a gentle text parallax
                if (isLast) {
                    if (!reduce) {
                        gsap.to(content, {
                            y: -100,
                            ease: "none",
                            scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
                        });
                    }
                    return;
                }

                // Pin the slide at the top; the next slide scrolls over it (pinSpacing: false).
                // Content is translated by exactly one viewport over the pin duration,
                // so it keeps moving at native scroll speed while the image stays fixed.
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: panel,
                        start: "top top",
                        end: "bottom top",
                        pin: true,
                        pinSpacing: false,
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                });

                tl.to(content, { y: () => -window.innerHeight, ease: "none" }, 0);

                if (!reduce) {
                    tl.to(mediaInner, { scale: 1.1, ease: "none" }, 0)
                        .to(shade, { opacity: 0.6, ease: "none" }, 0);
                }
            });
        });
    }, { scope: mainWrapper });

    return (
        <div ref={mainWrapper} className="relative w-full">
            {/* Slide 1: pins, text keeps scrolling, Slide 2 stacks on top */}
            <Slide
                className="z-10"
                desktopSrc="https://vaonis.com/cdn/shop/files/Vaonis_-_Homepage_apps_KV_desktop.jpg?format=webp&v=1726071206&width=2000"
                mobileSrc="https://vaonis.com/cdn/shop/files/Vaonis_-_Homepage_apps_KV_mobile_02.jpg?format=webp&v=1726761585&width=1080"
                alt="Singularity & Gravity"
            >
                <h1 className="text-2xl lg:text-3xl pb-2 cursor-default">Singularity &amp; Gravity</h1>
                <p className="text-sm lg:text-xl mb-3 lg:mb-6 cursor-default">
                    The power of our smart <br /> telescopes controlled with <br /> your smartphone and our <br /> apps: Singularity &amp; Gravity.
                </p>
                <p className="py-2 px-5 rounded-full bg-[#36A6E2] lg:text-lg cursor-pointer hover:bg-[#2892c9] transition-all duration-300">
                    Explore our apps
                </p>
            </Slide>

            {/* Slide 2: pins, text keeps scrolling, Slide 3 stacks on top */}
            <Slide
                className="z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
                desktopSrc="https://vaonis.com/cdn/shop/files/Vaonis_-_people_Gilles_2-topaz-enhance-2x-2.jpg?format=webp&v=1726758592&width=2000"
                mobileSrc="https://vaonis.com/cdn/shop/files/Vaonis_-_people_Gilles_2_mobile-topaz-enhance-2x.jpg?format=webp&v=1726758572&width=1280"
                alt="Vaonis Team"
            >
                <h1 className="text-2xl lg:text-3xl pb-2 cursor-default lg:w-[35vw]">
                    Designed with purpose, passion and precision. We and our smart telescopes are unique in every regard.
                </h1>
                <p className="mt-6 py-2 px-5 rounded-full border border-[#36A6E2] hover:bg-[#36A6E2]/20 lg:text-lg cursor-pointer transition-all duration-300">
                    About us
                </p>
            </Slide>

            {/* Slide 3: stacks over Slide 2, then scrolls normally (not pinned) */}
            <Slide
                className="z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
                desktopSrc="https://vaonis.com/cdn/shop/files/ENS_KV_desktop_centered-topaz-enhance-2x.jpg?format=webp&v=1726670689&width=2000"
                mobileSrc="https://vaonis.com/cdn/shop/files/ENS_KV_mobile_up-topaz-enhance-2x.jpg?format=webp&v=1726670689&width=1280"
                alt="ENS"
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
            </Slide>
        </div>
    );
};

export default ParalaxScroll;
