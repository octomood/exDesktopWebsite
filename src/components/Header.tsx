import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from './Icon';
import { useI18n } from '../i18n';
import { useTheme } from '../theme/ThemeProvider';
import { release } from '../data/release';
import { asset } from '../lib/asset';

const sectionLinks = [
  { id: 'features', key: 'features' },
  { id: 'preview', key: 'preview' },
  { id: 'install', key: 'install' },
  { id: 'roadmap', key: 'roadmap' },
  { id: 'links', key: 'links' },
] as const;

export function LangSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div className={`lang-switch ${compact ? 'lang-switch--compact' : ''}`} role="group" aria-label={t.ui.language}>
      {(['ru', 'en'] as const).map((code) => (
        <button
          key={code}
          type="button"
          className={`lang-switch__btn ${lang === code ? 'is-active' : ''}`}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function ThemeButton() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  return (
    <button
      type="button"
      className="icon-btn theme-toggle"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      aria-label={theme === 'dark' ? t.ui.toLight : t.ui.toDark}
      title={theme === 'dark' ? t.ui.toLight : t.ui.toDark}
    >
      <span className={`theme-toggle__icon ${theme === 'dark' ? 'is-dark' : ''}`}>
        <Icon name="sun" size={19} />
        <Icon name="moon" size={19} />
      </span>
    </button>
  );
}

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) {
      document.body.dataset.locked = 'false';
      return;
    }
    document.body.dataset.locked = 'true';
    const timer = window.setTimeout(() => closeRef.current?.focus(), 40);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const root = document.getElementById('mobile-menu');
      if (!root) return;
      const focusable = root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKey);
      document.body.dataset.locked = 'false';
    };
  }, [open]);

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="wrap header-inner">
          <Link to="/" className="brand" aria-label="exDesktop">
            <img src={asset('logo.png')} alt="" width={34} height={34} className="brand__mark" />
            <span className="brand__word">exDesktop</span>
          </Link>

          <nav className="header-nav" aria-label={t.ui.menu}>
            {sectionLinks.slice(0, 4).map((item) => (
              <Link key={item.id} to={`/#${item.id}`} className="header-nav__link">
                {t.nav[item.key]}
              </Link>
            ))}
            <Link
              to="/docs"
              className={`header-nav__link ${location.pathname.startsWith('/docs') ? 'is-active' : ''}`}
            >
              {t.nav.docs}
            </Link>
          </nav>

          <div className="header-tools">
            <LangSwitch />
            <ThemeButton />
            <a
              className="icon-btn header-gh"
              href={release.repo}
              target="_blank"
              rel="noreferrer"
              aria-label={t.ui.github}
              title="GitHub"
            >
              <Icon name="github" size={19} />
            </a>
            <Link to="/#install" className="btn btn--primary btn--sm header-cta">
              <Icon name="download" size={17} />
              {t.ui.download}
            </Link>
            <button
              ref={burgerRef}
              type="button"
              className="icon-btn burger"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.ui.close : t.ui.menu}
              onClick={() => setOpen((value) => !value)}
            >
              <Icon name={open ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={t.ui.menu}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="wrap mobile-menu__inner">
          <div className="mobile-menu__top">
            <span className="eyebrow">{t.ui.menu}</span>
            <button ref={closeRef} type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label={t.ui.close}>
              <Icon name="close" size={22} />
            </button>
          </div>

          <nav className="mobile-menu__nav" aria-label={t.ui.menu}>
            {sectionLinks.map((item, index) => (
              <Link
                key={item.id}
                to={`/#${item.id}`}
                className="mobile-menu__link"
                style={{ transitionDelay: open ? `${80 + index * 45}ms` : '0ms' }}
              >
                <span className="mobile-menu__index mono">{String(index + 1).padStart(2, '0')}</span>
                <span>{t.nav[item.key]}</span>
                <Icon name="arrowUpRight" size={20} />
              </Link>
            ))}
            <Link
              to="/docs"
              className="mobile-menu__link"
              style={{ transitionDelay: open ? `${80 + sectionLinks.length * 45}ms` : '0ms' }}
            >
              <span className="mobile-menu__index mono">{String(sectionLinks.length + 1).padStart(2, '0')}</span>
              <span>{t.nav.docs}</span>
              <Icon name="arrowUpRight" size={20} />
            </Link>
          </nav>

          <div className="mobile-menu__foot">
            <Link to="/#install" className="btn btn--primary btn--block">
              <Icon name="download" size={18} />
              {t.ui.download}
            </Link>
            <div className="mobile-menu__row">
              <LangSwitch />
              <ThemeButton />
              <a className="icon-btn" href={release.channel} target="_blank" rel="noreferrer" aria-label="Telegram">
                <Icon name="telegram" size={20} />
              </a>
              <a className="icon-btn" href={release.repo} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Icon name="github" size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
