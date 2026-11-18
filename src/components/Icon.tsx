import type { ReactNode } from 'react';
import type { IconName } from '../i18n/types';

/*
  One icon family: 24×24, 1.6px stroke, round joins.
  Brand marks (GitHub, Telegram) keep their own filled shapes.
*/
const glyphs: Record<IconName, ReactNode> = {
  appearance: (
    <>
      <path d="M4 7h9M17 7h3M4 12h3M11 12h9M4 17h11M19 17h1" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="17" cy="17" r="2" />
    </>
  ),
  messages: (
    <path d="M20 12.4c0 3.9-3.6 7-8 7-1 0-2-.2-2.9-.5L5 20.5l1.2-3.3A6.7 6.7 0 0 1 4 12.4c0-3.9 3.6-7 8-7s8 3.1 8 7Z" />
  ),
  media: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="4" />
      <path d="m10.4 9.6 4.4 2.6-4.4 2.6V9.6Z" />
    </>
  ),
  privacy: (
    <>
      <path d="M12 3.5 5 6.2v5.3c0 4 2.9 7.4 7 9 4.1-1.6 7-5 7-9V6.2L12 3.5Z" />
      <path d="M12 10.6v3.2" />
      <circle cx="12" cy="9.4" r="1.1" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.7 9.6h16.6M3.7 14.4h16.6" />
      <path d="M12 3.5c2.2 2.4 3.3 5.3 3.3 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.3-5.3-3.3-8.5S9.8 5.9 12 3.5Z" />
    </>
  ),
  plugins: (
    <>
      <path d="M9.5 4.5a1.9 1.9 0 0 1 3.8 0V6h2.2A2.5 2.5 0 0 1 18 8.5v2.2h1.5a1.9 1.9 0 0 1 0 3.8H18v2.2a2.5 2.5 0 0 1-2.5 2.5h-2.2v-1.5a1.9 1.9 0 0 0-3.8 0V20H7.5A2.5 2.5 0 0 1 5 17.5v-2.2h1.5a1.9 1.9 0 0 0 0-3.8H5V8.5A2.5 2.5 0 0 1 7.5 6h2V4.5Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6.2v5.3c0 4 2.9 7.4 7 9 4.1-1.6 7-5 7-9V6.2L12 3.5Z" />
      <path d="m9 11.8 2.2 2.2 4-4.2" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.5 8 4.3-8 4.3-8-4.3 8-4.3Z" />
      <path d="m4.6 12.2 7.4 4 7.4-4M4.6 16.2l7.4 4 7.4-4" />
    </>
  ),
  spark: (
    <path d="M12 3.5c.7 4.2 2 5.5 6.2 6.2-4.2.7-5.5 2-6.2 6.2-.7-4.2-2-5.5-6.2-6.2 4.2-.7 5.5-2 6.2-6.2ZM18.2 15.4c.3 1.9.9 2.5 2.8 2.8-1.9.3-2.5.9-2.8 2.8-.3-1.9-.9-2.5-2.8-2.8 1.9-.3 2.5-.9 2.8-2.8Z" />
  ),
  download: (
    <>
      <path d="M12 4v10.5M8.2 10.8 12 14.6l3.8-3.8" />
      <path d="M4.8 16.5v1.2A2.3 2.3 0 0 0 7.1 20h9.8a2.3 2.3 0 0 0 2.3-2.3v-1.2" />
    </>
  ),
  windows: (
    <>
      <path d="M4.5 6.4 11 5.5v5.9H4.5V6.4ZM12.8 5.2 19.5 4.3v7.1h-6.7V5.2Z" />
      <path d="M4.5 12.6H11v5.9l-6.5-.9v-5ZM12.8 12.6h6.7v7.1l-6.7-.9v-6.2Z" />
    </>
  ),
  linux: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="3.5" />
      <path d="m7.4 9.4 2.6 2.6-2.6 2.6M12.6 15h4" />
    </>
  ),
  macos: (
    <>
      <rect x="3.5" y="5" width="17" height="11.5" rx="2.5" />
      <path d="M9.5 20h5M12 16.5V20" />
    </>
  ),
  arrow: (
    <>
      <path d="M4.5 12h15M13.8 6.3 19.5 12l-5.7 5.7" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </>
  ),
  chevronRight: <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="3" />
      <path d="M15 6.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v6.5A2.5 2.5 0 0 0 6 15h.5" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
    </>
  ),
  moon: <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.5 8.5 0 1 0 10.2 10.2Z" />,
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.8c-2.6.6-3.2-1.1-3.2-1.1-.4-1.1-1-1.4-1-1.4-.9-.6 0-.6 0-.6 1 0 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.1-.2-4.3-1-4.3-4.6 0-1 .4-1.9 1-2.5-.1-.3-.4-1.2.1-2.4 0 0 .8-.3 2.6 1a9 9 0 0 1 4.7 0c1.8-1.3 2.6-1 2.6-1 .5 1.2.2 2.1.1 2.4.6.6 1 1.5 1 2.5 0 3.6-2.2 4.4-4.3 4.6.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z"
    />
  ),
  telegram: (
    <path
      fill="currentColor"
      stroke="none"
      d="M20.9 4.2 18.3 19c-.2 1-.8 1.2-1.6.8l-4.3-3.2-2.1 2c-.2.2-.4.4-.9.4l.3-4.4 8.1-7.3c.4-.3-.1-.5-.5-.2L7.3 12.4l-4.2-1.3c-.9-.3-.9-.9.2-1.3l16.4-6.3c.8-.3 1.5.2 1.2 1.7Z"
    />
  ),
  menu: <path d="M4 8h16M4 16h10" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  docs: (
    <>
      <path d="M6 3.5h7.5L19 9v11.5H6a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" />
      <path d="M13 3.5V9h5.5M8.5 13h7M8.5 16.5h4.5" />
    </>
  ),
  external: (
    <>
      <path d="M13 4.5h6.5V11M19 5l-8 8" />
      <path d="M18 14.5v4a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6h4" />
    </>
  ),
  terminal: (
    <>
      <path d="m5 8 4 4-4 4M12 16h7" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.4 3.3 5.3 3.3 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.3-5.3-3.3-8.5S9.8 5.9 12 3.5Z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {glyphs[name]}
    </svg>
  );
}
