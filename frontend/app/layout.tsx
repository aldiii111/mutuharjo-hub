import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

import NextTopLoader from 'nextjs-toploader';
import Footer from '@/components/features/layout/Footer';

export const metadata: Metadata = {
  title: 'SMK Muhammadiyah 1 Sukoharjo | SMK Mutuharjo',
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
      className={`${plusJakartaSans.variable}`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
      </head>
      <body className="antialiased">
        <NextTopLoader color="var(--color-primary)" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}

