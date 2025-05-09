import { ImageResponse } from "next/og"
import { getRandomQuote } from "@/lib/quotes"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Inspiration Canvas - Quote of the moment"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

// Revalidate every minute to ensure fresh quotes
export const revalidate = 60 // Revalidate every minute

// Update the GET function to better handle different breakpoints
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Get viewport width if provided, default to desktop
    const width = searchParams.get("width") ? Number.parseInt(searchParams.get("width") as string) : 1200

    // Determine if it's a mobile device
    const isMobile = width < 640
    const isTablet = width >= 640 && width < 1024

    // Adjust height based on width to maintain aspect ratio
    const height = Math.floor(width * (630 / 1200))

    // Get a random quote or use the one from params if provided
    let quote = await getRandomQuote()
    const quoteText = searchParams.get("quote")
    const quoteAuthor = searchParams.get("author")

    if (quoteText && quoteAuthor) {
      quote = { text: quoteText, author: quoteAuthor }
    }

    // Generate a color scheme - using a mint color scheme to match the provided image
    const colorScheme = {
      background: "#e0ffff", // Light mint/cyan background
      text: "#2d4f4f", // Dark teal text color
    }

    // Adjust font sizes based on viewport width
    const titleSize = isMobile ? 24 : isTablet ? 28 : 32
    const quoteMarkSize = isMobile ? 120 : isTablet ? 160 : 200
    const quoteSize = isMobile
      ? quote.text.length > 100
        ? 18
        : 22
      : isTablet
        ? quote.text.length > 100
          ? 24
          : 32
        : quote.text.length > 100
          ? 32
          : 40
    const authorSize = isMobile ? 18 : isTablet ? 24 : 28
    const footerSize = isMobile ? 14 : isTablet ? 18 : 20

    // Truncate quote if too long
    const maxQuoteLength = isMobile ? 100 : isTablet ? 150 : 180
    const displayQuote =
      quote.text.length > maxQuoteLength ? quote.text.substring(0, maxQuoteLength) + "..." : quote.text

    // Adjust padding based on device size
    const padding = isMobile ? "16px" : isTablet ? "30px" : "40px"
    const topPosition = isMobile ? "16px" : isTablet ? "30px" : "40px"
    const bottomPosition = isMobile ? "16px" : isTablet ? "30px" : "40px"

    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colorScheme.background,
          color: colorScheme.text,
          position: "relative",
          padding,
          fontFamily: "sans-serif",
        }}
      >
        {/* App name at top */}
        <div
          style={{
            position: "absolute",
            top: topPosition,
            fontSize: `${titleSize}px`,
            fontWeight: "bold",
          }}
        >
          Inspiration Canvas
        </div>

        {/* Large quotation mark */}
        <div
          style={{
            fontSize: `${quoteMarkSize}px`,
            fontWeight: "bold",
            lineHeight: 1,
            fontFamily: "serif",
            opacity: 0.9,
            marginBottom: isMobile ? "10px" : isTablet ? "16px" : "20px",
          }}
        >
          "
        </div>

        {/* Quote text */}
        <div
          style={{
            fontSize: `${quoteSize}px`,
            fontWeight: "medium",
            textAlign: "center",
            maxWidth: "80%",
            lineHeight: 1.4,
          }}
        >
          {displayQuote}
        </div>

        {/* Author */}
        <div
          style={{
            fontSize: `${authorSize}px`,
            fontStyle: "italic",
            marginTop: isMobile ? "12px" : isTablet ? "20px" : "24px",
            opacity: 0.9,
          }}
        >
          — {quote.author}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: bottomPosition,
            fontSize: `${footerSize}px`,
            opacity: 0.7,
          }}
        >
          Built with love and music by Damilare
        </div>
      </div>,
      {
        width: width,
        height: height,
        // Using system fonts
        fonts: [],
      },
    )
  } catch (error) {
    console.error("Error generating OG image:", error)

    // Fallback image if there's an error
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e0ffff",
          color: "#2d4f4f",
          padding: "40px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: "200px",
            fontWeight: "bold",
            lineHeight: 1,
            fontFamily: "serif",
            opacity: 0.9,
          }}
        >
          "
        </div>
        <div
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          Inspiration Canvas
        </div>
        <div
          style={{
            fontSize: "24px",
            marginTop: "10px",
          }}
        >
          Discover inspiring quotes with beautiful typography
        </div>
      </div>,
      {
        ...size,
        fonts: [],
      },
    )
  }
}
