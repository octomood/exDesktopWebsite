import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Icon } from '../components/Icon';
import { useI18n } from '../i18n';
import { release } from '../data/release';
import { docsByLang } from './content';
import { Blocks, headingsOf, plainText, wordCount } from './Blocks';
import { Search } from './Search';
import { Toc } from './Toc';

const groupOrder = ['start', 'usage', 'dev'] as const;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia('(min-width: 1001px)').matches,
  );

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1001px)');
    const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
}

export function Docs() {
  const { slug } = useParams();
  const { t, lang } = useI18n();
  const articles = docsByLang[lang];
  const isDesktop = useIsDesktop();
  const [menuOpen, setMenuOpen] = useState(false);

  const index = slug ? articles.findIndex((article) => article.slug === slug) : 0;
  const article = index >= 0 ? articles[index] : null;

  const entries = useMemo(
    () => articles.map((doc) => ({ doc, text: `${doc.title} ${doc.description} ${plainText(doc.blocks)}` })),
    [articles],
  );

  useEffect(() => {
    setMenuOpen(false);
  }, [slug]);

  useEffect(() => {
    document.title = article ? `${article.title} — exDesktop` : t.docs.notFoundTitle;
  }, [article, t]);

  useEffect(() => {
    if (menuOpen && !isDesktop) document.body.dataset.locked = 'true';
    else document.body.dataset.locked = 'false';
    return () => {
      document.body.dataset.locked = 'false';
    };
  }, [menuOpen, isDesktop]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const headings = article ? headingsOf(article.blocks) : [];
  const minutes = article ? Math.max(1, Math.round(wordCount(article.blocks) / 180)) : 1;
  const prev = index > 0 ? articles[index - 1] : null;
  const next = index >= 0 && index < articles.length - 1 ? articles[index + 1] : null;

  return (
    <>
      <Header />
      <div className="docs">
        <div className="wrap docs-openbar">
          <button
            type="button"
            className="docs-openbar__btn"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="docs-side"
          >
            <Icon name="menu" size={18} />
            {t.docs.contents}
          </button>
          <span className="docs-openbar__title">{article?.title ?? t.docs.label}</span>
        </div>

        <div className="wrap docs-shell">
          {menuOpen ? <button className="docs-scrim" type="button" aria-label={t.ui.close} onClick={() => setMenuOpen(false)} /> : null}

          <aside
            className={`docs-side ${menuOpen ? 'is-open' : ''}`}
            id="docs-side"
            aria-label={t.docs.label}
            inert={!isDesktop && !menuOpen}
          >
            <div className="docs-side__head">
              <Link to="/docs" className="docs-side__home">
                <span className="eyebrow">{t.docs.label}</span>
              </Link>
              <button type="button" className="icon-btn docs-side__close" onClick={() => setMenuOpen(false)} aria-label={t.docs.closeMenu}>
                <Icon name="close" size={20} />
              </button>
            </div>

            <Search entries={entries} />

            <nav className="docs-nav" aria-label={t.docs.label}>
              {groupOrder.map((group) => {
                const items = articles.filter((item) => item.group === group);
                if (!items.length) return null;
                return (
                  <div key={group} className="docs-nav__group">
                    <p className="docs-nav__title">{t.docs.groups[group]}</p>
                    <ul>
                      {items.map((item) => (
                        <li key={item.slug}>
                          <Link
                            to={`/docs/${item.slug}`}
                            className={`docs-nav__link ${article?.slug === item.slug ? 'is-active' : ''}`}
                            aria-current={article?.slug === item.slug ? 'page' : undefined}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </nav>

            <div className="docs-side__foot">
              <a href={release.repo} target="_blank" rel="noreferrer">
                <Icon name="github" size={16} />
                GitHub
              </a>
              <a href={release.channel} target="_blank" rel="noreferrer">
                <Icon name="telegram" size={16} />
                Telegram
              </a>
            </div>
          </aside>

          <div className="docs-body">
            <main className="docs-main" id="main">
              {article ? (
                <article className="doc">
                  <nav className="doc__crumbs" aria-label="breadcrumbs">
                    <Link to="/">exDesktop</Link>
                    <span aria-hidden="true">/</span>
                    <Link to="/docs">{t.docs.label}</Link>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">{article.title}</span>
                  </nav>

                  <h1 className="doc__title">{article.title}</h1>
                  <p className="doc__lead">{article.description}</p>

                  <div className="doc__meta">
                    <span>
                      <Icon name="clock" size={14} />
                      {minutes} {t.docs.readTime}
                    </span>
                    <span>{t.docs.updated}</span>
                  </div>

                  <div className="doc__content">
                    <Blocks blocks={article.blocks} />
                  </div>

                  <nav className="doc__pager" aria-label={t.docs.label}>
                    {prev ? (
                      <Link to={`/docs/${prev.slug}`} className="pager-card pager-card--prev">
                        <span className="pager-card__label">
                          <Icon name="chevronRight" size={14} className="flip-x" />
                          {t.docs.prev}
                        </span>
                        <span className="pager-card__title">{prev.title}</span>
                      </Link>
                    ) : (
                      <span />
                    )}
                    {next ? (
                      <Link to={`/docs/${next.slug}`} className="pager-card pager-card--next">
                        <span className="pager-card__label">
                          {t.docs.next}
                          <Icon name="chevronRight" size={14} />
                        </span>
                        <span className="pager-card__title">{next.title}</span>
                      </Link>
                    ) : null}
                  </nav>
                </article>
              ) : (
                <div className="doc doc--missing">
                  <span className="doc__code mono">404</span>
                  <h1 className="doc__title">{t.docs.notFoundTitle}</h1>
                  <p className="doc__lead">{t.docs.notFoundText}</p>
                  <div className="doc__missing-actions">
                    <Link to="/docs" className="btn btn--primary">
                      {t.docs.home}
                    </Link>
                    <Link to="/" className="btn btn--outline">
                      {t.docs.backHome}
                    </Link>
                  </div>
                </div>
              )}
            </main>

            <Toc headings={headings} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
