import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sentiment & Form Configurator Portal",
  description: "Administrative configuration board and sentiment analytics dashboard for Aarambh '26.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
