import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the visionaries, coordinators, and volunteers of Aarambh \'26 who made this spectacular pop-art convergence festival at JK Lakshmipat University possible.',
  openGraph: {
    title: 'Our Team | AARAMBH\'26',
    description: 'Meet the visionaries, coordinators, and volunteers of Aarambh \'26 who made this spectacular pop-art convergence festival possible.',
  }
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
