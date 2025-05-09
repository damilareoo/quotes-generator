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

// Revalidate every hour
export const revalidate = 3600

export async function GET() {
  try {
    // Get a random quote
    const quote = await getRandomQuote()

    // Generate a color scheme - using a mint color scheme to match the provided image
    const colorScheme = {
      background: "#e0ffff", // Light mint/cyan background
      text: "#2d4f4f", // Dark teal text color
    }

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
          padding: "40px",
          fontFamily: "sans-serif",
        }}
      >
        {/* App name at top */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          Inspiration Canvas
        </div>

        {/* Large quotation mark */}
        <div
          style={{
            fontSize: "200px",
            fontWeight: "bold",
            lineHeight: 1,
            fontFamily: "serif",
            opacity: 0.9,
            marginBottom: "20px",
          }}
        >
          "
        </div>

        {/* Quote text */}
        <div
          style={{
            fontSize: quote.text.length > 100 ? "32px" : "40px",
            fontWeight: "medium",
            textAlign: "center",
            maxWidth: "80%",
            lineHeight: 1.4,
          }}
        >
          {quote.text.length > 180 ? quote.text.substring(0, 180) + "..." : quote.text}
        </div>

        {/* Author */}
        <div
          style={{
            fontSize: "28px",
            fontStyle: "italic",
            marginTop: "24px",
            opacity: 0.9,
          }}
        >
          — {quote.author}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "20px",
            opacity: 0.7,
          }}
        >
          Built with love and music by Damilare
        </div>
      </div>,
      {
        ...size,
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
