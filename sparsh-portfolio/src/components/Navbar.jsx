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
    // Don't animate until preloader has fully exited.
    // Without this guard, GSAP sets opacity:0 on mount and the
    // animation completes while the preloader is still covering the nav.
    if (!preloaderDone) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nav-animate",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.1 }
      );
    }, navRef);

    return () => ctx.revert();
  }, [preloaderDone]); // re-runs the moment preloaderDone flips to true

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

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="menu-overlay"
            className="nav-animate relative group uppercase tracking-widest text-sm text-gray-400
                       hover:text-platinum-50 transition-colors duration-300"
            style={{ opacity: preloaderDone ? undefined : 0 }}
          >
            <span className="relative">
            Menu+
            <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-platinum-50 transition-all duration-300 group-hover:w-full" />
            </span>
          </button>

        </div>
      </header>

      <MenuOverlay isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}