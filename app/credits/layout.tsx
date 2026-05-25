import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tech Team Credits",
  description: "Meet the designers and full-stack software engineers behind the high-performance Aarambh '26 neobrutalist digital registration portal.",
  openGraph: {
    title: "Tech Team Credits | Aarambh '26",
    description: "Meet the designers and full-stack software engineers behind the high-performance Aarambh '26 neobrutalist digital registration portal.",
    type: 'website'
  }
};

export default function CreditsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
