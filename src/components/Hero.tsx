import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';
import { Icon } from './Icon';
import { Tilt } from './Tilt';
import { useI18n } from '../i18n';

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-enter" style={{ '--d': '0ms' } as CSSProperties}>
            {t.hero.eyebrow}
          </p>

          <h1 className="display hero-title">
            <span className="hero-enter" style={{ '--d': '70ms' } as CSSProperties}>
              {t.hero.titleA}
            </span>
            <span className="hero-title__accent hero-enter" style={{ '--d': '130ms' } as CSSProperties}>
              {t.hero.titleB}
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
                  src="/shots/appearance.webp"
                  alt={t.preview.tabs[0].alt}
                  width={1600}
                  height={1000}
                  fetchPriority="high"
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
