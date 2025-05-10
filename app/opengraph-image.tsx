import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Inspiration Canvas - Quote of the moment"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function Image() {
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
        position: "relative",
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
          marginBottom: "20px",
        }}
      >
        "
      </div>
      <div
        style={{
          fontSize: "40px",
          fontWeight: "medium",
          textAlign: "center",
          maxWidth: "80%",
          lineHeight: 1.4,
        }}
      >
        Simplicity is the ultimate sophistication.
      </div>
      <div
        style={{
          fontSize: "28px",
          fontStyle: "italic",
          marginTop: "24px",
          opacity: 0.9,
        }}
      >
        — Leonardo da Vinci
      </div>
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
    },
  )
}
