import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

import NextTopLoader from 'nextjs-toploader';

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
      className={`${plusJakartaSans.variable} ${dmSans.variable}`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className="antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:top-0 focus:left-0">
          Lewati ke konten utama
        </a>
        <NextTopLoader color="var(--color-primary)" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}

