import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const navRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-animate", {
        y: -20,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 inset-x-0 z-[999] bg-graphite-950/90 backdrop-blur-sm border-b border-grey-800"
    >
      <div className="w-full px-6 md:px-8 lg:px-8 xl:px-8 h-20 flex items-center justify-between">
        <span className="nav-animate text-xl font-medium tracking-wide text-platinum-50">
          Sparsh Balodia
        </span>

        <span className="nav-animate text-grey-400 hover:text-platinum-50 transition-colors duration-300 cursor-pointer">
          Menu+
        </span>
      </div>
    </header>
  );
}