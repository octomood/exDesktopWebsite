import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { Tilt } from './Tilt';
import { useI18n } from '../i18n';

export function Links() {
  const { t } = useI18n();

  return (
    <section className="section links" id="links">
      <span className="section-no" aria-hidden="true">06</span>
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">{t.links.eyebrow}</p>
            <h2 className="h2">{t.links.title}</h2>
          </div>
          <p className="lead">{t.links.lead}</p>
        </Reveal>

        <ul className="links-grid">
          {t.links.items.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 55} variant="soft" className="link-cell">
              <Tilt className="card-tilt">
              <a className="link-card material" href={item.href} target="_blank" rel="noreferrer">
                <span className="link-card__top">
                  <span className="link-card__icon">
                    <Icon name={item.icon} size={22} />
                  </span>
                  <span className="link-card__arrow">
                    <Icon name="arrowUpRight" size={17} />
                  </span>
                </span>
                <span className="link-card__title">{item.title}</span>
                <span className="link-card__handle mono">{item.handle}</span>
                <span className="link-card__text">{item.text}</span>
              </a>
              </Tilt>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
