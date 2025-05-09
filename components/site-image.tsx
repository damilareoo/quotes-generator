"use client"

import { useRef, useEffect } from "react"

interface SiteImageProps {
  backgroundColor?: string
  quoteMarkColor?: string
}

export function SiteImage({ backgroundColor = "#e0ffff", quoteMarkColor = "#2d4f4f" }: SiteImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Make canvas responsive to device pixel ratio
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    // Set canvas size with device pixel ratio for sharpness
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Set display size
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Fill background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw quotation mark
    ctx.fillStyle = quoteMarkColor
    ctx.font = "bold 120px serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText('"', rect.width / 2, rect.height / 2)

    // Return a cleanup function
    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [backgroundColor, quoteMarkColor])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  )
}
