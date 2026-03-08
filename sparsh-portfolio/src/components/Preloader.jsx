import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const counter = counterRef.current;

    const tl = gsap.timeline();

    // Step 1 — Count 0 → 100
    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function () {
          counter.textContent = Math.round(this.targets()[0].val) + "%";
        },
      }
    )

    // Step 2 — Brief pause at 100%
    .to({}, { duration: 0.3 })

    // Step 3 — Fade content out, bg goes black
    .to(".preloader-content", {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    })
    .to(
      container,
      {
        backgroundColor: "#111113",
        duration: 0.5,
        ease: "power2.inOut",
      },
      "<"
    )

    // Step 4 — Slide entire preloader up off screen
    .to(container, {
      yPercent: -100,
      duration: 0.9,
      ease: "power4.inOut",
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "#a8a8a8" }} // matches cynthiaugwu gray
    >
      {/* Name — line — counter */}
      <div className="preloader-content flex items-center gap-6">
        <span
          className="text-sm tracking-wide"
          style={{ color: "#111113" }}
        >
          Sparsh Balodia
        </span>

        {/* Divider line */}
        <div
          className="w-16 h-px"
          style={{ backgroundColor: "#111113", opacity: 0.4 }}
        />

        {/* Counter */}
        <span
          ref={counterRef}
          className="text-sm tracking-wide tabular-nums"
          style={{ color: "#111113" }}
        >
          0%
        </span>
      </div>
    </div>
  );
}