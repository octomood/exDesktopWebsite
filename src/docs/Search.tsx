import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { useI18n } from '../i18n';
import type { Doc } from './content';

type Entry = { doc: Doc; text: string };

export function Search({ entries }: { entries: Entry[] }) {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle.length < 2) return [];
    return entries
      .filter((entry) => entry.text.toLowerCase().includes(needle))
      .slice(0, 6);
  }, [entries, query]);

  const show = focused && query.trim().length >= 2;

  return (
    <div className="docs-search">
      <div className={`docs-search__field ${focused ? 'is-focused' : ''}`}>
        <Icon name="search" size={16} />
        <input
          ref={inputRef}
          type="search"
          value={query}
          placeholder={t.docs.search}
          aria-label={t.docs.search}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 140)}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setQuery('');
              event.currentTarget.blur();
            }
            if (event.key === 'Enter' && results[0]) {
              navigate(`/docs/${results[0].doc.slug}`);
              setQuery('');
              event.currentTarget.blur();
            }
          }}
        />
        <kbd className="docs-search__kbd mono" aria-hidden="true">
          ⌘K
        </kbd>
      </div>

      {show ? (
        <div className="docs-search__pop" role="listbox" aria-label={t.docs.results}>
          {results.length ? (
            results.map((result) => (
              <button
                key={result.doc.slug}
                type="button"
                role="option"
                aria-selected="false"
                className="docs-search__item"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  navigate(`/docs/${result.doc.slug}`);
                  setQuery('');
                }}
              >
                <span className="docs-search__item-title">{result.doc.title}</span>
                <span className="docs-search__item-group">{t.docs.groups[result.doc.group]}</span>
              </button>
            ))
          ) : (
            <p className="docs-search__empty">{t.docs.searchEmpty}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
