import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Breadcrumb from '@/components/layout/Breadcrumb';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ski Resort Finder',
  description: 'Find your perfect ski resort based on your preferences and current conditions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb />
          {children}
        </div>
      </body>
    </html>
  );
}