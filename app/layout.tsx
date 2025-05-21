import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

// Define the base URL for absolute paths
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://inspiration-canvas.vercel.app"

export const metadata: Metadata = {
  title: "Inspiration Canvas",
  description: "A beautiful canvas of inspirational quotes with dynamic styling",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Inspiration Canvas",
    description: "Discover inspiring quotes with beautiful typography and colors",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Simplicity is the ultimate sophistication. — Leonardo da Vinci",
      },
    ],
    type: "website",
    siteName: "Inspiration Canvas",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inspiration Canvas",
    description: "Discover inspiring quotes with beautiful typography and colors",
    images: ["/og.png"],
    creator: "@damilare_oo",
  },
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Georgia&display=swap"
          rel="stylesheet"
        />
        {/* Add direct meta tags for maximum compatibility */}
        <meta property="og:image" content={`${baseUrl}/og.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Simplicity is the ultimate sophistication. — Leonardo da Vinci" />
        <meta name="twitter:image" content={`${baseUrl}/og.png`} />
      </head>
      <body>{children}</body>
    </html>
  )
}
