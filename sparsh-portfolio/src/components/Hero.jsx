import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const heroRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".boundingelem", {
        y: 120,
        duration: 1.1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-20"
    >
      <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 h-full">

        {/* ===================== TOP TYPO BLOCK ===================== */}
        <div className="mt-12 md:mt-16">

          {/* WEB */}
          <div className="overflow-hidden">
            <h1
              className="boundingelem
                         text-[16vw] md:text-[10vw]
                         leading-[0.8]
                         font-bold
                         uppercase
                         tracking-tight">
              Web
            </h1>
          </div>

          {/* DEVELOPER + BASED */}
          <div className="pl-[6.5vw] md:pl-[8vw]">

            <div className="inline-block">

              <div className="overflow-hidden">
                <h1
                  className="boundingelem
                             text-[16vw] md:text-[10vw]
                             leading-[0.8]
                             font-bold
                             uppercase
                             tracking-tight
                             text-grey-400">
                  Developer
                </h1>
              </div>

              <div className="overflow-hidden">
                <h5
                  className="boundingelem
                             uppercase
                             tracking-widest
                             text-xs md:text-sm
                             text-grey-500
                             mt-3
                             text-right">
                  Based in India
                </h5>
              </div>

            </div>

          </div>
        </div>

        {/* ===================== AVAILABILITY BLOCK ===================== */}
        <div className="absolute right-6 md:right-8 lg:right-12 xl:right-16 top-[45vh] text-right">

          <div className="overflow-hidden">
            <h5 className="boundingelem uppercase tracking-widest text-grey-400 text-xs md:text-sm">
              Available for full time & freelance
            </h5>
          </div>

        </div>

      </div>
    </section>
  );
}