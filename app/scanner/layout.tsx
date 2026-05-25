import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Ticket Scanner",
  description: "QR ticket validator and instant check-in registry validator dashboard for Aarambh '26 check-in desks.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function ScannerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
