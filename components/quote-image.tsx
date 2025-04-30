"use client"
import { useRef, useEffect } from "react"

interface QuoteImageProps {
  quote: string
  author: string
  backgroundColor: string
  textColor: string
  fontFamily: string
}

export function QuoteImage({ quote, author, backgroundColor, textColor, fontFamily }: QuoteImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions for social media sharing (1200x630 is standard)
    canvas.width = 1200
    canvas.height = 630

    // Fill background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Set text properties
    ctx.fillStyle = textColor
    ctx.textAlign = "center"

    // Draw branding
    ctx.font = "bold 28px " + fontFamily
    ctx.fillText("Inspiration Canvas", canvas.width / 2, 60)

    // Draw quote
    const maxWidth = canvas.width * 0.8
    const lineHeight = 60
    const x = canvas.width / 2
    const y = canvas.height / 2 - 100

    // Adjust font size based on quote length
    const fontSize = quote.length > 100 ? 36 : quote.length > 50 ? 48 : 56
    ctx.font = `${fontSize}px ${fontFamily}`

    // Wrap text function
    const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const words = text.split(" ")
      let line = ""
      let testLine = ""
      let lineCount = 0

      for (let n = 0; n < words.length; n++) {
        testLine = line + words[n] + " "
        const metrics = ctx.measureText(testLine)
        const testWidth = metrics.width

        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y)
          line = words[n] + " "
          y += lineHeight
          lineCount++
        } else {
          line = testLine
        }
      }

      ctx.fillText(line, x, y)
      return lineCount + 1
    }

    // Draw the quote with text wrapping
    const quoteLines = wrapText(`"${quote}"`, x, y, maxWidth, lineHeight)

    // Draw author
    ctx.font = `italic 32px ${fontFamily}`
    ctx.fillText(`— ${author}`, x, y + lineHeight * quoteLines + 40)

    // Draw footer
    ctx.font = `20px ${fontFamily}`
    ctx.fillText("Built with love and music by Damilare", x, canvas.height - 40)
  }, [quote, author, backgroundColor, textColor, fontFamily])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "auto",
        maxWidth: "600px",
        display: "none", // Hidden by default, used for generating image data
      }}
    />
  )
}
