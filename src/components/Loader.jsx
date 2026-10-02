import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loader = ({ onStartLanding, onComplete }) => {
  const loaderRef = useRef(null);
  const contentRef = useRef(null);
  const progressBarRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      // Prevent scrolling during loading
      document.body.style.overflow = "hidden";

      const counter = { val: 0 };
      const tl = gsap.timeline();

      // Smooth progress count from 0 to 100
      tl.to(counter, {
        val: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => {
          const currentVal = Math.round(counter.val);
          setProgress(currentVal);
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${currentVal}%`;
          }
        },
      });

      // Brief micro-pause at 100%
      tl.to({}, { duration: 0.15 });

      // Clean fade out of center content
      tl.to(contentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.35,
        ease: "power2.in",
      });

      // Synchronize landing animation
      tl.call(() => {
        if (onStartLanding) onStartLanding();
      });

      // Smooth black curtain lift
      tl.to(loaderRef.current, {
        yPercent: -100,
        duration: 1.0,
        ease: "power4.inOut",
        onComplete: () => {
          document.body.style.overflow = "auto";
          if (onComplete) onComplete();
        },
      });
    },
    { scope: loaderRef }
  );

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[1000] bg-black text-white flex flex-col justify-between p-8 sm:p-14 select-none overflow-hidden"
    >
      <div ref={contentRef} className="h-full flex flex-col justify-between relative z-10">
        {/* Minimal header */}
        <div className="flex justify-between items-center text-xs tracking-[4px] uppercase text-stone-500 font-light">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A6E2]"></span>
            <span className="text-white tracking-[5px] font-normal">VAONIS</span>
          </div>
          <span className="text-stone-500 font-mono text-[11px]">&copy; 2026</span>
        </div>

        {/* Minimal Center Counter */}
        <div className="flex flex-col items-center justify-center my-auto">
          <div className="flex items-baseline font-mono select-none">
            <span className="text-7xl sm:text-9xl lg:text-[130px] font-extralight tracking-tighter leading-none text-white">
              {String(progress).padStart(2, "0")}
            </span>
            <span className="text-2xl sm:text-4xl lg:text-5xl text-[#00A6E2] font-light ml-2">
              %
            </span>
          </div>
        </div>

        {/* Minimal 1px bottom progress line */}
        <div className="w-full">
          <div className="w-full h-[1px] bg-white/10 overflow-hidden">
            <div
              ref={progressBarRef}
              style={{ width: "0%" }}
              className="h-full bg-[#00A6E2] transition-[width] duration-75 ease-out shadow-[0_0_8px_#00A6E2]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
