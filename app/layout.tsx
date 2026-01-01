import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "@/app/providers";
import Header from "@/components/header";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bifrost Build Stack",
  description: "A kit to build with Bifrost protocol",
  metadataBase: new URL("https://bifrost.buildstack.org"),
  openGraph: {
    title: "Bifrost Build Stack",
    description: "A kit to build with Bifrost protocol",
    url: "https://bifrost.buildstack.org",
    siteName: "Bifrost Build Stack",
    images: [
      {
        url: "/bifrost-full-mono.svg",
        width: 1200,
        height: 630,
        alt: "og-image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bifrost Build Stack",
    description: "A kit to build with Bifrost protocol",
    creator: "@zxstim",
    images: ["/bifrost-full-mono.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jetBrainsMono.className} antialiased`}
      >
        <Providers>
          <main>
            <Header />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
