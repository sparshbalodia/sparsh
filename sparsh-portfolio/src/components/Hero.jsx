import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero({ preloaderDone }) {
  const heroRef = useRef();

  // Step 1 — Always hide elements immediately on mount before any paint.
  useLayoutEffect(() => {
    gsap.set(".boundingelem", { opacity: 0, y: 120 });
  }, []);

  // Step 2 — Animate in only after preloader has fully exited.
  useLayoutEffect(() => {
    if (!preloaderDone) return;

    const ctx = gsap.context(() => {
      gsap.to(".boundingelem", {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [preloaderDone]);

  return (
    <>
    <div className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: `
          radial-gradient(ellipse 120% 40% at 60% 0%,   rgba(60,60,60,0.35) 0%, transparent 70%),
          radial-gradient(ellipse 80%  60% at 62% 45%,  rgba(40,40,40,0.45) 0%, transparent 65%),
          radial-gradient(ellipse 50%  35% at 85% 80%,  rgba(25,25,25,0.35) 0%, transparent 70%)`,
        }}
    />
    <section ref={heroRef} className="relative min-h-screen pt-20 overflow-hidden w-full">
      

      <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 h-full">

        {/* ===================== TOP TYPO BLOCK ===================== */}
        <div className="mt-12 md:mt-16">

          {/* WEB */}
          <div className="overflow-hidden">
            <h1 className="boundingelem text-[16vw] md:text-[10vw]
                           leading-[0.8] font-bold uppercase tracking-tight">
              Web
            </h1>
          </div>

          {/* DEVELOPER + BASED */}
          <div className="pl-[6.5vw] md:pl-[8vw]">
            <div className="inline-block">

              <div className="overflow-hidden">
                <h1 className="boundingelem text-[15vw] md:text-[10vw]
                               leading-[0.8] font-bold uppercase tracking-tight
                               text-gray-400">
                  Developer
                </h1>
              </div>

              <div className="overflow-hidden">
                <h5 className="boundingelem uppercase tracking-widest
                               text-xs md:text-sm text-gray-500 mt-3 text-right">
                  Based in India
                </h5>
              </div>

            </div>
          </div>
        </div>

        {/* ===================== AVAILABILITY BLOCK ===================== */}
        <div className="absolute right-6 md:right-8 lg:right-12 xl:right-16 bottom-[28vh] text-right">
          <div className="overflow-hidden">
            <h5 className="boundingelem uppercase tracking-widest
                           text-gray-400 text-xs md:text-sm">
              Available for full time &amp; freelance
            </h5>
          </div>
        </div>

        {/* ================= HERO FOOTER ================= */}
        <div className="absolute bottom-10 left-0 w-full px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center">

            {/* LEFT — GITHUB */}
            <div className="flex-1">
              <a
                href="https://github.com/sparshbalodia/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group uppercase tracking-widest
                           text-xs md:text-sm text-gray-400
                           hover:text-platinum-50 transition-colors duration-300"
              >
                <span className="relative">
                  Github
                  <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-platinum-50
                                   transition-all duration-300 group-hover:w-full" />
                </span>
                <i className="ri-arrow-right-up-line text-sm ml-2" />
              </a>
            </div>

            <div className="flex-1 flex justify-center gap-1">
              <button className="group w-10 h-10 rounded-full border border-gray-800
                                 flex items-center justify-center
                                 hover:border-platinum-50 transition-all duration-300">
                <i className="ri-arrow-down-line text-base
                               group-hover:translate-y-1 transition-transform duration-300" />
              </button>
              <button className="group w-10 h-10 rounded-full border border-gray-800
                                 flex items-center justify-center
                                 hover:border-platinum-50 transition-all duration-300">
                <i className="ri-arrow-down-line text-base
                               group-hover:translate-y-1 transition-transform duration-300" />
              </button>
            </div>
            {/* CENTER — LINKEDIN */}
            <div className="flex-1 flex justify-end">
              <a
                href="https://linkedin.com/in/sparshbalodia"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group uppercase tracking-widest
                           text-xs md:text-sm text-gray-400
                           hover:text-platinum-50 transition-colors duration-300"
              >
                <span className="relative">
                  Linkedin
                  <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-platinum-50
                                   transition-all duration-300 group-hover:w-full" />
                </span>
                <i className="ri-arrow-right-up-line text-sm ml-2" />
              </a>
            </div>

            {/* RIGHT — ICON SET */}

          </div>
        </div>

      </div>
    </section>
    </>
  );
}