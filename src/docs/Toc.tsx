import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../i18n';
import type { Heading } from './Blocks';

export function Toc({ headings }: { headings: Heading[] }) {
  const { t } = useI18n();
  const [active, setActive] = useState(headings[0]?.id ?? '');
  const key = useMemo(() => headings.map((heading) => heading.id).join('|'), [headings]);

  useEffect(() => {
    if (!headings.length) return;
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const offset = 132;
        let current = headings[0].id;
        for (const heading of headings) {
          const element = document.getElementById(heading.id);
          if (element && element.getBoundingClientRect().top <= offset) current = heading.id;
        }
        setActive(current);
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (headings.length < 2) return null;

  return (
    <nav className="docs-toc" aria-label={t.docs.onThisPage}>
      <p className="docs-toc__title">{t.docs.onThisPage}</p>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? 'is-sub' : ''}>
            <a href={`#${heading.id}`} className={active === heading.id ? 'is-active' : ''}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
