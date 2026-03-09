import { useEffect, useState } from "react";

export default function Footer() {
  const [time, setTime] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  // Live IST clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const h = String(ist.getHours()).padStart(2, "0");
      const m = String(ist.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m} IST`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(()=> {
    const interval = setInterval(() => {
      setYear(new Date().getFullYear());
    }, 1000 * 60 *60 * 24);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-graphite-950 border-t border-gray-800
                       px-6 md:px-8 lg:px-12 xl:px-16 py-8
                       flex items-center justify-between">

      {/* Left — year + live time */}
      <div className="flex items-center gap-5">
        <span className="uppercase tracking-widest text-xs text-gray-500">
          &copy; {year} Sparsh Balodia
        </span>
        <span className="uppercase tracking-widest text-xs text-gray-500">
          {time}
        </span>
      </div>

      {/* Right — social links */}
      <div className="flex items-center gap-6 md:gap-8">
        {[
          { label: "Linkedin",  href: "https://linkedin.com/in/sparshbalodia" },
          { label: "Github",  href: "https://github.com/sparshbalodia" },
          { label: "x",  href: "https://x.com/sparsh_balodia" },
          { label: "Instagram", href: "https://instagram.com/sparsh_balodia" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative uppercase tracking-widest text-xs font-bold text-gray-400 hover:text-platinum-50 transition-colors duration-300 ${
              label === "Linkedin" || label === "Github"
                ? "hidden md:block"
                : ""
            }`}
          >
            {label}

            <span className="absolute left-0 -bottom-1 h-[1px] w-full bg-platinum-50 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"/>
          </a>
        ))}
      </div>

    </footer>
  );
}