import { useRef } from "react";
import { desciPara } from "../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Description = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const words = containerRef.current.querySelectorAll(".desc-word");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 30%",
          scrub: 1,
        },
      });

      tl.fromTo(
        words,
        {
          yPercent: 125,
          opacity: 0.12,
          rotateZ: 2.5,
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateZ: 0,
          stagger: 0.03,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="py-16 lg:py-[140px] relative overflow-hidden bg-white select-none">
      {/* Subtle brand tag */}
      <div className="px-[10vw] lg:px-[225px] mb-8 lg:mb-12 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#36A6E2] animate-pulse"></span>
        <span className="text-[11px] lg:text-xs uppercase tracking-[4px] text-stone-400 font-medium">
          Vision &amp; Ambition
        </span>
        <span className="h-[1px] w-12 bg-stone-200"></span>
      </div>

      {desciPara.map(({ text }, index) => (
        <div
          key={text}
          className={`overflow-hidden ${
            index === 2 ? "pb-6 lg:pb-8" : "pb-0"
          } ${index === 6 ? "pt-6 lg:pt-8" : ""}`}
        >
          <p
            className={`text-2xl px-[10vw] lg:text-[48px] lg:px-[225px] font-light leading-[1.3] tracking-tight ${
              index === 6 ? "text-[#36A6E2] font-normal" : "text-black"
            }`}
          >
            {text.split(" ").map((word, wIdx) => (
              <span
                key={wIdx}
                className="inline-block overflow-hidden align-top mr-[0.28em] py-[3px]"
              >
                <span className="desc-word inline-block will-change-transform transform-gpu">
                  {word}
                </span>
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Description;

