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
                             text-gray-400">
                  Developer
                </h1>
              </div>

              <div className="overflow-hidden">
                <h5
                  className="boundingelem
                             uppercase
                             tracking-widest
                             text-xs md:text-sm
                             text-gray-500
                             mt-3
                             text-right">
                  Based in India
                </h5>
              </div>

            </div>

          </div>
        </div>

        {/* ===================== AVAILABILITY BLOCK ===================== */}
        <div className="absolute right-6 md:right-8 lg:right-12 xl:right-16 bottom-[28vh] text-right">

          <div className="overflow-hidden">
            <h5 className="boundingelem uppercase tracking-widest text-gray-400 text-xs md:text-sm">
              Available for full time & freelance
            </h5>
          </div>

        </div>

        {/* ================= HERO FOOTER ================= */}
<div className="absolute bottom-10 left-0 w-full px-6 md:px-8 lg:px-12 xl:px-16">

  <div className="flex items-center">

    {/* LEFT — GITHUB */}
    <div className="flex-1">
      <a href="#" className="relative group gap-1 uppercase tracking-widest text-xs md:text-sm text-grey-400 hover:text-platinum-50 transition-colors duration-300">
        <span className="relative">
          Github
          <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-platinum-50 transition-all duration-300 group-hover:w-full" />
        </span>
        <i className="ri-arrow-right-up-line text-sm ml-2" />
      </a>
    </div>

    {/* CENTER — LINKEDIN */}
    <div className="flex-1 flex justify-center">
      <a href="#" className="relative group gap-1 uppercase tracking-widest text-xs md:text-sm text-grey-400 hover:text-platinum-50 transition-colors duration-300"
      >
        <span className="relative">
        Linkedin
        <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-platinum-50 transition-all duration-300 group-hover:w-full"/>
        </span>
        <i className="ri-arrow-right-up-line text-sm" />
      </a>
    </div>

    {/* RIGHT — ICON SET */}
    <div className="flex-1 flex justify-end gap-1">

      <button className="group w-10 h-10 rounded-full border border-grey-800 flex items-center justify-center hover:border-platinum-50 transition-all duration-300">
        <i className="ri-arrow-down-line text-base group-hover:translate-y-1 transition-transform duration-300" />
      </button>

      <button className="group w-10 h-10 rounded-full border border-grey-800 flex items-center justify-center hover:border-platinum-50 transition-all duration-300">
        <i className="ri-arrow-down-line text-base group-hover:translate-y-1 transition-transform duration-300" />
      </button>

    </div>

  </div>
</div>
      </div>
    </section>
  );
}