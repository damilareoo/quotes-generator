"use client"

import { useEffect } from "react"

interface DynamicOGMetaProps {
  quote: string
  author: string
}

export function DynamicOGMeta({ quote, author }: DynamicOGMetaProps) {
  // Create a function to generate the OG image URL with the current quote
  const getOgImageUrl = () => {
    // Encode the quote and author for URL safety
    const encodedQuote = encodeURIComponent(quote)
    const encodedAuthor = encodeURIComponent(author)

    // Add a timestamp to prevent caching
    const timestamp = new Date().getTime()

    // Get the current viewport width
    const width = typeof window !== "undefined" ? window.innerWidth : 1200

    // Create the full URL with the origin to ensure it's absolute
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    return `${baseUrl}/api/og?quote=${encodedQuote}&author=${encodedAuthor}&width=${width}&t=${timestamp}`
  }

  // Update the useEffect to better handle social sharing
  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return

    // Get the OG image URL
    const ogImageUrl = getOgImageUrl()

    // Find existing meta tags or create new ones
    const updateMetaTag = (property: string, content: string) => {
      let meta =
        document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`)

      if (!meta) {
        meta = document.createElement("meta")
        if (property.startsWith("og:")) {
          meta.setAttribute("property", property)
        } else {
          meta.setAttribute("name", property)
        }
        document.head.appendChild(meta)
      }

      meta.setAttribute("content", content)
    }

    // Update Open Graph meta tags
    updateMetaTag("og:title", `"${quote}" — ${author}`)
    updateMetaTag("og:description", "Inspiration Canvas - Beautiful quotes with dynamic styling")
    updateMetaTag("og:image", ogImageUrl)
    updateMetaTag("og:image:width", "1200")
    updateMetaTag("og:image:height", "630")
    updateMetaTag("og:url", window.location.href)
    updateMetaTag("og:type", "website")

    // Update Twitter meta tags
    updateMetaTag("twitter:card", "summary_large_image")
    updateMetaTag("twitter:title", `"${quote}" — ${author}`)
    updateMetaTag("twitter:description", "Inspiration Canvas - Beautiful quotes with dynamic styling")
    updateMetaTag("twitter:image", ogImageUrl)
    updateMetaTag("twitter:creator", "@damilare_oo")

    // Update standard meta tags
    updateMetaTag("description", `"${quote}" — ${author} | Inspiration Canvas`)

    // Trigger a revalidation of the OG image
    fetch("/api/revalidate-og", { method: "POST" }).catch((err) => console.error("Failed to revalidate OG image:", err))
  }, [quote, author])

  return null
}
