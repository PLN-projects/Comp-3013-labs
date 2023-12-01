import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Code Snippet Maker',
  description: 'an app to create your code snippets using next-js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Wrapper>
          <Header />
            {children}
          <Footer />
        </Wrapper>
      </body>
    </html>
  )
}
