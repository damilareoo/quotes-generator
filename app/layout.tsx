import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Inspiration Canvas",
  description: "A beautiful canvas of inspirational quotes with dynamic styling",
  openGraph: {
    title: "Inspiration Canvas",
    description: "Discover inspiring quotes with beautiful typography and colors",
    images: [
      {
        url: "/images/site-image.png",
        width: 1200,
        height: 630,
        alt: "Simplicity is the ultimate sophistication. — Leonardo da Vinci",
      },
    ],
    type: "website",
    siteName: "Inspiration Canvas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inspiration Canvas",
    description: "Discover inspiring quotes with beautiful typography and colors",
    images: ["/images/site-image.png"],
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
      </head>
      <body>{children}</body>
    </html>
  )
}
