import type { CSSProperties } from 'react';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { Tilt } from './Tilt';
import { useI18n } from '../i18n';
import { release } from '../data/release';
import { asset } from '../lib/asset';

export function Showcase() {
  const { t } = useI18n();

  return (
    <section className="section showcase" id="showcase">
      <span className="section-no" aria-hidden="true">02</span>
      <div className="wrap showcase__grid">
        <Reveal className="showcase__copy">
          <p className="eyebrow">{t.showcase.eyebrow}</p>
          <h2 className="h2 showcase__title">{t.showcase.title}</h2>
          <p className="lead showcase__lead">{t.showcase.lead}</p>

          <ul className="showcase__points">
            {t.showcase.points.map((point, index) => (
              <li key={point.label} style={{ '--i': index } as CSSProperties}>
                <span className="showcase__mark">
                  <Icon name="check" size={14} />
                </span>
                <span>
                  <b>{point.label}</b>
                  <span>{point.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal variant="window" delay={80} className="showcase__visual">
          <span className="showcase__blob" aria-hidden="true" />
          <Tilt className="showcase__tilt">
            <div className="preview-frame showcase__frame">
              <div className="preview-frame__bar">
                <span className="app-window__dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="preview-frame__title">
                  exDesktop <span className="muted">—</span> {t.showcase.windowTitle}
                </span>
                <span className="mono preview-frame__version">{release.tag}</span>
              </div>
              <div className="preview-frame__screen">
                <img
                  src={asset('shots/settings.webp')}
                  alt={t.showcase.alt}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  className="is-active"
                  draggable={false}
                />
              </div>
            </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}
