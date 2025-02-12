import { Header } from '@/components/header';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import React from 'react';
import './globals.css';

const font = Open_Sans({
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Next Js Form Example',
  description: 'Lease form for the car',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} m-auto antialiased`}>
        <Header className="-mb-11" />
        <div className="mx-auto max-w-7xl px-6 pt-16 md:px-8">{children}</div>
      </body>
    </html>
  );
}
