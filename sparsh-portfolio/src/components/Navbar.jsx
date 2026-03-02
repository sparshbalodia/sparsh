import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import MenuOverlay from "./MenuOverlay";

export default function Navbar() {
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

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Already on home — just scroll to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // On another page — client-side navigate home (no full reload)
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

          <a
            href="/"
            onClick={handleLogoClick}
            className="nav-animate text-xl font-medium tracking-wide text-platinum-50 hover:opacity-70 transition-opacity duration-300"
          >
            Sparsh Balodia
          </a>

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