import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mutuharjo Hub - SMK Muhammadiyah 1 Sukoharjo',
  description:
    'Platform Web Resmi & Portal PPDB Interaktif SMK Muhammadiyah 1 Sukoharjo (SMK Mutuharjo). Sekolah Pusat Keunggulan.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${dmSans.variable}`}
    >
      <body className="antialiased font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
