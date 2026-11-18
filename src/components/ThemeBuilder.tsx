import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Icon } from './Icon';
import { Tilt } from './Tilt';
import { useI18n } from '../i18n';

type MockTheme = 'light' | 'dark';

const swatches = [
  { light: '#c0442a', onLight: '#fff8f5', dark: '#ff9a7d', onDark: '#2a0700' },
  { light: '#0c6178', onLight: '#f2fdff', dark: '#6fd3ef', onDark: '#04222c' },
  { light: '#4f7a12', onLight: '#f8ffe9', dark: '#c3e06a', onDark: '#111c00' },
  { light: '#2f6fd0', onLight: '#f5f9ff', dark: '#a9c9ff', onDark: '#001b3f' },
  { light: '#8a5f14', onLight: '#fffaf0', dark: '#f3d18b', onDark: '#2b1d00' },
  { light: '#a8305a', onLight: '#fff6f9', dark: '#ffb3c8', onDark: '#3a0017' },
];

export function ThemeBuilder() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [mockTheme, setMockTheme] = useState<MockTheme>('dark');
  const swatch = swatches[index];
  const accent = mockTheme === 'dark' ? swatch.dark : swatch.light;
  const onAccent = mockTheme === 'dark' ? swatch.onDark : swatch.onLight;

  const style = {
    '--m-accent': accent,
    '--m-on-accent': onAccent,
    '--m-accent-soft': `color-mix(in oklab, ${accent} 18%, transparent)`,
  } as CSSProperties;

  return (
    <Tilt className="builder-tilt">
    <div className="builder card" id="customise">
      <div className="builder__copy">
        <p className="eyebrow">{t.info.builder.eyebrow}</p>
        <h3 className="h2 builder__title">{t.info.builder.title}</h3>
        <p className="builder__text">{t.info.builder.text}</p>

        <div className="builder__control">
          <span className="builder__label">{t.info.builder.accent}</span>
          <div className="swatches" role="group" aria-label={t.info.builder.accent}>
            {swatches.map((item, itemIndex) => (
              <button
                key={item.light}
                type="button"
                className={`swatch ${itemIndex === index ? 'is-active' : ''}`}
                style={{ '--sw': mockTheme === 'dark' ? item.dark : item.light } as CSSProperties}
                aria-label={t.info.builder.swatchNames[itemIndex]}
                aria-pressed={itemIndex === index}
                title={t.info.builder.swatchNames[itemIndex]}
                onClick={() => setIndex(itemIndex)}
              >
                <span />
              </button>
            ))}
          </div>
        </div>

        <div className="builder__control">
          <span className="builder__label">{t.info.builder.theme}</span>
          <div className="segmented segmented--sm" role="group" aria-label={t.info.builder.theme}>
            {(['light', 'dark'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                className={`segmented__btn ${mockTheme === mode ? 'is-active' : ''}`}
                aria-pressed={mockTheme === mode}
                onClick={() => setMockTheme(mode)}
              >
                <Icon name={mode === 'light' ? 'sun' : 'moon'} size={15} />
                {mode === 'light' ? t.info.builder.light : t.info.builder.dark}
              </button>
            ))}
          </div>
        </div>

        <p className="builder__note">
          <Icon name="appearance" size={15} />
          {t.info.builder.note}
        </p>
      </div>

      <div className="builder__preview">
        <div className="mock" data-mock={mockTheme} style={style} aria-hidden="true">
          <div className="mock__rail">
            <span className="mock__avatar mock__avatar--brand">
              <img src="/logo.png" alt="" width={30} height={30} />
            </span>
            <span className="mock__rail-dot" />
            <span className="mock__rail-dot" />
            <span className="mock__rail-dot" />
            <span className="mock__rail-spacer" />
            <span className="mock__rail-dot mock__rail-dot--accent" />
          </div>

          <div className="mock__side">
            <div className="mock__search">
              <Icon name="search" size={13} />
              <span>Search</span>
            </div>
            <div className="mock__chat is-active">
              <span className="mock__avatar mock__avatar--brand">
                <img src="/logo.png" alt="" width={26} height={26} />
              </span>
              <span className="mock__chat-body">
                <b>{t.info.builder.chat.name}</b>
                <i>{t.info.builder.chat.message}</i>
              </span>
              <span className="mock__badge">2</span>
            </div>
            <div className="mock__chat">
              <span className="mock__avatar mock__avatar--a">A</span>
              <span className="mock__chat-body">
                <b>Anna</b>
                <i>theme.json, please</i>
              </span>
              <span className="mock__time">21:38</span>
            </div>
            <div className="mock__chat">
              <span className="mock__avatar mock__avatar--b">D</span>
              <span className="mock__chat-body">
                <b>Design</b>
                <i>Layout sent</i>
              </span>
              <span className="mock__time">21:12</span>
            </div>
          </div>

          <div className="mock__main">
            <div className="mock__head">
              <span className="mock__avatar mock__avatar--brand">
                <img src="/logo.png" alt="" width={24} height={24} />
              </span>
              <span className="mock__head-body">
                <b>{t.info.builder.chat.name}</b>
                <i>online</i>
              </span>
              <Icon name="search" size={15} />
            </div>

            <div className="mock__messages">
              <div className="mock__day">Today</div>
              <div className="mock__bubble mock__bubble--in">{t.info.builder.chat.message}</div>
              <div className="mock__bubble mock__bubble--out">{t.info.builder.chat.me}</div>
              <div className="mock__bubble mock__bubble--in mock__bubble--short">Looks good</div>
            </div>

            <div className="mock__input">
              <span>{t.info.builder.chat.placeholder}</span>
              <span className="mock__send">
                <Icon name="arrow" size={14} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Tilt>
  );
}
