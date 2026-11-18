import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { ThemeBuilder } from './ThemeBuilder';
import { useI18n } from '../i18n';

export function Info() {
  const { t } = useI18n();

  return (
    <section className="section info" id="features">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">{t.info.eyebrow}</p>
            <h2 className="h2">{t.info.title}</h2>
          </div>
          <p className="lead">{t.info.lead}</p>
        </Reveal>

        <ul className="feature-grid">
          {t.info.cards.map((card, index) => (
            <Reveal as="li" key={card.title} delay={index * 60} className="feature material">
              <span className="feature__icon">
                <Icon name={card.icon} size={26} />
              </span>
              <h3 className="feature__title">{card.title}</h3>
              <p className="feature__text">{card.text}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={60} variant="window" className="info__builder">
          <ThemeBuilder />
        </Reveal>
      </div>
    </section>
  );
}
