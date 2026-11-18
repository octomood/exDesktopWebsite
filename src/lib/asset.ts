/**
 * Resolve a file from `public/` against the deployment base.
 * Keeps the site working both at the domain root and under a subpath
 * (e.g. GitHub Pages project sites).
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
