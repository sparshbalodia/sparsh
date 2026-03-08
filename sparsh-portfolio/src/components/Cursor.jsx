import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let pos = { x: mouse.x, y: mouse.y };

    // Unified transform state
    let state = {
      baseScale: 1,
      scrollSquash: 1,
    };

    let rafId;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      opacity: 1,
    });

    /* ================= SMOOTH FOLLOW LOOP ================= */
    const update = () => {
      const prevX = pos.x;
      const prevY = pos.y;

      // Lerp follow
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;

      const vx = pos.x - prevX;
      const vy = pos.y - prevY;
      const speed = Math.sqrt(vx * vx + vy * vy);

      const distortion = speed * 0.0025;

      const finalScaleX = state.baseScale + distortion;
      const finalScaleY = (state.baseScale - distortion) * state.scrollSquash;

      gsap.set(cursor, {
        x: pos.x,
        y: pos.y,
        scaleX: finalScaleX,
        scaleY: finalScaleY,
      });

      rafId = requestAnimationFrame(update);
    };

    update();

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMove);

    /* ================= VIEWPORT EXIT ================= */
    const onLeave = (e) => {
      if (!e.relatedTarget) {
        gsap.to(cursor, { opacity: 0, duration: 0.2, ease: "power2.out" });
      }
    };

    const onEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3, ease: "power3.out" });
    };

    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    /* ================= HOVER SCALE ================= */
    const onHoverIn = (e) => {
      if (e.target.closest("a, button")) {
        gsap.to(state, {
          baseScale: 2,
          duration: 0.3,
          ease: "power3.out",
        });
      }
    };

    const onHoverOut = (e) => {
      if (e.target.closest("a, button")) {
        gsap.to(state, {
          baseScale: 1,
          duration: 0.3,
          ease: "power3.out",
        });
      }
    };

    document.addEventListener("mouseover", onHoverIn);
    document.addEventListener("mouseout", onHoverOut);

    /* ================= SCROLL SQUASH ================= */
    let scrollTimeout;

    const onScroll = () => {
      gsap.to(state, {
        scrollSquash: 0.6,
        duration: 0.15,
        ease: "power2.out",
      });

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        gsap.to(state, {
          scrollSquash: 1,
          duration: 0.3,
          ease: "power3.out",
        });
      }, 120);
    };

    window.addEventListener("scroll", onScroll);

    /* ================= CLEANUP ================= */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onHoverIn);
      document.removeEventListener("mouseout", onHoverOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[5000] w-3 h-3 bg-platinum-50 rounded-full mix-blend-difference"
    />
  );
}