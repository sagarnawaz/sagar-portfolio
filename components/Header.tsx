export default function Header() {
  return (
    <header className="p-8 md:p-12 flex justify-between items-center pointer-events-auto mix-blend-difference w-full">
      <div className="logo font-mono font-bold text-xl tracking-tighter">AETHER.DEV</div>
      <div className="status font-mono text-xs flex items-center gap-2.5">
        <div className="status-dot w-2 h-2 bg-[#00f3ff] rounded-full shadow-[0_0_10px_#00f3ff] animate-pulse"></div>
        <span>ONLINE</span>
      </div>
    </header>
  );
}
