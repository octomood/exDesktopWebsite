import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Preview } from '../components/Preview';
import { Showcase } from '../components/Showcase';
import { Info } from '../components/Info';
import { Install } from '../components/Install';
import { Roadmap } from '../components/Roadmap';
import { Links } from '../components/Links';
import { Footer } from '../components/Footer';
import { useI18n } from '../i18n';

export function Home() {
  const { t } = useI18n();

  useEffect(() => {
    document.title = t.meta.title;
  }, [t]);

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Preview />
        <Showcase />
        <Info />
        <Install />
        <Roadmap />
        <Links />
      </main>
      <Footer />
    </>
  );
}
