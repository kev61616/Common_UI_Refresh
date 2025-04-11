import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import clsx from 'clsx';

import { Providers } from '@/app/providers';
import { Layout } from '@/components/Layout';

import '@/styles/globals.css';
import '@/styles/tailwind.css';
import '@/styles/custom-animations.css';
import '@/styles/timeline-animations.css';
import '@/components/review/timeline-view-variants/bookshelf-styles.css';

// Configure Inter with all weights and variable support
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: {
    template: '%s - BrainBox SAT',
    default: 'BrainBox SAT - Master your SAT preparation'
  },
  description:
  'Comprehensive SAT preparation platform with analytics, personalized insights, and expert study recommendations.'
};

export default function RootLayout({
  children


}: {children: React.ReactNode;}) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable)}
      suppressHydrationWarning data-oid="3ks0yj_">

      <body className="flex min-h-full bg-white dark:bg-slate-900" data-oid="h4:tkrr">
        <Providers data-oid="cjjvonx">
          <Layout data-oid="bc9z7xf">{children}</Layout>
        </Providers>
      </body>
    </html>);

}