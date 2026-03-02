import { useLayoutEffect, useEffect, useRef } from "react";
import { gsap } from "gsap";

const MENU_LINKS = [
  { label: "Home",    href: "#home" },
  { label: "Work",    href: "#work" },
  { label: "About",   href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function MenuOverlay({ isOpen, setIsOpen }) {
  const overlayRef = useRef();

  // GSAP owns the initial off-screen position — no Tailwind translate class
  useLayoutEffect(() => {
    gsap.set(overlayRef.current, { y: "-100%" });
  }, []);

  // Escape key to close
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

      gsap.to(overlayRef.current, {
        y: 0,
        duration: 0.9,
        ease: "power4.inOut",
      });

      gsap.set(".menu-item", { y: 40, opacity: 0 });
      gsap.to(".menu-item", {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        delay: 0.35,
        duration: 0.8,
        ease: "power3.out",
      });
    } else {
      document.body.style.overflow = "";

      gsap.to(overlayRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
      });
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
      className="fixed inset-0 z-[1001] bg-graphite-950 overflow-hidden"
    >
      {/*
        Layout: 3-row grid — close button / nav links / footer
        Using grid instead of flex justify-between so each row
        gets a predictable slice of the screen height.
        h-screen with overflow-hidden prevents any bleed.
      */}
      <div className="w-full h-screen px-6 md:px-8 lg:px-12 xl:px-16
                      grid grid-rows-[auto_1fr_auto] py-8 md:py-12">

        {/* Row 1 — Close Button */}
        <div className="flex justify-end items-center h-14">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="uppercase tracking-widest text-sm text-gray-400 hover:text-platinum-50 transition-colors duration-300"
          >
            Close
          </button>
        </div>

        {/* Row 2 — Nav Links (fills remaining space, vertically centered) */}
        <nav
          aria-label="Overlay navigation"
          className="flex items-center"
        >
          <ul className="flex flex-col list-none m-0 p-0 w-full"
              style={{ gap: "clamp(0.25rem, 1.5vh, 1.5rem)" }}>
            {MENU_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => setIsOpen(false)}
                  style={{ fontSize: "clamp(3rem, 10vw, 7rem)", lineHeight: 1 }}
                  className="menu-item block font-bold uppercase tracking-tight
                             text-gray-400 hover:text-platinum-50
                             transition-colors duration-300"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Row 3 — Footer Meta */}
        <div className="text-xs uppercase tracking-widest text-gray-500 pb-2">
          © 2026 Sparsh Balodia
        </div>

      </div>
    </div>
  );
}