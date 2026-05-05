export default function Footer() {
  return (
    <footer className="py-10 px-5 sm:px-8 border-t border-linen">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="font-sans font-semibold text-xs sm:text-sm tracking-widest text-ash/75">
          TQB
        </span>
        <span className="text-xs tracking-[0.2em] uppercase font-sans text-ash/65">
          © {new Date().getFullYear()} Quan Bui
        </span>
      </div>
    </footer>
  );
}
