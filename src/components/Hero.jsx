import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = ({ startAnimation = false }) => {
  const heroRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const sub1Ref = useRef(null);
  const sub2Ref = useRef(null);
  const btnRef = useRef(null);
  const footerRef = useRef(null);

  useGSAP(
    () => {
      if (!startAnimation) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Image cinematic entrance: zooms out from 1.18 to 1.0 and clarifies
      tl.fromTo(
        imgRef.current,
        { scale: 1.18, filter: "brightness(0.65)" },
        { scale: 1, filter: "brightness(1)", duration: 2.2, ease: "power3.out" },
        0
      );

      // Title masked slide up with settling tracking
      tl.fromTo(
        titleRef.current,
        { yPercent: 125, opacity: 0, letterSpacing: "14px" },
        {
          yPercent: 0,
          opacity: 1,
          letterSpacing: "6px",
          duration: 1.3,
          ease: "power4.out",
        },
        0.2
      );

      // Subtitles stagger up through masks
      tl.fromTo(
        [sub1Ref.current, sub2Ref.current],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.0, stagger: 0.14 },
        0.5
      );

      // CTA button scale & spring up
      tl.fromTo(
        btnRef.current,
        { y: 30, opacity: 0, scale: 0.88 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "back.out(1.6)" },
        0.8
      );

      // Bottom bar fade up
      if (footerRef.current) {
        tl.fromTo(
          footerRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0 },
          1.0
        );
      }
    },
    { dependencies: [startAnimation], scope: heroRef }
  );

  return (
    <div ref={heroRef} className="h-[100vh] w-full overflow-hidden select-none">
      <div className="h-full w-full relative">
        <img
          ref={imgRef}
          className="object-cover w-full h-full will-change-transform transform-gpu"
          src="https://vaonis.com/cdn/shop/files/VAONIS-V2-HORIZONTAL-Spring_Sale.jpg?format=webp&v=1747660909&width=2000"
          alt="Vaonis Vespera II"
        />

        <div className="text-[#fff] absolute inset-0 flex flex-col justify-end items-center lg:items-start lg:justify-center lg:ml-36 mb-30 lg:mb-0 pointer-events-auto">
          {/* Masked Title */}
          <div className="overflow-hidden pb-2 lg:pb-3">
            <h1
              ref={titleRef}
              className="text-2xl lg:text-4xl uppercase tracking-[6px] cursor-default font-normal will-change-transform"
            >
              Vespera II
            </h1>
          </div>

          {/* Masked Subtitles */}
          <div className="overflow-hidden">
            <p
              ref={sub1Ref}
              className="text-sm lg:text-xl cursor-default font-light will-change-transform"
            >
              Designed for discovery, built to last.
            </p>
          </div>

          <div className="overflow-hidden mb-3 lg:mb-6">
            <p
              ref={sub2Ref}
              className="text-sm lg:text-xl cursor-default font-light will-change-transform"
            >
              Now guaranteed for 3 years.
            </p>
          </div>

          {/* CTA Button */}
          <div ref={btnRef} className="will-change-transform">
            <p className="py-2.5 px-7 rounded-full bg-[#36A6E2] hover:bg-[#2892c9] hover:shadow-[0_0_20px_rgba(54,166,226,0.5)] transition-all duration-300 lg:text-lg cursor-pointer transform hover:scale-105 active:scale-95">
              Discover
            </p>
          </div>
        </div>

        {/* Bottom indicator bar */}
        <div
          ref={footerRef}
          className="text-stone-300 absolute inset-0 w-full items-end justify-between px-32 mb-10 hidden lg:flex pointer-events-none"
        >
          <div>
            <p className="text-[13px] text-stone-400 mb-28 pl-5 cursor-default tracking-wide font-mono">
              Vespera II
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#36A6E2] animate-bounce"></span>
            <p className="text-[12px] cursor-default tracking-wider uppercase font-mono text-stone-300">
              Scroll to discover
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

