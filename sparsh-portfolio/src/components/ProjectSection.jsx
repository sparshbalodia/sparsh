import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "Rupaya",
    year: "2026",
    img: "/rupaya.png",
    href: "https://rupaya.co.in/",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const lastMouseX = useRef(0);

  /* ================= CURSOR FOLLOW ================= */
  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;

    gsap.set(img, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(img, "x", {
      duration: 0.55,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(img, "y", {
      duration: 0.55,
      ease: "power3.out",
    });

    const rTo = gsap.quickTo(img, "rotation", {
      duration: 0.55,
      ease: "power3.out",
    });

    const onEnter = (e) => {
      lastMouseX.current = e.clientX;
    };

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = e.clientX - lastMouseX.current;
      lastMouseX.current = e.clientX;

      xTo(x);
      yTo(y);
      rTo(dx * 0.3);
    };

    const onSectionLeave = () => {
      gsap.to(img, {
        opacity: 0,
        scale: 0.88,
        rotation: 0,
        duration: 0.4,
        ease: "power3.in",
      });

      section.querySelectorAll(".proj-title").forEach((el) => {
        gsap.to(el, {
          x: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      });
    };

    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onSectionLeave);

    return () => {
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onSectionLeave);
    };
  }, []);

  /* ================= SCROLL REVEAL ================= */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows =
        sectionRef.current?.querySelectorAll(".proj-row") || [];

      gsap.from(rows, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ================= HOVER ================= */
  const handleEnter = (src, titleEl) => {

    if (window.innerWidth < 768) return;

    const img = imgRef.current;
    if (!img) return;

    img.src = src;

    gsap.to(img, {
      opacity: 1,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    });

    if (titleEl) {
      gsap.to(titleEl, {
        x: 40,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  };

  const handleLeave = (titleEl) => {
    if (titleEl) {
      gsap.to(titleEl, {
        x: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-graphite-950 pt-[5vw] overflow-hidden"
    >
      {/* Floating Image */}
      <img
        ref={imgRef}
        src={PROJECTS[0].img}
        alt=""
        className="hidden md:block absolute pointer-events-none z-[20]
                   w-[12vw] h-auto object-cover rounded-xl
                   opacity-0 scale-[0.88]"
        style={{ top: 0, left: 0 }}
      />

      {/* Section Label */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 mb-8">
        <span className="uppercase tracking-widest text-xs text-gray-400">
          Recent Project
        </span>
      </div>

      {/* Rows */}
      <div className="w-full">
        {PROJECTS.map((proj, i) => (
          <a
            key={proj.id}
            href={proj.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) =>
              handleEnter(
                proj.img,
                e.currentTarget.querySelector(".proj-title")
              )
            }
            onMouseLeave={(e) =>
              handleLeave(
                e.currentTarget.querySelector(".proj-title")
              )
            }
            className={`proj-row relative flex items-center justify-between
                        px-6 md:px-8 lg:px-12 xl:px-16 py-[3.5vw]
                        cursor-none group
                        border-t border-gray-800
                        ${
                          i === PROJECTS.length - 1
                            ? "border-b border-gray-800"
                            : ""
                        }`}
          >
            <h2
              className="proj-title text-[7.5vw] font-bold uppercase tracking-tight
                         text-platinum-50 opacity-70 group-hover:opacity-20
                         transition-opacity duration-500
                         leading-none select-none"
            >
              {proj.title}
            </h2>

            <span className="text-xs uppercase tracking-widest text-gray-400">
              {proj.year}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}