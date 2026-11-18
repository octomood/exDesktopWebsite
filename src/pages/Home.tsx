import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Preview } from '../components/Preview';
import { Info } from '../components/Info';
import { Install } from '../components/Install';
import { Roadmap } from '../components/Roadmap';
import { Links } from '../components/Links';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Preview />
        <Info />
        <Install />
        <Roadmap />
        <Links />
      </main>
      <Footer />
    </>
  );
}
