export default function Footer() {
  return (
    <footer className="py-10 px-5 sm:px-8 border-t border-linen">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="font-mono font-bold text-xs sm:text-sm tracking-widest text-ink">
          TQB
        </span>
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-ash/65">
          © {new Date().getFullYear()} Quan Bui
        </span>
      </div>
    </footer>
  );
}
