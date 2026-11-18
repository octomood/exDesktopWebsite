import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { Tilt } from './Tilt';
import { useI18n } from '../i18n';
import { assetUrl, installCommand, release } from '../data/release';
import { copyText } from '../lib/clipboard';
import type { OsKey } from '../i18n/types';

function detectOs(): OsKey {
  if (typeof navigator === 'undefined') return 'windows';
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('win')) return 'windows';
  if (ua.includes('mac')) return 'macos';
  return 'linux';
}

const osIcons: Record<OsKey, 'windows' | 'linux' | 'macos'> = {
  windows: 'windows',
  linux: 'linux',
  macos: 'macos',
};

export function Install() {
  const { t } = useI18n();
  const [os, setOs] = useState<OsKey>(detectOs);
  const [copied, setCopied] = useState(false);
  const [thumb, setThumb] = useState({ left: 0, width: 0 });
  const [stageH, setStageH] = useState<number | 'auto'>('auto');
  const stageRef = useRef<HTMLDivElement>(null);
  const segRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* keep the sliding pill under the active OS, including on resize and language change */
  useLayoutEffect(() => {
    const measure = () => {
      const index = (Object.keys(osIcons) as OsKey[]).indexOf(os);
      const button = btnRefs.current[index];
      const container = segRef.current;
      if (!button || !container) return;
      const c = container.getBoundingClientRect();
      const b = button.getBoundingClientRect();
      setThumb({ left: b.left - c.left, width: b.width });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [os, t]);

  /* morph the card height between OS variants instead of jumping */
  const changeOs = (key: OsKey) => {
    if (key === os) return;
    const card = stageRef.current?.firstElementChild as HTMLElement | null;
    if (card) setStageH(card.getBoundingClientRect().height);
    setOs(key);
  };

  useLayoutEffect(() => {
    if (stageH === 'auto') return;
    const card = stageRef.current?.firstElementChild as HTMLElement | null;
    if (!card) return;
    const frame = requestAnimationFrame(() => setStageH(card.getBoundingClientRect().height));
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [os]);

  useEffect(() => {
    if (stageH === 'auto') return;
    const timer = window.setTimeout(() => setStageH('auto'), 540);
    return () => window.clearTimeout(timer);
  }, [stageH]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    setCopied(await copyText(installCommand));
  };

  const detail = useMemo(() => {
    const assets = release.assets;
    if (os === 'windows') {
      return {
        primary: { label: assets.winSetup, href: assetUrl(assets.winSetup) },
        secondary: { label: assets.winPortable, href: assetUrl(assets.winPortable) },
        altLabel: t.install.os.windows.alternative,
        command: null as string | null,
      };
    }
    if (os === 'macos') {
      return {
        primary: { label: assets.macArmDmg, href: assetUrl(assets.macArmDmg) },
        secondary: { label: assets.macIntelDmg, href: assetUrl(assets.macIntelDmg) },
        altLabel: t.install.os.macos.alternative,
        command: installCommand,
      };
    }
    return {
      primary: { label: assets.linux, href: assetUrl(assets.linux) },
      secondary: { label: installCommand, href: `${release.repo}#linux` },
      altLabel: t.install.os.linux.alternative,
      command: installCommand,
    };
  }, [os, t]);

  return (
    <section className="section install" id="install">
      <span className="section-no" aria-hidden="true">04</span>
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">{t.install.eyebrow}</p>
            <h2 className="h2">{t.install.title}</h2>
          </div>
          <p className="lead">{t.install.lead}</p>
        </Reveal>

        <Reveal variant="soft" className="install-picker">
          <span className="install-picker__label">{t.install.pick}</span>
          <div className="segmented segmented--os" role="group" aria-label={t.install.pick} ref={segRef}>
            <span
              className="segmented__thumb"
              aria-hidden="true"
              style={{ transform: `translateX(${thumb.left}px)`, width: thumb.width }}
            />
            {(Object.keys(osIcons) as OsKey[]).map((key, index) => (
              <button
                key={key}
                ref={(node) => {
                  btnRefs.current[index] = node;
                }}
                type="button"
                className={`segmented__btn ${os === key ? 'is-active' : ''}`}
                aria-pressed={os === key}
                onClick={() => changeOs(key)}
              >
                <Icon name={osIcons[key]} size={17} />
                {t.install.os[key].name}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal variant="window" className="install-cell">
          <Tilt className="install-tilt">
          <div
            className={`install-stage ${stageH === 'auto' ? '' : 'is-morphing'}`}
            ref={stageRef}
            style={stageH === 'auto' ? undefined : { height: stageH }}
          >
          <div className="install-card material" key={os}>
          <div className="install-card__main">
            <div className="install-card__head">
              <span className="install-card__icon">
                <Icon name={osIcons[os]} size={24} />
              </span>
              <div>
                <h3 className="install-card__os">{t.install.os[os].name}</h3>
                <span className="mono muted">
                  {release.tag} · 17.11.2026
                </span>
              </div>
              <span className="chip chip--live install-card__status">
                <span className="dot" />
                latest
              </span>
            </div>

            <p className="install-card__note">{t.install.os[os].note}</p>

            <div className="install-card__actions">
              <a className="btn btn--primary install-dl" href={detail.primary.href} download>
                <Icon name="download" size={18} />
                <span className="install-dl__text">
                  <span>{t.install.recommended}</span>
                  <span className="install-dl__file mono">{detail.primary.label}</span>
                </span>
              </a>
              {os === 'linux' ? (
                <a className="btn btn--outline" href={detail.secondary.href}>
                  <Icon name="terminal" size={17} />
                  {detail.altLabel}
                </a>
              ) : (
                <a className="btn btn--outline install-alt" href={detail.secondary.href} download>
                  <Icon name="download" size={17} />
                  <span>
                    {detail.altLabel}
                    <span className="install-alt__file mono">{detail.secondary.label}</span>
                  </span>
                </a>
              )}
            </div>

            {detail.command ? (
              <div className="cmd">
                <div className="cmd__head">
                  <span className="mono cmd__label">
                    <Icon name="terminal" size={14} />
                    {t.install.command}
                  </span>
                  <button type="button" className="cmd__copy" onClick={copy} aria-live="polite">
                    <Icon name={copied ? 'check' : 'copy'} size={15} />
                    {copied ? t.ui.copied : t.ui.copy}
                  </button>
                </div>
                <pre className="mono cmd__code">
                  <code>{installCommand}</code>
                </pre>
              </div>
            ) : null}
          </div>

          <aside className="install-card__side">
            <h3 className="install-card__side-title">{t.install.requirementsTitle}</h3>
            <ul className="install-list">
              {t.install.requirements.map((item) => (
                <li key={item}>
                  <Icon name="check" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a className="text-link" href={release.releases} target="_blank" rel="noreferrer">
              {t.install.allReleases}
              <Icon name="arrowUpRight" size={15} />
            </a>
          </aside>
          </div>
          </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}
