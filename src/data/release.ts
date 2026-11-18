export const release = {
  version: '7.4.3.2',
  tag: 'v7.4.3.2',
  date: '2026-11-17',
  repo: 'https://github.com/metawka/exDesktop',
  releases: 'https://github.com/metawka/exDesktop/releases',
  latest: 'https://github.com/metawka/exDesktop/releases/latest',
  license: 'https://github.com/metawka/exDesktop/blob/main/LICENSE',
  issues: 'https://github.com/metawka/exDesktop/issues',
  channel: 'https://t.me/exDesktop',
  chat: 'https://t.me/exDesktopChat',
  assets: {
    winSetup: `exDesktop-setup-x64.${'7.4.3.2'}.exe`,
    winPortable: `exDesktop-portable-x64.${'7.4.3.2'}.zip`,
    linux: `exDesktop-linux-x64.${'7.4.3.2'}.tar.gz`,
    macArmDmg: `exDesktop-macos-arm64.${'7.4.3.2'}.dmg`,
    macArmZip: `exDesktop-macos-arm64.${'7.4.3.2'}.zip`,
    macIntelDmg: `exDesktop-macos-x64.${'7.4.3.2'}.dmg`,
    macIntelZip: `exDesktop-macos-x64.${'7.4.3.2'}.zip`,
  },
} as const;

export function assetUrl(file: string) {
  return `${release.repo}/releases/download/${release.tag}/${file}`;
}

export const installCommand = 'curl -fsSL https://raw.githubusercontent.com/metawka/exDesktop/main/install.sh | sh';
