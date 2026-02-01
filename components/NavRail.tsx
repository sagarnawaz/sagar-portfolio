"use client";

export default function NavRail() {
  return (
    <nav className="nav-rail hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-8 z-20 pointer-events-auto">
      {["Intro", "About", "Works", "Contact"].map((label, index) => (
        <div
          key={label}
          className={`nav-dot w-3 h-3 border border-white/30 rounded-full transition-all duration-300 relative cursor-pointer group ${index === 0 ? "active" : ""}`}
          data-label={label}
          data-section={index}
          onClick={() => {
             const target = document.getElementById(`section-${index}`);
             if (target) {
                 window.scrollTo({
                     top: target.offsetTop,
                     behavior: "smooth"
                 });
             }
          }}
        >
            <span className="absolute right-[25px] top-1/2 -translate-y-1/2 translate-x-[10px] font-mono text-[0.7rem] opacity-0 transition-all duration-300 whitespace-nowrap text-[#00f3ff] group-hover:opacity-100 group-hover:translate-x-0">
                {label}
            </span>
        </div>
      ))}
    </nav>
  );
}
