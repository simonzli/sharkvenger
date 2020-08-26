import { getBasename } from 'utils/getBasename';

export function getResource(path: string) {
  const basename = getBasename();
  const pathname = path.startsWith('/') ? path : `/${path}`;
  return `${basename}${pathname}`;
}
