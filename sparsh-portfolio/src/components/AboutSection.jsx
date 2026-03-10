import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.from(".about-img", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        scale: 0.85,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
      });

      // Text stagger reveal
      gsap.from(".about-text-item", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full bg-graphite-950 py-[14vw] px-6 md:px-0 md:pl-[38vw] md:pr-[8vw]"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-16 lg:gap-24 max-w-2xl">

        {/* Image */}
        <div className="about-img flex-shrink-0">
          <img
            src="/sparsh.png"
            alt="Sparsh Balodia"
            className="w-[180px] md:w-[200px] h-[180px] md:h-[200px]
                       object-cover rounded-full
                       grayscale hover:grayscale-0
                       transition-all duration-700"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-5 max-w-[26rem]">

          <h5 className="about-text-item uppercase tracking-wide text-xs text-gray-400 font-bold">
            (About Me)
          </h5>

          <p className="about-text-item text-gray-400 leading-relaxed text-sm md:text-base">
            I'm a web developer focused on building fast, reliable, and user-centric digital experiences. I enjoy transforming complex problems into clean, maintainable code and intuitive interfaces that feel effortless to use. Outside of coding, I explore photography, experiment with new technologies, and create 3D art and renders.
          </p>

          {/* Let's Talk button */}
          <div className="about-text-item">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2
                         px-5 py-3 rounded-full
                         border border-gray-700
                         text-xs uppercase tracking-widest text-gray-400
                         hover:border-platinum-50 hover:text-platinum-50
                         transition-all duration-300"
            >
              Get In Touch
              <span className="text-base leading-none">↗</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}