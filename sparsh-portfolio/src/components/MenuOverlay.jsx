import { useLayoutEffect, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const MENU_LINKS = [
  { label: "Home",     type: "route",  path: "/" },
  { label: "Projects", type: "route",  path: "/projects" },
  { label: "About",    type: "scroll", id: "about" },
  { label: "Contact",  type: "route",  path: "/contact" },
];

export default function MenuOverlay({ isOpen, setIsOpen }) {
  const overlayRef = useRef();

  useLayoutEffect(() => {
    gsap.set(overlayRef.current, { y: "-100%" });
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, setIsOpen]);

  useLayoutEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { y: 0, duration: 0.9, ease: "power4.inOut" });
      gsap.set(".menu-item", { y: 40, opacity: 0 });
      gsap.to(".menu-item", {
        y: 0, opacity: 1, stagger: 0.08, delay: 0.35,
        duration: 0.8, ease: "power3.out",
      });
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, { y: "-100%", duration: 0.8, ease: "power4.inOut" });
    }
  }, [isOpen]);

  return (
    <div
      id="menu-overlay"
      ref={overlayRef}
      role="dialog"
      aria-modal={isOpen}
      aria-hidden={!isOpen}
      aria-label="Navigation menu"
      className="fixed inset-0 z-[999] bg-graphite-950 overflow-hidden"
    >
      {/* 2-row grid — no close button row, navbar handles open/close */}
      <div className="w-full h-screen px-6 md:px-8 lg:px-12 xl:px-16
                      grid grid-rows-[1fr_auto] pt-24 pb-8 md:pb-12">

        {/* Row 1 — Nav Links */}
        <nav aria-label="Overlay navigation" className="flex items-center">
          <ul className="flex flex-col list-none m-0 p-0 w-full"
              style={{ gap: "clamp(0.25rem, 1.5vh, 1.5rem)" }}>
            {MENU_LINKS.map((item) => (
              <li key={item.label}>
                {item.type === "route" ? (
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    style={{ fontSize: "clamp(3rem, 10vw, 7rem)", lineHeight: 1 }}
                    className="menu-item relative group block font-bold uppercase
                               tracking-tight text-gray-400 hover:text-platinum-50
                               transition-colors duration-300"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute left-0 -bottom-0 h-[2px] w-0 bg-platinum-50
                                       transition-all duration-500 group-hover:w-full" />
                    </span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      if (location.pathname !== "/") {
                        navigate("/");
                        setTimeout(() => {
                          document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                        }, 400);
                      } else {
                        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    style={{ fontSize: "clamp(3rem, 10vw, 7rem)", lineHeight: 1 }}
                    className="menu-item relative group block font-bold uppercase
                               tracking-tight text-gray-400 hover:text-platinum-50
                               transition-colors duration-300 text-left w-full"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute left-0 -bottom-0 h-[2px] w-0 bg-platinum-50
                                       transition-all duration-500 group-hover:w-full" />
                    </span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Row 2 — Footer Meta */}
        <div className="text-xs uppercase tracking-widest text-gray-500 pb-2">
          © 2026 Sparsh Balodia
        </div>

      </div>
    </div>
  );
}