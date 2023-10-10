import { useEffect, useState } from 'react';

const BREAKPOINT_SMALL = '(max-width: 767px)';
const BREAKPOINT_MEDIUM = '(min-width: 768px)';
const BREAKPOINT_LARGE = '(min-width: 1024px)';

const useMedia = (query: string) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);

    media.matches !== matches && setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query, matches]);

  return matches;
};

export const useMobile = () => {
  return useMedia(BREAKPOINT_SMALL);
};

export const useTablet = () => {
  return useMedia(BREAKPOINT_MEDIUM);
};

export const useDesktop = () => {
  return useMedia(BREAKPOINT_LARGE);
};
