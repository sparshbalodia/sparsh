import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,          // scroll duration — higher = slower/smoother
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease
      smoothWheel: true,      // smooth mouse wheel
      smoothTouch: false,     // keep native on touch devices (better UX)
    });

    window.lenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger so scroll-based animations
    // stay in sync with the smooth scroll position
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Prevent GSAP ticker from lagging behind on low frame rates
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      window.lenis = null;
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);
}