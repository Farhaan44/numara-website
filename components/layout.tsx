import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import NumaraLoader from "@/components/NumaraLoader";
import { Playfair_Display, Lato } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400'] })
const lato = Lato({ subsets: ['latin'], weight: ['300', '400'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NumaraLoader/>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  )
}