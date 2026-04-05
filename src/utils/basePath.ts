const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function assetPath(path: string): string {
  // Remove leading ./ if present
  const clean = path.startsWith('./') ? path.slice(1) : path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${clean}`;
}
