import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import MenuOverlay from "./MenuOverlay";

export default function Navbar() {
  const navRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-animate", {
        y: -20,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <header
        ref={navRef}
        aria-label="Site navigation"
        className="fixed top-0 inset-x-0 z-[1000] bg-graphite-950/90 backdrop-blur-sm border-b border-gray-800"
      >
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 h-20 flex items-center justify-between">

          <span className="nav-animate text-xl font-medium tracking-wide text-platinum-50">
            Sparsh Balodia
          </span>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="menu-overlay"
            className="nav-animate uppercase tracking-widest text-sm text-gray-400 hover:text-platinum-50 transition-colors duration-300"
          >
            Menu+
          </button>

        </div>
      </header>

      <MenuOverlay isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}