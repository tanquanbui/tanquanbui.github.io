// A static hairline grid — the same blueprint motif as the hero's WebGL
// canvas, but zero-cost: one CSS paint, no animation, no JS.
export default function Background() {
  return (
    <div
      className="fixed inset-0 -z-10 bg-paper"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(10,10,10,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,10,0.045) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    />
  );
}
