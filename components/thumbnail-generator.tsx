"use client"

import { useRef, useEffect } from "react"

interface ThumbnailGeneratorProps {
  quote: string
  author: string
  backgroundColor: string
  textColor: string
  fontFamily: string
  onGenerated?: (dataUrl: string) => void
  width?: number
  height?: number
}

export function ThumbnailGenerator({
  quote,
  author,
  backgroundColor,
  textColor,
  fontFamily,
  onGenerated,
  width = 400,
  height = 300,
}: ThumbnailGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Fill background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)

    // Draw quotation mark
    ctx.fillStyle = textColor
    ctx.font = `bold ${Math.floor(height / 5)}px serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText('"', width / 2, height * 0.1)

    // Draw quote
    const maxWidth = width * 0.8
    // Adjust font size based on width to ensure readability
    const fontSize = Math.max(12, Math.min(16, Math.floor(width / 25)))
    ctx.font = `${fontSize}px ${fontFamily.split(",")[0]}`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Wrap text function
    const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const words = text.split(" ")
      let line = ""
      let testLine = ""
      let lineCount = 0
      // Adjust max lines based on thumbnail size
      const maxLines = Math.floor(height / (lineHeight * 1.5))
      let truncated = false

      for (let n = 0; n < words.length; n++) {
        if (lineCount >= maxLines - 1) {
          // On the last allowed line, check if we need to truncate
          testLine = line + words[n] + " "
          const metrics = ctx.measureText(testLine + "...")
          if (metrics.width > maxWidth) {
            // Need to truncate
            ctx.fillText(line + "...", x, y)
            truncated = true
            break
          }
        }

        testLine = line + words[n] + " "
        const metrics = ctx.measureText(testLine)
        const testWidth = metrics.width

        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y)
          line = words[n] + " "
          y += lineHeight
          lineCount++

          if (lineCount >= maxLines) {
            // Reached max lines, truncate
            ctx.fillText(line + "...", x, y)
            truncated = true
            break
          }
        } else {
          line = testLine
        }
      }

      if (!truncated) {
        ctx.fillText(line, x, y)
        lineCount++
      }

      return lineCount
    }

    // Draw the quote with text wrapping
    const lineHeight = fontSize * 1.5
    const quoteLines = wrapText(quote, width / 2, height / 2, maxWidth, lineHeight)

    // Draw author
    ctx.font = `italic ${fontSize * 0.8}px ${fontFamily.split(",")[0]}`
    ctx.fillText(`— ${author}`, width / 2, height / 2 + lineHeight * quoteLines + 10)

    // Draw app name at bottom
    ctx.font = `${fontSize * 0.7}px ${fontFamily.split(",")[0]}`
    ctx.textBaseline = "bottom"
    ctx.fillText("Inspiration Canvas", width / 2, height - 10)

    // If callback provided, send the data URL
    if (onGenerated) {
      onGenerated(canvas.toDataURL("image/png"))
    }
  }, [quote, author, backgroundColor, textColor, fontFamily, width, height, onGenerated])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: "100%",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        margin: "10px 0",
      }}
    />
  )
}
