import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import LoaderProvider from "@/components/LoaderProvider";

export const metadata = {
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