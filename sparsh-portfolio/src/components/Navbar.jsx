import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLocation, useNavigate } from "react-router-dom";
import MenuOverlay from "./MenuOverlay";

export default function Navbar({ preloaderDone }) {
  const navRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    if (!preloaderDone) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-animate",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.1 }
      );
    }, navRef);
    return () => ctx.revert();
  }, [preloaderDone]);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <header
        ref={navRef}
        aria-label="Site navigation"
        className={`fixed top-0 inset-x-0 z-[1000] bg-graphite-950/90 backdrop-blur-sm transition-all duration-300
            ${scrolled ? "border-b border-gray-800" : "border-b border-transparent"}`}
      >
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 h-20 flex items-center justify-between">

          {/* Logo — visible by default, animates in after preloader */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="nav-animate text-xl font-medium tracking-wide text-platinum-50
                       hover:opacity-70 transition-opacity duration-300"
            style={{ opacity: preloaderDone ? undefined : 0 }}
          >
            Sparsh Balodia
          </a>

          {/* Single button — toggles between Menu and Close at same position */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="menu-overlay"
            className="nav-animate relative group p-0 uppercase tracking-widest
                       text-sm text-gray-400 hover:text-platinum-50 transition-colors duration-300"
            style={{ opacity: preloaderDone ? undefined : 0 }}
          >
            <span className="relative">
              {isOpen ? "Close" : "Menu"}
              <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-platinum-50
                               transition-all duration-300 group-hover:w-full" />

              {/* Crosshair */}
              {!isOpen && (
                <span className="absolute -right-5 top-1/2 -translate-y-1/2
                                 w-3 h-3 opacity-0 -rotate-90 scale-75 pointer-events-none
                                 group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-100
                                 transition-all duration-300">
                  <span className="absolute top-1/2 left-0 w-full h-[1px] bg-current -translate-y-1/2" />
                  <span className="absolute left-1/2 top-0 h-full w-[1px] bg-current -translate-x-1/2" />
                </span>
              )}
            </span>
          </button>

        </div>
      </header>

      <MenuOverlay isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}