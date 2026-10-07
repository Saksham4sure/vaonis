import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { heroData } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const slideDuration = 4000; // 4 seconds per slide
const scrollCueText = "Scroll to discover • Scroll to discover • ";

const Hero = ({ startAnimation = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);
  const subRef = useRef(null);
  const btnRef = useRef(null);
  const indicatorRef = useRef(null);
  const scrollCueRef = useRef(null);

  const slideRefs = useRef([]);
  const imgRefs = useRef([]);
  const prevIndexRef = useRef(null);

  const currentSlide = heroData[currentIndex];

  // Auto-advance timer with progress bar (restarts whenever the slide changes)
  useEffect(() => {
    if (!startAnimation) return;

    const start = performance.now();

    const timer = setInterval(() => {
      const elapsed = ((performance.now() - start) / slideDuration) * 100;

      if (elapsed >= 100) {
        clearInterval(timer);
        setProgress(0);
        setCurrentIndex((curr) => (curr + 1) % heroData.length);
        return;
      }

      setProgress(elapsed);
    }, 50);

    return () => clearInterval(timer);
  }, [startAnimation, currentIndex]);

  // Click to jump to specific slide
  const handleSelectSlide = (idx) => {
    if (idx === currentIndex) return;
    setCurrentIndex(idx);
    setProgress(0);
  };

  // Awwwards-inspired Directional Clip-Path Wipe & Counter-Parallax Zoom Transition
  useGSAP(
    () => {
      if (!startAnimation) return;

      const curr = currentIndex;
      const prev = prevIndexRef.current;

      // Initial page entrance: smooth scale-down of first image
      if (prev === null) {
        prevIndexRef.current = curr;
        if (imgRefs.current[curr]) {
          gsap.fromTo(
            imgRefs.current[curr],
            { scale: 1.16 },
            { scale: 1.0, duration: 1.8, ease: "power2.out" }
          );
        }
        if (indicatorRef.current) {
          gsap.fromTo(
            indicatorRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.3 }
          );
        }
        return;
      }

      if (prev === curr) return;
      const direction = curr > prev ? 1 : -1;
      prevIndexRef.current = curr;

      const incomingSlide = slideRefs.current[curr];
      const incomingImg = imgRefs.current[curr];
      const outgoingSlide = slideRefs.current[prev];
      const outgoingImg = imgRefs.current[prev];

      gsap.killTweensOf([incomingSlide, incomingImg, outgoingSlide, outgoingImg]);

      // Set stacking & starting clip mask for incoming slide
      gsap.set(incomingSlide, {
        zIndex: 20,
        opacity: 1,
        clipPath:
          direction === 1
            ? "inset(100% 0% 0% 0%)"
            : "inset(0% 0% 100% 0%)",
      });

      if (outgoingSlide) {
        gsap.set(outgoingSlide, { zIndex: 10, opacity: 1 });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          if (outgoingSlide) {
            gsap.set(outgoingSlide, { zIndex: 0, opacity: 0 });
          }
          if (incomingSlide) {
            gsap.set(incomingSlide, { zIndex: 10 });
          }
        },
      });

      // 1. Incoming slide unmasking wipe
      tl.to(
        incomingSlide,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power4.inOut",
        },
        0
      );

      // 2. Incoming image counter-parallax zoom & glide
      tl.fromTo(
        incomingImg,
        {
          scale: 1.22,
          yPercent: direction === 1 ? 6 : -6,
        },
        {
          scale: 1.0,
          yPercent: 0,
          duration: 1.4,
          ease: "power3.out",
        },
        0
      );

      // 3. Outgoing slide soft zoom & ambient drift
      if (outgoingSlide && outgoingImg) {
        tl.to(
          outgoingSlide,
          {
            opacity: 0.3,
            duration: 1.1,
            ease: "power3.inOut",
          },
          0
        );
        tl.to(
          outgoingImg,
          {
            scale: 1.06,
            duration: 1.2,
            ease: "power3.inOut",
          },
          0
        );
      }
    },
    { dependencies: [startAnimation, currentIndex], scope: heroRef }
  );

  // Slide Change Transitions for dynamic text
  useGSAP(
    () => {
      if (!startAnimation) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Title masked slide-up
      tl.fromTo(
        titleRef.current,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
        0
      );

      // White rounded PRO badge spring
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" },
          0.15
        );
      }

      // Subtitle masked slide-up
      tl.fromTo(
        subRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7 },
        0.1
      );

      // CTA button scale & spring up
      if (btnRef.current) {
        tl.fromTo(
          btnRef.current,
          { y: 15, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
          0.2
        );
      }
    },
    { dependencies: [startAnimation, currentIndex], scope: heroRef }
  );

  // Scroll cue: entrance after loader, then lifts & fades out as the hero scrolls away
  useGSAP(
    () => {
      if (!startAnimation) return;

      gsap.fromTo(
        ".scroll-cue-inner",
        { opacity: 0, scale: 0.6, rotate: -120 },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.4, ease: "expo.out", delay: 0.5 }
      );

      gsap.to(scrollCueRef.current, {
        yPercent: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "35% top",
          scrub: true,
        },
      });
    },
    { dependencies: [startAnimation], scope: heroRef }
  );

  return (
    <div ref={heroRef} className="h-[100vh] w-full overflow-hidden select-none relative bg-black">
      {/* Background Images Cross-wipe Carousel */}
      {heroData.map((item, idx) => (
        <div
          key={item.title + idx}
          ref={(el) => (slideRefs.current[idx] = el)}
          className="absolute inset-0 w-full h-full will-change-[clip-path,transform] overflow-hidden"
          style={{
            zIndex: idx === 0 ? 10 : 0,
            opacity: idx === 0 ? 1 : 0,
            clipPath: idx === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
          }}
        >
          <img
            ref={(el) => (imgRefs.current[idx] = el)}
            className="object-cover w-full h-full will-change-transform"
            src={item.img}
            alt={item.title}
          />
        </div>
      ))}

      {/* Main Content Area: Vertically centered on desktop (lg), pushed to bottom on mobile */}
      <div className="text-[#fff] absolute inset-0 z-20 flex flex-col justify-end lg:justify-center items-center lg:items-start px-6 sm:px-12 lg:ml-20 pb-32 sm:pb-36 lg:pb-0 pointer-events-auto">
        {/* Title + Pro Badge (Center-aligned on mobile, left on desktop, slightly larger on mobile) */}
        <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 flex-wrap pb-1.5 sm:pb-2 w-full lg:w-auto">
          <div className="overflow-hidden">
            <h1
              ref={titleRef}
              className="text-[28px] sm:text-3xl lg:text-4xl uppercase tracking-[3px] sm:tracking-[4px] lg:tracking-[5px] cursor-default font-normal will-change-transform leading-tight text-center lg:text-left"
            >
              {currentSlide.title}
            </h1>
          </div>

          {/* White rounded Pro badge */}
          {currentSlide.isPro && (
            <div
              ref={badgeRef}
              className="bg-white text-black text-[11px] sm:text-xs font-bold uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-md flex items-center justify-center will-change-transform"
            >
              Pro
            </div>
          )}
        </div>

        {/* Subtitle (Increased slightly on mobile: text-[13.5px], center-aligned on mobile, left on desktop) */}
        <div className="overflow-hidden mb-3 sm:mb-4 max-w-xs sm:max-w-sm lg:max-w-[380px] text-center lg:text-left">
          <p
            ref={subRef}
            className="text-[13.5px] sm:text-sm lg:text-[20px] cursor-default font-light text-stone-300 will-change-transform leading-tight"
          >
            {currentSlide.subTitle}
          </p>
        </div>

        {/* CTA Button (Increased slightly on mobile: py-2.5 px-7 text-sm, center-aligned on mobile, left on desktop) */}
        <div ref={btnRef} className="will-change-transform flex justify-center lg:justify-start w-full lg:w-auto">
          <button
            className="group relative overflow-hidden rounded-full bg-[#36A6E2] py-2.5 px-7 text-sm font-medium text-white cursor-pointer shadow-[0_0_20px_rgba(54,166,226,0.35)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(54,166,226,0.6)]"
          >
            {/* Sliding dark overlay from left to right */}
            <span
              className="absolute inset-0 bg-[#155a7d] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
              aria-hidden="true"
            />
            {/* Text & Icon */}
            <span className="relative z-10 flex items-center gap-2">
              <span>{currentSlide.buttonText || "Discover"}</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Indicator below the button, near the bottom of screen, left-aligned */}
      <div
        ref={indicatorRef}
        className="absolute left-6 sm:left-12 lg:left-32 bottom-6 sm:bottom-8 lg:bottom-10 z-30 flex items-stretch gap-3 pointer-events-auto select-none"
      >
        {/* Single Vertical Duration Bar */}
        <div className="w-[2px] bg-white/20 rounded-full relative overflow-hidden my-0.5 flex-shrink-0">
          <div
            className="w-full bg-[#36A6E2] shadow-[0_0_8px_#36A6E2] absolute top-0 left-0 transition-none"
            style={{ height: `${progress}%` }}
          />
        </div>

        {/* Vertical Slide Titles */}
        <div className="flex flex-col justify-between gap-1 sm:gap-1.5 py-0.5">
          {heroData.map((slide, idx) => (
            <button
              key={slide.title + idx}
              onClick={() => handleSelectSlide(idx)}
              className="group flex items-center text-left cursor-pointer transition-all duration-200"
              aria-label={`Slide ${idx + 1}: ${slide.title}`}
            >
              <span
                className={`text-[10px] sm:text-[11px] lg:text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-2 ${
                  idx === currentIndex
                    ? "text-white font-medium translate-x-1"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                <span
                  className={`transition-colors duration-200 ${
                    idx === currentIndex
                      ? "text-[#36A6E2] font-semibold"
                      : "text-stone-500 group-hover:text-stone-300"
                  }`}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span>{slide.title}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom-right scroll cue: rotating circular text + looping arrow */}
      <div
        ref={scrollCueRef}
        className="absolute right-6 sm:right-12 lg:right-24 bottom-8 lg:bottom-10 z-30 hidden sm:block pointer-events-none select-none will-change-transform"
      >
        <div className="scroll-cue-inner relative w-28 h-28 lg:w-32 lg:h-32 opacity-0">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full animate-[spin_14s_linear_infinite] motion-reduce:animate-none"
            aria-hidden="true"
          >
            <defs>
              <path id="scroll-cue-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>
            <text className="fill-white/85 uppercase font-mono" style={{ fontSize: 8 }}>
              <textPath href="#scroll-cue-circle" textLength="238" lengthAdjust="spacing">{scrollCueText}</textPath>
            </text>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-11 h-11 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm overflow-hidden flex items-center justify-center">
              <svg
                className="w-4 h-4 text-[#36A6E2] animate-[scroll-cue_1.8s_ease-in-out_infinite] motion-reduce:animate-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <span className="sr-only">Scroll to discover</span>
      </div>
    </div>
  );
};

export default Hero;


