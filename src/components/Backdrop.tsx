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

/* Large, soft Material shapes — circle, squircle and pill — drifting upward. */
const shapes: Shape[] = [
  { color: 'var(--secondary)', width: 460, height: 460, top: '2%', left: '-14%', radius: '50%', mix: 6, delay: '-8s', duration: '44s' },
  { color: 'var(--secondary)', width: 330, height: 330, top: '16%', left: '84%', radius: '30%', mix: 10, delay: '-26s', duration: '40s' },
  { color: 'var(--tertiary)', width: 420, height: 170, top: '50%', left: '-10%', radius: '999px', mix: 9, delay: '-14s', duration: '48s' },
  { color: 'var(--tertiary)', width: 400, height: 400, top: '66%', left: '76%', radius: '26%', mix: 5, delay: '-34s', duration: '46s' },
  { color: 'var(--secondary)', width: 180, height: 180, top: '34%', left: '46%', radius: '50%', mix: 8, delay: '-20s', duration: '54s' },
  { color: 'var(--primary)', width: 300, height: 120, top: '84%', left: '18%', radius: '999px', mix: 8, delay: '-4s', duration: '42s' },
];

export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      {shapes.map((shape, index) => (
        <span
          key={index}
          className="backdrop__shape"
          style={
            {
              '--c': shape.color,
              '--w': `${shape.width}px`,
              '--h': `${shape.height}px`,
              '--t': shape.top,
              '--l': shape.left,
              '--r': shape.radius,
              '--mix': `${shape.mix}%`,
              '--delay': shape.delay,
              '--dur': shape.duration,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
