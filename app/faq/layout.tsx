import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "FAQs & Guidelines",
  description: "Get instant answers to all frequently asked questions about registration, scheduling, reporting, and event rules for Aarambh '26 at JK Lakshmipat University.",
  openGraph: {
    title: "FAQs & Guidelines | Aarambh '26",
    description: "Get instant answers to all frequently asked questions about registration, scheduling, reporting, and event rules for Aarambh '26.",
    type: 'website'
  }
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
