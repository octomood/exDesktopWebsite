import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** maximum rotation in degrees at the edges */
  max?: number;
};

/**
 * Pointer-following tilt for the window screenshots.
 * Pointer only: touch devices and reduced-motion users get a static frame.
 */
export function Tilt({ children, className = '', max = 3.4 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let release = 0;

    const move = (event: PointerEvent) => {
      /* touch and pen drags should never bend the window */
      if (event.pointerType !== 'mouse' || still.matches) return;

      const rect = el.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const py = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));

      cancelAnimationFrame(frame);
      window.clearTimeout(release);
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`);
        el.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`);
        el.style.setProperty('--mx', `${px * 100}%`);
        el.style.setProperty('--my', `${py * 100}%`);
        el.classList.add('is-tilting');
      });
    };

    const reset = () => {
      cancelAnimationFrame(frame);
      el.classList.remove('is-tilting');
      el.style.removeProperty('--rx');
      el.style.removeProperty('--ry');
      /*
       * Keep the highlight where the pointer left it while its opacity fades,
       * otherwise it snaps to the centre before disappearing.
       */
      window.clearTimeout(release);
      release = window.setTimeout(() => {
        el.style.removeProperty('--mx');
        el.style.removeProperty('--my');
      }, 320);
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    el.addEventListener('blur', reset);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(release);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', reset);
      el.removeEventListener('blur', reset);
    };
  }, [max]);

  return (
    <div ref={ref} className={`tilt ${className}`.trim()}>
      <div className="tilt__inner">{children}</div>
    </div>
  );
}
