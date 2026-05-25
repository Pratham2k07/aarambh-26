import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Schedule & Timeline",
  description: "View the complete day-by-day induction program schedule, timeline, and cultural events calendar for Aarambh '26 first-year orientation at JK Lakshmipat University.",
  openGraph: {
    title: "Schedule & Timeline | Aarambh '26",
    description: "View the complete day-by-day induction program schedule, timeline, and cultural events calendar for Aarambh '26 first-year orientation.",
    type: 'website'
  }
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
