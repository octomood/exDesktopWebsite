import { useEffect, useMemo, useState } from 'react';
import { Icon } from './Icon';
import { useI18n } from '../i18n';
import { assetUrl, installCommand, release } from '../data/release';
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

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
    } catch {
      setCopied(false);
    }
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
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">{t.install.eyebrow}</p>
            <h2 className="h2">{t.install.title}</h2>
          </div>
          <p className="lead">{t.install.lead}</p>
        </div>

        <div className="install-picker">
          <span className="install-picker__label">{t.install.pick}</span>
          <div className="segmented" role="group" aria-label={t.install.pick}>
            {(Object.keys(osIcons) as OsKey[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`segmented__btn ${os === key ? 'is-active' : ''}`}
                aria-pressed={os === key}
                onClick={() => setOs(key)}
              >
                <Icon name={osIcons[key]} size={17} />
                {t.install.os[key].name}
              </button>
            ))}
          </div>
        </div>

        <div className="install-card">
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
    </section>
  );
}
