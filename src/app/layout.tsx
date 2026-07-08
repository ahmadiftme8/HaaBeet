import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family',
});

export const metadata: Metadata = {
  title: 'HaaBeet',
  description: 'Gamified habit tracker',
};

export default function RootLayout({children}: {children: React.ReactNode;}) {
    
  return (
    
      
     
        <html lang="en" className={inter.variable} /* suppressHydrationWarning */ >
          <body suppressHydrationWarning  className="min-h-screen bg-white text-slate-900 antialiased">
             <Providers>
                {children}
             </Providers>
           
             
            
          </body>
        </html>
         
      
    
  );
}