import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Icon } from './Icon';
import { useI18n } from '../i18n';
import { release } from '../data/release';

export function Preview() {
  const { t } = useI18n();
  const tabs = t.preview.tabs;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (index: number) => {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        go(index + 1);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        go(index - 1);
        break;
      case 'Home':
        event.preventDefault();
        go(0);
        break;
      case 'End':
        event.preventDefault();
        go(tabs.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <section className="section preview" id="preview">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">{t.preview.eyebrow}</p>
            <h2 className="h2">{t.preview.title}</h2>
          </div>
          <p className="lead">{t.preview.lead}</p>
        </div>

        <div className="preview-shell">
          <div className="preview-stage">
            <div className="preview-frame">
              <div className="preview-frame__bar">
                <span className="app-window__dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="preview-frame__title">
                  exDesktop <span className="muted">—</span> {tabs[active].label}
                </span>
                <span className="mono preview-frame__version">{release.tag}</span>
              </div>
              <div className="preview-frame__screen">
                {tabs.map((tab, index) => (
                  <img
                    key={tab.id}
                    src={tab.image}
                    alt={tab.alt}
                    width={1600}
                    height={1000}
                    className={index === active ? 'is-active' : ''}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    aria-hidden={index !== active}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="preview-panel">
            <div className="preview-tabs" role="tablist" aria-orientation="vertical" aria-label={t.preview.eyebrow}>
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`preview-tab-${tab.id}`}
                  aria-selected={index === active}
                  aria-controls="preview-panel"
                  tabIndex={index === active ? 0 : -1}
                  className={`preview-tab ${index === active ? 'is-active' : ''}`}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  <span className="preview-tab__index mono">{String(index + 1).padStart(2, '0')}</span>
                  <span className="preview-tab__label">{tab.label}</span>
                  <span className="preview-tab__mark" aria-hidden="true" />
                </button>
              ))}
            </div>

            <div
              className="preview-copy"
              id="preview-panel"
              role="tabpanel"
              aria-labelledby={`preview-tab-${tabs[active].id}`}
              tabIndex={0}
            >
              <div className="preview-copy__top">
                <span className="mono muted">
                  {String(active + 1).padStart(2, '0')} / {String(tabs.length).padStart(2, '0')}
                </span>
                <div className="preview-nav">
                  <button
                    type="button"
                    className="icon-btn preview-nav__btn"
                    onClick={() => setActive((active - 1 + tabs.length) % tabs.length)}
                    aria-label={t.docs.prev}
                  >
                    <Icon name="chevronRight" size={18} className="flip-x" />
                  </button>
                  <button
                    type="button"
                    className="icon-btn preview-nav__btn"
                    onClick={() => setActive((active + 1) % tabs.length)}
                    aria-label={t.docs.next}
                  >
                    <Icon name="chevronRight" size={18} />
                  </button>
                </div>
              </div>
              <h3 className="h3">{tabs[active].title}</h3>
              <p className="preview-copy__text">{tabs[active].text}</p>
              <p className="preview-hint">
                <Icon name="terminal" size={15} />
                {t.preview.hint}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
