import { useEffect } from 'react';

/**
 * A soft accent ripple under the pointer on every primary click.
 * Decorative only: it never captures the event and stays out of the a11y tree.
 */
export function ClickRipple() {
  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)');
    if (still.matches || coarse.matches) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;

      const ripple = document.createElement('span');
      ripple.className = 'click-ripple';
      ripple.setAttribute('aria-hidden', 'true');
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;

      const timer = window.setTimeout(() => ripple.remove(), 900);
      ripple.addEventListener(
        'animationend',
        () => {
          window.clearTimeout(timer);
          ripple.remove();
        },
        { once: true },
      );

      document.body.appendChild(ripple);
    };

    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, []);

  return null;
}
