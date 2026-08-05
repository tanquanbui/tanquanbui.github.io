// Pure CSS animation: the browser rasterizes the blurred blob once per
// layer and then only updates a transform matrix on the compositor thread
// each frame, instead of recomputing spring/tween values in JS every tick.
const blobs = [
  { color: 'rgba(190,172,226,0.45)', size: '55vw', top: '-10%', left: '-10%', x1: '120px', y1: '80px', x2: '-60px', y2: '-40px', duration: 26 },
  { color: 'rgba(238,190,205,0.38)', size: '46vw', top: '20%', right: '-15%', x1: '-100px', y1: '60px', x2: '40px', y2: '-60px', duration: 30 },
  { color: 'rgba(178,215,195,0.32)', size: '42vw', bottom: '-10%', left: '20%', x1: '70px', y1: '-50px', x2: '-80px', y2: '40px', duration: 34 },
];

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-paper overflow-hidden">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="bg-blob absolute rounded-full"
          style={
            {
              width: blob.size,
              height: blob.size,
              background: blob.color,
              filter: 'blur(48px)',
              top: blob.top,
              left: (blob as any).left,
              right: (blob as any).right,
              bottom: (blob as any).bottom,
              animationDuration: `${blob.duration}s`,
              '--x1': blob.x1,
              '--y1': blob.y1,
              '--x2': blob.x2,
              '--y2': blob.y2,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
