import { useEffect, useRef } from 'react';

/**
 * A small accent dot that trails the mouse with easing.
 * It is decorative: the native cursor stays, and the dot never blocks clicks.
 */
export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const coarse = window.matchMedia('(pointer: coarse)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (coarse.matches || still.matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frame = 0;
    let visible = false;

    const show = () => {
      if (visible) return;
      visible = true;
      x = targetX;
      y = targetY;
      el.classList.add('is-visible');
    };

    const hide = () => {
      visible = false;
      el.classList.remove('is-visible', 'is-active');
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;
      show();

      const interactive = (event.target as Element | null)?.closest(
        'a, button, [role="button"], input, select, textarea, label, summary',
      );
      el.classList.toggle('is-active', Boolean(interactive));
    };

    const tick = () => {
      x += (targetX - x) * 0.16;
      y += (targetY - y) * 0.16;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
    };
  }, []);

  return <div ref={ref} className="cursor-dot" aria-hidden="true" />;
}
