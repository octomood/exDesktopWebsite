import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useI18n } from '../i18n';

export function NotFound() {
  const { t } = useI18n();

  return (
    <>
      <Header />
      <main id="main" className="section">
        <div className="wrap" style={{ minHeight: '52vh' }}>
          <span className="mono muted">404</span>
          <h1 className="h2" style={{ marginTop: 12 }}>
            {t.docs.notFoundTitle}
          </h1>
          <p className="lead" style={{ marginTop: 14, maxWidth: '52ch' }}>
            {t.docs.notFoundText}
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 26, flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn--primary">
              {t.docs.backHome}
            </Link>
            <Link to="/docs" className="btn btn--outline">
              {t.docs.home}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
