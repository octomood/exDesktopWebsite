import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';
import { Icon } from './Icon';
import { Tilt } from './Tilt';
import { useI18n } from '../i18n';
import { asset } from '../lib/asset';

const clamp = (value: number) => Math.min(1, Math.max(-1, value));

export function Hero() {
  const { t } = useI18n();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  /* let the headline lean towards the pointer while it floats on its own */
  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    if (!hero || !title) return;

    const fine = window.matchMedia('(pointer: fine)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || still.matches) return;

    let frame = 0;

    const lean = (x: number, y: number) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        title.style.setProperty('--mx', clamp(x).toFixed(3));
        title.style.setProperty('--my', clamp(y).toFixed(3));
      });
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = hero.getBoundingClientRect();
      lean(((event.clientX - rect.left) / rect.width) * 2 - 1, ((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const reset = () => lean(0, 0);

    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', reset);
    window.addEventListener('blur', reset);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', reset);
      window.removeEventListener('blur', reset);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-enter" style={{ '--d': '0ms' } as CSSProperties}>
            {t.hero.eyebrow}
          </p>

          <h1 className="display hero-title" ref={titleRef}>
            <span className="hero-title__line">
              <span className="hero-title__word hero-enter" style={{ '--d': '70ms' } as CSSProperties}>
                {t.hero.titleA}
              </span>
            </span>
            <span className="hero-title__line hero-title__line--accent">
              <span className="hero-title__word hero-title__accent hero-enter" style={{ '--d': '130ms' } as CSSProperties}>
                {t.hero.titleB}
              </span>
            </span>
          </h1>

          <p className="lead hero-lead hero-enter" style={{ '--d': '210ms' } as CSSProperties}>
            {t.hero.lead}
          </p>

          <div className="hero-actions hero-enter" style={{ '--d': '290ms' } as CSSProperties}>
            <Link to="/#install" className="btn btn--primary">
              <Icon name="download" size={18} />
              {t.hero.primary}
            </Link>
            <Link to="/docs" className="btn btn--outline">
              {t.hero.secondary}
              <Icon name="arrow" size={17} />
            </Link>
          </div>

          <dl className="hero-facts hero-enter" style={{ '--d': '370ms' } as CSSProperties}>
            {t.hero.facts.map((fact) => (
              <div key={fact.label} className="hero-facts__item">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-visual hero-enter" style={{ '--d': '180ms' } as CSSProperties}>
          <Tilt className="hero-tilt">
            <div className="hero-blob" aria-hidden="true" />

            <div className="app-window">
              <div className="app-window__shot-wrap">
                <img
                  className="app-window__shot"
                  src={asset('shots/appearance.webp')}
                  alt={t.preview.tabs[0].alt}
                  width={1600}
                  height={1000}
                  fetchPriority="high"
                  draggable={false}
                />
              </div>
            </div>

            <div className="hero-badge">
              <span className="hero-badge__ico">
                <Icon name="spark" size={16} />
              </span>
              <span>
                <b>Material 3</b> Expressive
              </span>
            </div>
          </Tilt>
        </div>
      </div>

      <a className="hero-scroll" href="#preview">
        <span>{t.ui.scrollHint}</span>
        <span className="hero-scroll__line" aria-hidden="true" />
      </a>
    </section>
  );
}
