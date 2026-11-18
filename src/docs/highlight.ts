import type { CodeLang } from './content';

export type Token = { text: string; kind?: 'com' | 'str' | 'num' | 'kw' | 'flag' | 'var' };

const patterns: Record<Exclude<CodeLang, 'text'>, RegExp> = {
  bash: /(?<com>#[^\n]*)|(?<str>"(?:[^"\\]|\\.)*"|'[^']*')|(?<flag>(?:^|\s)--?[A-Za-z][\w-]*)|(?<kw>\b(?:curl|tar|mkdir|cmake|sudo|cp|cd|git|emerge|python|python3|npm|node|sh|wget|export|echo)\b)|(?<var>\b[A-Z][A-Z0-9_]{2,}\b)|(?<num>\b\d+(?:\.\d+)*\b)/gm,
  json: /(?<str>"(?:[^"\\]|\\.)*"(?=\s*:))|(?<com>#[^\n]*)|(?<str>"(?:[^"\\]|\\.)*")|(?<num>-?\b\d+(?:\.\d+)?\b)|(?<kw>\b(?:true|false|null)\b)/gm,
  ini: /(?<com>^[;#][^\n]*)|(?<kw>^\[[^\]\n]+\])|(?<var>\b[A-Za-z_][\w.-]*(?=\s*=))|(?<str>"[^"\n]*"|'[^'\n]*')|(?<num>\b\d+\b)/gm,
};

export function tokenize(code: string, lang: CodeLang): Token[] {
  if (lang === 'text') return [{ text: code }];
  const pattern = patterns[lang];
  const tokens: Token[] = [];
  let last = 0;

  for (const match of code.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) tokens.push({ text: code.slice(last, index) });
    const groups = match.groups ?? {};
    const kind = Object.keys(groups).find((key) => groups[key] !== undefined) as Token['kind'];
    tokens.push({ text: match[0], kind });
    last = index + match[0].length;
  }

  if (last < code.length) tokens.push({ text: code.slice(last) });
  return tokens;
}
