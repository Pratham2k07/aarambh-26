import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Register Online",
  description: "Secure your seat at the ultimate convergence of technology, culture, and innovation. Complete the quick online registration form for Aarambh '26.",
  openGraph: {
    title: "Register Online | Aarambh '26",
    description: "Secure your seat at the ultimate convergence of technology, culture, and innovation. Complete the quick online registration form for Aarambh '26.",
    type: 'website'
  }
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
