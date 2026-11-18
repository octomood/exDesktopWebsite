import { Icon } from '../components/Icon';
import { useI18n } from '../i18n';
import { CodeBlock } from './CodeBlock';
import type { Block } from './content';

export type Heading = { id: string; text: string; level: 2 | 3 };

export function headingsOf(blocks: Block[]): Heading[] {
  const headings: Heading[] = [];
  blocks.forEach((block, index) => {
    if (block.t === 'h2') headings.push({ id: `s-${index}`, text: block.text, level: 2 });
    if (block.t === 'h3') headings.push({ id: `s-${index}`, text: block.text, level: 3 });
  });
  return headings;
}

export function plainText(blocks: Block[]): string {
  return blocks
    .map((block) => {
      switch (block.t) {
        case 'p':
        case 'h2':
        case 'h3':
          return block.text;
        case 'ul':
        case 'ol':
          return block.items.join(' ');
        case 'note':
          return block.text;
        case 'code':
          return block.code;
        case 'table':
          return [...block.head, ...block.rows.flat()].join(' ');
        default:
          return '';
      }
    })
    .join(' ');
}

export function wordCount(blocks: Block[]): number {
  return plainText(blocks).trim().split(/\s+/).filter(Boolean).length;
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  const { t } = useI18n();

  return (
    <>
      {blocks.map((block, index) => {
        const id = `s-${index}`;
        switch (block.t) {
          case 'h2':
            return (
              <h2 key={id} id={id}>
                {block.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={id} id={id}>
                {block.text}
              </h3>
            );
          case 'p':
            return <p key={id}>{block.text}</p>;
          case 'ul':
            return (
              <ul key={id} className="doc-list">
                {block.items.map((item, i) => (
                  <li key={i}>
                    <span className="doc-list__mark" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={id} className="doc-steps">
                {block.items.map((item, i) => (
                  <li key={i}>
                    <span className="doc-steps__num mono">{String(i + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );
          case 'code':
            return <CodeBlock key={id} code={block.code} lang={block.lang} />;
          case 'note': {
            const icon = block.kind === 'warn' ? 'shield' : block.kind === 'tip' ? 'spark' : 'docs';
            return (
              <aside key={id} className={`callout callout--${block.kind}`}>
                <span className="callout__icon">
                  <Icon name={icon} size={17} />
                </span>
                <div>
                  <p className="callout__title">{block.kind === 'info' ? t.docs.note : t.docs[block.kind]}</p>
                  <p className="callout__text">{block.text}</p>
                </div>
              </aside>
            );
          }
          case 'table':
            return (
              <div key={id} className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      {block.head.map((cell) => (
                        <th key={cell}>{cell}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
