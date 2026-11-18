import { Link } from 'react-router-dom';
import { Icon } from './Icon';
import { useI18n } from '../i18n';
import { release } from '../data/release';
import { asset } from '../lib/asset';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="brand brand--footer" aria-label="exDesktop">
              <img src={asset('logo.png')} alt="" width={38} height={38} className="brand__mark" />
              <span className="brand__word">exDesktop</span>
            </Link>
            <p className="footer-tagline">{t.footer.tagline}</p>
            <div className="footer-actions">
              <Link to="/#install" className="btn btn--primary btn--sm">
                <Icon name="download" size={16} />
                {t.ui.download}
              </Link>
              <Link to="/docs" className="btn btn--outline btn--sm">
                {t.ui.docs}
              </Link>
            </div>
          </div>

          <div className="footer-cols">
            {t.footer.columns.map((column) => (
              <nav key={column.title} className="footer-col" aria-label={column.title}>
                <h2 className="footer-col__title">{column.title}</h2>
                <ul>
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <Link to={item.href} className="footer-link">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t.footer.legal}</p>
          <p className="footer-bottom__meta">
            {t.footer.credits} · {t.footer.built}
          </p>
          <a className="footer-version mono" href={release.releases} target="_blank" rel="noreferrer">
            {release.tag}
          </a>
        </div>
      </div>
    </footer>
  );
}
