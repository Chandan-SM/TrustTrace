import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '../context/ThemeContext';
import { IncidentProvider } from '../context/IncidentContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Safety Incident Dashboard | HumanChain',
  description: 'Monitor and report AI safety incidents to build a safer AI ecosystem',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <IncidentProvider>
            {children}
            <Toaster position="top-right" />
          </IncidentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}