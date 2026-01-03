import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { ScreenProvider } from "@/contexts/ScreenContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Крипто обучение",
  description:
    "Бесплатное обучение крипте с нуля — от основ блокчейна до продвинутых стратегий мультиаккаунтинга, аирдропов и DeFi. Все схемы заработка и безопасность в одном курсе.",
  verification: {
    google: "xxxxxxxxxxxxxxx",
  },

  // остальные поля (keywords, openGraph, twitter, icons и т.п.)
  keywords: [
    "криптовалюта",
    "обучение криптовалютам",
    "крипто обучение",
    "крипто курсы",
    "крипта",
    "блокчейн",
    "DeFi",
    "аирдропы",
    "NFT",
    "заработок на криптовалютах",
    "безопасность криптовалют",
  ],

  metadataBase: new URL("https://yourcryptosite.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://yourcryptosite.com",
    title: "Крипто обучение | Бесплатное обучение криптовалютам с нуля",
    description:
      "Бесплатное обучение крипте с нуля — от основ блокчейна до продвинутых стратегий мультиаккаунтинга, аирдропов и DeFi. Все схемы заработка и безопасность в одном курсе.",
    siteName: "Крипто обучение",
    images: [
      {
        url: "https://yourcryptosite.com/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Крипто обучение — Бесплатное обучение криптовалютам",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Крипто обучение | Бесплатное обучение криптовалютам с нуля",
    description:
      "Бесплатное обучение крипте с нуля — от основ блокчейна до продвинутых стратегий мультиаккаунтинга, аирдропов и DeFi. Все схемы заработка и безопасность в одном курсе.",
    images: ["https://yourcryptosite.com/og-preview.jpg"],
  },
  
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ScreenProvider>
          {children}
        </ScreenProvider>
      </body>
    </html>
  );
}
