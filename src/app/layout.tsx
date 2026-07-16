import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import seoConfig from "@config/seo.json";
import { StructuredData } from "@/components/seo/StructuredData";
import { AnalyticsProvider } from "@/components/seo/AnalyticsProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  preload: false,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.global.metadataBase),
  title: seoConfig.global.title,
  description: seoConfig.global.description,
  keywords: seoConfig.global.keywords,
  authors: seoConfig.global.authors,
  creator: seoConfig.global.creator,
  publisher: seoConfig.global.publisher,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  robots: seoConfig.robots as any,
  openGraph: seoConfig.openGraph,
  twitter: seoConfig.twitter,
  verification: seoConfig.global.verification,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen bg-background text-foreground`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <AnalyticsProvider />
      </body>
    </html>
  );
}
