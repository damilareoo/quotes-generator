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
        }}
      >
        {/* Large quotation mark */}
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
      </div>,
      {
        ...size,
        // Using system fonts
        fonts: [],
      },
    )
  } catch (error) {
    console.error("Error generating OG image:", error)
    return new Response("Error generating image", { status: 500 })
  }
}
