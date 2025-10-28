import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MBTI 성격유형 검사 - 나의 진짜 성격을 찾아보세요',
  description: '정확한 MBTI 성격유형 검사로 나의 진짜 모습을 발견하세요. 16가지 성격유형 중 당신은 어떤 유형인지 알아보고, 성격에 맞는 직업과 인간관계 조언을 받아보세요.',
  keywords: 'MBTI, 성격검사, 성격유형, 심리테스트, 성격분석, MBTI테스트',
  authors: [{ name: 'MBTI Analyzer' }],
  creator: 'MBTI Analyzer',
  publisher: 'MBTI Analyzer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mbti-analyzer.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MBTI 성격유형 검사 - 나의 진짜 성격을 찾아보세요',
    description: '정확한 MBTI 성격유형 검사로 나의 진짜 모습을 발견하세요.',
    url: 'https://mbti-analyzer.vercel.app',
    siteName: 'MBTI Analyzer',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MBTI 성격유형 검사',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBTI 성격유형 검사',
    description: '정확한 MBTI 성격유형 검사로 나의 진짜 모습을 발견하세요.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={inter.className}>
        <div id="root">
          {children}
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  )
}