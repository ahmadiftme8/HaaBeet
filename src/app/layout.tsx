import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-family',
});

export const metadata: Metadata = {
  title: 'HaaBeet',
  description: 'Gamified habit tracker',
};

export default function RootLayout({children}: {children: React.ReactNode;}) {
    
  return (
    
      
     
        <html lang="en" className={inter.variable} /* suppressHydrationWarning */ >
          <body suppressHydrationWarning className="min-h-screen bg-bg-app text-text-primary antialiased">
             <Providers>
                {children}
             </Providers>
           
             
            
          </body>
        </html>
         
      
    
  );
}