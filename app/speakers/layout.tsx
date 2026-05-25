import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Speakers & Mentors",
  description: "Meet the industry experts, startup founders, tech mentors, and panel leaders guiding first-year students during Aarambh '26 at JK Lakshmipat University.",
  openGraph: {
    title: "Speakers & Mentors | Aarambh '26",
    description: "Meet the industry experts, startup founders, tech mentors, and panel leaders guiding first-year students during Aarambh '26.",
    type: 'website'
  }
};

export default function SpeakersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
