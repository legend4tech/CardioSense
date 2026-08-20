import { Inter, Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" })

export const metadata = {
  title: {
    default: "CardioSense — AI Clinical Decision Support for Pediatric Cardiology",
    template: "%s | CardioSense CDSS",
  },
  description:
    "CardioSense is an AI-powered Clinical Decision Support System that helps clinicians diagnose Atrial Septal Defect (ASD) and Ventricular Septal Defect (VSD) in pediatric patients using Google Gemini AI.",
  keywords: [
    "pediatric cardiology",
    "congenital heart disease",
    "ASD",
    "VSD",
    "clinical decision support",
    "CDSS",
    "AI diagnosis",
    "Gemini AI",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", inter.variable, outfit.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
