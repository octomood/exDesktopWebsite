import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { useI18n } from '../i18n';

export function Roadmap() {
  const { t } = useI18n();

  return (
    <section className="section roadmap" id="roadmap">
      <span className="section-no" aria-hidden="true">05</span>
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">{t.roadmap.eyebrow}</p>
            <h2 className="h2">{t.roadmap.title}</h2>
          </div>
          <p className="lead">{t.roadmap.lead}</p>
        </Reveal>

        <ol className="roadmap-list">
          {t.roadmap.items.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 45} className={`rm rm--${item.status}`}>
              <span className="rm__rail" aria-hidden="true">
                <span className="rm__dot" />
              </span>
              <div className="rm__body">
                <div className="rm__head">
                  <h3 className="rm__title">{item.title}</h3>
                  <span className={`chip rm__status rm__status--${item.status}`}>
                    {item.status === 'work' ? <span className="dot dot--pulse" /> : null}
                    {t.roadmap.statuses[item.status]}
                  </span>
                </div>
                <p className="rm__text">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <p className="roadmap-note">
          <Icon name="clock" size={15} />
          {t.roadmap.note}
        </p>
      </div>
    </section>
  );
}
