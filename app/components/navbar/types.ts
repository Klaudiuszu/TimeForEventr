export interface NavbarProps {
  messages: Record<string, string>;
  locale: string;
}

export interface NavLinksProps {
  messages: Record<string, string>;
  locale: string;
  nextLocale: string;
  fullPath: string;
  langLabel: string;
  onLinkClick: () => void;
  isBlogPage: boolean;
  setIsBlogLoading: (loading: boolean) => void;
}

export interface LinkItem {
  id?: string;
  href?: string;
  label: string;
  prefetch?: boolean;
}