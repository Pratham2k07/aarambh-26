import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Event Feedback",
  description: "Submit your feedback, star ratings, and suggestions for Aarambh '26 orientation sessions, tech workshops, and cultural events.",
  openGraph: {
    title: "Event Feedback | Aarambh '26",
    description: "Submit your feedback, star ratings, and suggestions for Aarambh '26 orientation sessions, tech workshops, and cultural events.",
    type: 'website'
  }
};

export default function EventsFeedbackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
