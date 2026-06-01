import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import LoaderProvider from "@/components/LoaderProvider";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Numara Group",
  description: "Crafting Legacies, One Landmark At A Time",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  // Explicitly tell search engines they are welcome to crawl everything
  robots: {
    index: true,
    follow: true,
  },
  // Rich link previews for iMessage, WhatsApp, and LinkedIn
  openGraph: {
    title: "Numara Group",
    description: "Crafting Legacies, One Landmark At A Time",
    url: "https://www.numaragroup.com",
    siteName: "Numara Group",
    images: [
      {
        url: "https://www.numaragroup.com/anzarelegancehd.jpg", // Reuses your hero section's poster image!
        width: 1200,
        height: 630,
        alt: "Numara Group - Luxury Real Estate Developments",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LoaderProvider>
          <Navbar />
          {children}
          <Footer />
        </LoaderProvider>
      </body>
    </html>
  );
}