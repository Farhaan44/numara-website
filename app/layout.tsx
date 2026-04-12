import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import NumaraLoader from "@/components/NumaraLoader";
import { CTASection } from "@/components/CTASection";
import { SectionDivider } from "@/components/SectionDivider";

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