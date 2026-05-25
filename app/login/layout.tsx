import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Secure Login",
  description: "Secure authentication portal for Aarambh '26 administrators, check-in scanners, and feedback portal organizers.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
