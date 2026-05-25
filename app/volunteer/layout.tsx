import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Volunteer Portal",
  description: "Scoped operational dashboard for volunteer leaders and discipline controllers of Aarambh '26.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
