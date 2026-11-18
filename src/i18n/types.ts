export type Lang = 'ru' | 'en';

export type IconName =
  | 'appearance'
  | 'messages'
  | 'media'
  | 'privacy'
  | 'network'
  | 'plugins'
  | 'shield'
  | 'layers'
  | 'spark'
  | 'download'
  | 'windows'
  | 'linux'
  | 'macos'
  | 'arrow'
  | 'arrowUpRight'
  | 'chevronRight'
  | 'search'
  | 'copy'
  | 'check'
  | 'sun'
  | 'moon'
  | 'github'
  | 'telegram'
  | 'menu'
  | 'close'
  | 'docs'
  | 'external'
  | 'terminal'
  | 'globe'
  | 'clock';

export type OsKey = 'windows' | 'linux' | 'macos';

export type PreviewTab = {
  id: string;
  label: string;
  title: string;
  text: string;
  image: string;
  alt: string;
};

export type FeatureCard = {
  icon: IconName;
  title: string;
  text: string;
};

export type RoadmapStatus = 'done' | 'work' | 'next' | 'idea';

export type RoadmapItem = {
  status: RoadmapStatus;
  title: string;
  text: string;
};

export type LinkItem = {
  icon: IconName;
  title: string;
  handle: string;
  text: string;
  href: string;
};

export type OsCopy = {
  name: string;
  note: string;
  alternative: string;
  command?: string;
};

export type Dict = {
  htmlLang: string;
  meta: { title: string; description: string };
  nav: {
    features: string;
    preview: string;
    install: string;
    roadmap: string;
    links: string;
    docs: string;
  };
  ui: {
    download: string;
    docs: string;
    menu: string;
    close: string;
    skip: string;
    theme: string;
    toLight: string;
    toDark: string;
    language: string;
    github: string;
    copy: string;
    copied: string;
    scrollHint: string;
    new: string;
  };
  hero: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    lead: string;
    primary: string;
    secondary: string;
    facts: { label: string; value: string }[];
  };
  preview: {
    eyebrow: string;
    title: string;
    lead: string;
    hint: string;
    tabs: PreviewTab[];
  };
  showcase: {
    eyebrow: string;
    title: string;
    lead: string;
    windowTitle: string;
    alt: string;
    points: { label: string; text: string }[];
  };
  info: {
    eyebrow: string;
    title: string;
    lead: string;
    cards: FeatureCard[];
    builder: {
      eyebrow: string;
      title: string;
      text: string;
      accent: string;
      theme: string;
      light: string;
      dark: string;
      note: string;
      swatchNames: string[];
      chat: { name: string; message: string; time: string; me: string; placeholder: string };
    };
  };
  install: {
    eyebrow: string;
    title: string;
    lead: string;
    pick: string;
    recommended: string;
    alternative: string;
    command: string;
    allReleases: string;
    requirementsTitle: string;
    requirements: string[];
    os: Record<OsKey, OsCopy>;
  };
  roadmap: {
    eyebrow: string;
    title: string;
    lead: string;
    statuses: Record<RoadmapStatus, string>;
    items: RoadmapItem[];
    note: string;
  };
  links: {
    eyebrow: string;
    title: string;
    lead: string;
    items: LinkItem[];
  };
  footer: {
    tagline: string;
    columns: { title: string; items: { label: string; href: string }[] }[];
    legal: string;
    credits: string;
    built: string;
  };
  docs: {
    label: string;
    title: string;
    lead: string;
    search: string;
    searchEmpty: string;
    onThisPage: string;
    prev: string;
    next: string;
    contents: string;
    updated: string;
    readTime: string;
    minute: string;
    backHome: string;
    groups: Record<string, string>;
    notFoundTitle: string;
    notFoundText: string;
    note: string;
    warn: string;
    tip: string;
    home: string;
    openMenu: string;
    closeMenu: string;
    results: string;
  };
};
