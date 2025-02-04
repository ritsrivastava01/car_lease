import { Header } from '@/components/header';
import type { Metadata } from 'next';
import { Geist_Mono, Montserrat } from 'next/font/google';
import './globals.css';

const geistSans = Montserrat({
  variable: '--font-Montserrat',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Car Next',
  description: 'Lease form for the car',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} m-auto antialiased`}
      >
        <Header className="-mb-11" />
        <div className="w-full bg-gray-100">
          <div className="mx-auto max-w-7xl px-6 pt-16 md:px-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
