import { useLayoutEffect, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "Rupaya",
    year: "2026",
    category: "Fintech · Web App",
    description:
      "A modern finance platform built for speed and reliability. Focused on clean UX and seamless transaction flows.",
    tags: ["React", "Tailwind CSS", "FastAPI", "MongoDB"],
    href: "https://rupaya.co.in/",
  },
  // {
  //   id: 2,
  //   title: "Project Name",
  //   year: "2025",
  //   category: "Category",
  //   description: "Description",
  //   tags: ["Tag1", "Tag2"],
  //   href: "#",
  // },
];

export default function Projects() {
  const pageRef = useRef();

  /* ── Entrance animation ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-reveal",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.1 }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  /* ── Scroll reveal rows ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".proj-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
  const cards = pageRef.current?.querySelectorAll(".proj-card");
  if (!cards) return;

  const cleanups = [];  // 👈 collect cleanups

  cards.forEach((card) => {
    const inner = card.querySelector(".proj-title-inner");
    const clone = card.querySelector(".proj-title-clone");
    if (!inner || !clone) return;

    const enter = () => {
      gsap.to(inner, { y: "-100%", duration: 0.5, ease: "power3.inOut" });
      gsap.to(clone, { y: "-100%", duration: 0.5, ease: "power3.inOut" });
    };

    const leave = () => {
      gsap.to(inner, { y: "0%", duration: 0.5, ease: "power3.inOut" });
      gsap.to(clone, { y: "0%", duration: 0.5, ease: "power3.inOut" });
    };

    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);

    cleanups.push(() => {  // 👈 push instead of return
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
    });
  });

  return () => cleanups.forEach((fn) => fn());  // 👈 run all cleanups
}, []);

  return (
    <main ref={pageRef} className="min-h-screen bg-graphite-950 pt-20">
      <div className="px-6 md:px-8 lg:px-12 xl:px-16 py-[6vw]">

        {/* ── Header ── */}
        <div className="mb-16 md:mb-24">
          <div className="overflow-hidden">
            <h1 className="proj-reveal text-[12vw] md:text-[8vw]
                           font-bold uppercase tracking-tight
                           leading-[0.85] text-platinum-50 opacity-80">
              Projects
            </h1>
          </div>
          <p className="proj-reveal text-gray-500 text-sm uppercase tracking-widest mt-4">
            {PROJECTS.length} {PROJECTS.length === 1 ? "project" : "projects"} — Selected Work
          </p>
        </div>

        {/* ── Project list ── */}
        <div className="w-full">
          {PROJECTS.map((proj, i) => (
            <a
              key={proj.id}
              href={proj.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`proj-card group relative flex flex-col md:flex-row
                          md:items-center justify-between
                          py-8 md:py-10
                          border-t border-gray-800 cursor-none
                          hover:border-gray-600 transition-colors duration-300
                          ${i === PROJECTS.length - 1 ? "border-b border-gray-800" : ""}`}
            >
              {/* Left — index + title */}
              <div className="flex items-start md:items-center gap-6 md:gap-10">
                <span className="text-xs text-gray-600 uppercase tracking-widest
                                 mt-1 md:mt-0 w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex flex-col gap-2">
                  {/* Title with slide-up animation on hover */}
                  <h2 className="relative overflow-hidden
                                 text-[8vw] md:text-[3.5vw] font-bold uppercase
                                 tracking-tight leading-none
                                 text-platinum-50 opacity-70
                                 group-hover:opacity-100
                                 transition-opacity duration-300">
                    <span className="proj-title-inner block">{proj.title}</span>
                    <span className="proj-title-clone absolute top-full left-0"
                          aria-hidden="true">
                      {proj.title}
                    </span>
                  </h2>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">
                    {proj.category}
                  </p>
                </div>
              </div>

              {/* Right — tags + year + arrow */}
              <div className="flex items-center gap-6 mt-4 md:mt-0 pl-12 md:pl-0">

                {/* Tags — hidden on mobile */}
                <div className="hidden md:flex gap-2">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs uppercase tracking-widest text-gray-600
                                 border border-gray-800 px-3 py-1 rounded-full
                                 group-hover:border-gray-600 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs uppercase tracking-widest text-gray-500">
                  {proj.year}
                </span>

                {/* Arrow */}
                <span className="w-8 h-8 rounded-full border border-gray-800
                                 flex items-center justify-center text-gray-600
                                 group-hover:border-platinum-50 group-hover:text-platinum-50
                                 group-hover:translate-x-1 group-hover:-translate-y-1
                                 transition-all duration-300 text-sm">
                   <i className="ri-arrow-right-up-line text-sm" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* ── Empty state ── */}
        {PROJECTS.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32">
            <p className="text-gray-600 uppercase tracking-widest text-sm">
              No projects yet
            </p>
          </div>
        )}

      </div>
    </main>
  );
}