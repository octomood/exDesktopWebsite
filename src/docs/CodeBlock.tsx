import { useEffect, useState } from 'react';
import { Icon } from '../components/Icon';
import { tokenize } from './highlight';
import type { CodeLang } from './content';
import { useI18n } from '../i18n';
import { copyText } from '../lib/clipboard';

const langLabel: Record<CodeLang, string> = {
  bash: 'shell',
  json: 'json',
  ini: 'ini',
  text: 'text',
};

export function CodeBlock({ code, lang }: { code: string; lang: CodeLang }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    setCopied(await copyText(code));
  };

  return (
    <div className="code">
      <div className="code__head">
        <span className="mono code__lang">{langLabel[lang]}</span>
        <button type="button" className="code__copy" onClick={copy} aria-live="polite">
          <Icon name={copied ? 'check' : 'copy'} size={14} />
          {copied ? t.ui.copied : t.ui.copy}
        </button>
      </div>
      <pre className="code__pre">
        <code>
          {tokenize(code, lang).map((token, index) =>
            token.kind ? (
              <span key={index} className={`tok tok--${token.kind}`}>
                {token.text}
              </span>
            ) : (
              <span key={index}>{token.text}</span>
            ),
          )}
        </code>
      </pre>
    </div>
  );
}
