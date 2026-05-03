const items = [
  'Software Developer',
  'Web Apps',
  'Clean Code',
  'Thoughtful UX',
  'Next.js',
  'TypeScript',
  'Open to Work',
];

const repeated = [...items, ...items, ...items];

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-linen py-4 select-none">
      <div className="flex gap-0 animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6">
            <span className="text-[11px] tracking-[0.25em] uppercase font-sans text-ash">
              {item}
            </span>
            <span className="text-clay text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
