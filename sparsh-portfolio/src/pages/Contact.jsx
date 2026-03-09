import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Contact() {
  const pageRef = useRef();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  /* ── Entrance animation ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power4.out", delay: 0.1 }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://formspree.io/f/xbdzjjwo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setSent(true);
  };

  return (
    <main
      ref={pageRef}
      className="min-h-screen bg-graphite-950 pt-20 px-6 md:px-8 lg:px-12 xl:px-16"
    >
      <div className="max-w-screen-xl mx-auto py-[5vw]">

        {/* ── Header ── */}
        <div className="overflow-hidden mb-16 md:mb-24">
          <h1
            className="contact-reveal text-[12vw] md:text-[8vw]
                       font-bold uppercase tracking-tight
                       leading-[0.85] text-platinum-50 opacity-80"
          >
            Let's Talk
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* ── Left — info ── */}
          <div className="flex flex-col justify-between gap-12">

            <div>
              <p className="contact-reveal text-gray-400 text-base md:text-lg leading-relaxed max-w-sm">
                Have a project in mind or just want to say hi?
                I'm always open to new opportunities and collaborations.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="contact-reveal">
                <p className="uppercase tracking-widest text-xs text-gray-600 mb-1">Email</p>
                <a
                  href="mailto:sparshbalodia1608@gmail.com"
                  className="text-sm text-gray-300 hover:text-platinum-50
                             transition-colors duration-300 underline-offset-4
                             hover:underline"
                >
                  sparshbalodia1608@gmail.com
                </a>
              </div>

              <div className="contact-reveal">
                <p className="uppercase tracking-widest text-xs text-gray-600 mb-2">Socials</p>
                <div className="flex gap-6">
                  {[
                    { label: "LinkedIn",  href: "https://linkedin.com/in/sparshbalodia" },
                    { label: "Github",    href: "https://github.com/sparshbalodia" },
                    { label: "X", href: "https://x.com/sparsh_balodia"},
                    { label: "Instagram", href: "https://instagram.com/sparsh_balodia" },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group uppercase tracking-widest text-xs text-gray-400
                                 hover:text-platinum-50 transition-colors duration-300"
                    >
                      {label}
                      <span className="absolute left-0 -bottom-0.5 h-[1px] w-0 bg-platinum-50
                                       transition-all duration-300 group-hover:w-full" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* ── Right — form ── */}
          <div className="contact-reveal">
            {sent ? (
              <div className="flex flex-col gap-4 pt-4">
                <p className="text-platinum-50 text-lg font-medium">Message sent ✓</p>
                <p className="text-gray-400 text-sm">I'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="uppercase tracking-widest text-xs text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-transparent border-b border-gray-800
                               text-platinum-50 text-sm py-3 outline-none
                               placeholder:text-gray-700
                               focus:border-gray-500
                               transition-colors duration-300"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="uppercase tracking-widest text-xs text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="bg-transparent border-b border-gray-800
                               text-platinum-50 text-sm py-3 outline-none
                               placeholder:text-gray-700
                               focus:border-gray-500
                               transition-colors duration-300"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="uppercase tracking-widest text-xs text-gray-600">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className="bg-transparent border-b border-gray-800
                               text-platinum-50 text-sm py-3 outline-none
                               placeholder:text-gray-700 resize-none
                               focus:border-gray-500
                               transition-colors duration-300"
                  />
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3
                               px-6 py-3 rounded-full
                               border border-gray-700
                               text-xs uppercase tracking-widest text-gray-400
                               hover:border-platinum-50 hover:text-platinum-50
                               transition-all duration-300"
                  >
                    Send Message
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      ↗
                    </span>
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}