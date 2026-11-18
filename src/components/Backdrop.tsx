import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

type Shape = {
  color: string;
  width: number;
  height: number;
  top: string;
  left: string;
  radius: string;
  mix: number;
  delay: string;
  duration: string;
};

/*
 * Large, soft Material shapes drifting upward.
 * Every page scene owns its own set: scrolling into another section sends the
 * current shapes off and brings a fresh composition in.
 */
const scenes: Shape[][] = [
  [
    { color: 'var(--secondary)', width: 460, height: 460, top: '2%', left: '-14%', radius: '50%', mix: 6, delay: '-8s', duration: '44s' },
    { color: 'var(--secondary)', width: 330, height: 330, top: '16%', left: '84%', radius: '30%', mix: 10, delay: '-26s', duration: '40s' },
    { color: 'var(--tertiary)', width: 420, height: 170, top: '50%', left: '-10%', radius: '999px', mix: 9, delay: '-14s', duration: '48s' },
    { color: 'var(--tertiary)', width: 400, height: 400, top: '66%', left: '76%', radius: '26%', mix: 5, delay: '-34s', duration: '46s' },
    { color: 'var(--secondary)', width: 180, height: 180, top: '34%', left: '46%', radius: '50%', mix: 8, delay: '-20s', duration: '54s' },
    { color: 'var(--primary)', width: 300, height: 120, top: '84%', left: '18%', radius: '999px', mix: 8, delay: '-4s', duration: '42s' },
  ],
  [
    { color: 'var(--primary)', width: 380, height: 380, top: '8%', left: '78%', radius: '50%', mix: 8, delay: '-6s', duration: '46s' },
    { color: 'var(--tertiary)', width: 300, height: 300, top: '26%', left: '-8%', radius: '28%', mix: 10, delay: '-18s', duration: '42s' },
    { color: 'var(--secondary)', width: 520, height: 180, top: '62%', left: '58%', radius: '999px', mix: 8, delay: '-30s', duration: '50s' },
    { color: 'var(--secondary)', width: 220, height: 220, top: '74%', left: '8%', radius: '50%', mix: 9, delay: '-12s', duration: '40s' },
    { color: 'var(--primary)', width: 340, height: 340, top: '40%', left: '34%', radius: '32%', mix: 5, delay: '-22s', duration: '52s' },
  ],
  [
    { color: 'var(--secondary)', width: 500, height: 200, top: '4%', left: '-12%', radius: '999px', mix: 8, delay: '-10s', duration: '47s' },
    { color: 'var(--primary)', width: 360, height: 360, top: '18%', left: '72%', radius: '30%', mix: 7, delay: '-24s', duration: '43s' },
    { color: 'var(--tertiary)', width: 280, height: 280, top: '55%', left: '82%', radius: '50%', mix: 10, delay: '-16s', duration: '51s' },
    { color: 'var(--secondary)', width: 240, height: 240, top: '78%', left: '20%', radius: '50%', mix: 9, delay: '-4s', duration: '45s' },
    { color: 'var(--tertiary)', width: 380, height: 140, top: '40%', left: '6%', radius: '999px', mix: 7, delay: '-34s', duration: '49s' },
  ],
  [
    { color: 'var(--tertiary)', width: 420, height: 420, top: '-4%', left: '60%', radius: '50%', mix: 9, delay: '-14s', duration: '44s' },
    { color: 'var(--primary)', width: 300, height: 130, top: '30%', left: '84%', radius: '999px', mix: 8, delay: '-6s', duration: '41s' },
    { color: 'var(--secondary)', width: 360, height: 360, top: '52%', left: '-10%', radius: '26%', mix: 10, delay: '-28s', duration: '53s' },
    { color: 'var(--secondary)', width: 200, height: 200, top: '70%', left: '56%', radius: '50%', mix: 9, delay: '-20s', duration: '46s' },
    { color: 'var(--primary)', width: 240, height: 240, top: '84%', left: '12%', radius: '50%', mix: 7, delay: '-2s', duration: '48s' },
  ],
  [
    { color: 'var(--primary)', width: 460, height: 460, top: '10%', left: '86%', radius: '50%', mix: 8, delay: '-8s', duration: '45s' },
    { color: 'var(--secondary)', width: 240, height: 240, top: '6%', left: '10%', radius: '30%', mix: 9, delay: '-22s', duration: '42s' },
    { color: 'var(--tertiary)', width: 520, height: 160, top: '44%', left: '-16%', radius: '999px', mix: 7, delay: '-32s', duration: '50s' },
    { color: 'var(--secondary)', width: 320, height: 320, top: '72%', left: '70%', radius: '50%', mix: 10, delay: '-12s', duration: '47s' },
    { color: 'var(--tertiary)', width: 180, height: 180, top: '88%', left: '40%', radius: '50%', mix: 8, delay: '-26s', duration: '54s' },
  ],
  [
    { color: 'var(--secondary)', width: 420, height: 420, top: '6%', left: '-10%', radius: '28%', mix: 9, delay: '-10s', duration: '46s' },
    { color: 'var(--primary)', width: 320, height: 320, top: '24%', left: '68%', radius: '50%', mix: 8, delay: '-24s', duration: '43s' },
    { color: 'var(--tertiary)', width: 360, height: 140, top: '52%', left: '74%', radius: '999px', mix: 8, delay: '-6s', duration: '49s' },
    { color: 'var(--secondary)', width: 260, height: 260, top: '66%', left: '6%', radius: '50%', mix: 10, delay: '-30s', duration: '44s' },
    { color: 'var(--primary)', width: 200, height: 200, top: '86%', left: '48%', radius: '32%', mix: 7, delay: '-16s', duration: '52s' },
  ],
];

