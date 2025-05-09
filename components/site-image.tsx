"use client"

import { useEffect, useState } from "react"

interface SiteImageProps {
  quote: string
  author: string
}

export function SiteImage({ quote, author }: SiteImageProps) {
  const [imageUrl, setImageUrl] = useState<string>("")
  const [width, setWidth] = useState<number>(1200)

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return

    // Update width based on viewport
    setWidth(window.innerWidth)

    // Create the image URL
    const encodedQuote = encodeURIComponent(quote)
    const encodedAuthor = encodeURIComponent(author)
    const timestamp = new Date().getTime()

    setImageUrl(`/api/og?quote=${encodedQuote}&author=${encodedAuthor}&width=${window.innerWidth}&t=${timestamp}`)
  }, [quote, author])

  if (!imageUrl) return null

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3 style={{ marginBottom: "10px" }}>Current Site Image Preview</h3>
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={`"${quote}" — ${author}`}
        style={{
          maxWidth: "100%",
          height: "auto",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      />
      <p style={{ marginTop: "10px", fontSize: "0.8rem", opacity: 0.7 }}>
        This is how your quote will appear when shared (width: {width}px)
      </p>
    </div>
  )
}
