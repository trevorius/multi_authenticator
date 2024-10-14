import { SessionProvider } from 'next-auth/react';
import '@/styles/global.css';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar } from '@/components/Sidebar';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <SessionProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <div className='flex h-screen bg-gray-100 dark:bg-gray-900'>
              <Sidebar />
              <main className='flex-1 p-4 md:ml-64'>{children}</main>
            </div>
          </ThemeProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