/* Page sections that swap the backdrop, in document order. */
const sceneIds = ['top', 'preview', 'features', 'install', 'roadmap', 'links'];

/* Long enough for the slowest shape to finish leaving. */
const LEAVE_MS = 950;

type LayerProps = {
  shapes: Shape[];
  leaving?: boolean;
};

function ShapeLayer({ shapes, leaving = false }: LayerProps) {
  return (
    <div className={`backdrop__layer ${leaving ? 'is-leaving' : 'is-entering'}`}>
      {shapes.map((shape, index) => (
        <span
          key={index}
          className="backdrop__flight"
          style={
            {
              '--t': shape.top,
              '--l': shape.left,
              '--stagger': `${index * 70}ms`,
            } as CSSProperties
          }
        >
          <span
            className="backdrop__shape"
            style={
              {
                '--c': shape.color,
                '--w': `${shape.width}px`,
                '--h': `${shape.height}px`,
                '--r': shape.radius,
                '--mix': `${shape.mix}%`,
                '--delay': shape.delay,
                '--dur': shape.duration,
              } as CSSProperties
            }
          />
        </span>
      ))}
    </div>
  );
}

export function Backdrop() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const currentRef = useRef(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedRef.current = motion.matches;

    const onMotion = (event: MediaQueryListEvent) => {
      reducedRef.current = event.matches;
    };

    let frame = 0;
    const measure = () => {
      frame = 0;
      /* the scene switches once a section crosses the upper third of the screen */
      const line = window.innerHeight * 0.42;
      let next = 0;
      sceneIds.forEach((id, index) => {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top <= line) next = index;
      });
      if (next === currentRef.current) return;
      if (!reducedRef.current) setPrevious(currentRef.current);
      currentRef.current = next;
      setCurrent(next);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      motion.removeEventListener('change', onMotion);
    };
  }, []);

  useEffect(() => {
    if (previous === null) return;
    const timer = window.setTimeout(() => setPrevious(null), LEAVE_MS);
    return () => window.clearTimeout(timer);
  }, [previous]);

  return (
    <div className="backdrop" aria-hidden="true">
      {previous !== null && previous !== current ? (
        <ShapeLayer key={`out-${previous}`} shapes={scenes[previous]} leaving />
      ) : null}
      <ShapeLayer key={current} shapes={scenes[current]} />
    </div>
  );
}
