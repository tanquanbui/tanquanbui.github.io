export default function Footer() {
  return (
    <footer className="py-10 px-5 sm:px-8 border-t border-linen">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="font-sans font-semibold text-sm tracking-widest text-ash/60">
          TQB
        </span>
        <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-ash/50">
          © {new Date().getFullYear()} Tan Quan Bui
        </span>
      </div>
    </footer>
  );
}
