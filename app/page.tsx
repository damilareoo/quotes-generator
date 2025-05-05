"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import { getRandomQuote } from "@/lib/quotes"
import { generateColorScheme } from "@/lib/colors"
import { generateLayout } from "@/lib/layouts"
import { generateTypography } from "@/lib/typography"
import { RefreshCw, Check, Copy, Download, ImageIcon } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { SpotifyIcon } from "@/components/spotify-icon"
import { ThumbnailModal } from "@/components/thumbnail-modal"
import Head from "next/head"

export default function ColorQuotes() {
  const [quote, setQuote] = useState({ text: "", author: "" })
  const [colorScheme, setColorScheme] = useState({
    background: "#121212",
    text: "#ffffff",
  })
  const [layout, setLayout] = useState({
    alignment: "center",
    spacing: "normal",
    position: "center",
  })
  const [typography, setTypography] = useState({
    fontFamily: "Geist, sans-serif",
    fontSize: "2rem",
    fontWeight: "normal",
    letterSpacing: "normal",
    lineHeight: "1.5",
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [shareStatus, setShareStatus] = useState<"idle" | "copying" | "copied" | "downloading" | "downloaded">("idle")
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })
  const [thumbnailModalOpen, setThumbnailModalOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Initial call

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const refreshExperience = useCallback(async () => {
    if (isRefreshing) return

    setIsRefreshing(true)

    // Get new quote
    const newQuote = await getRandomQuote()

    // Generate new color scheme
    const newColorScheme = generateColorScheme()

    // Generate new layout
    const newLayout = generateLayout()

    // Generate new typography
    const newTypography = generateTypography()

    // Update state
    setQuote(newQuote)
    setColorScheme(newColorScheme)
    setLayout(newLayout)
    setTypography(newTypography)

    // Try to revalidate the OG image, but don't worry if it fails
    try {
      await fetch("/api/revalidate-og", { method: "POST" })
    } catch (error) {
      console.error("Failed to revalidate OG image:", error)
    }

    setTimeout(() => {
      setIsRefreshing(false)
    }, 600)
  }, [isRefreshing])

  useEffect(() => {
    refreshExperience()
  }, [])

  // Generate image for sharing
  const generateImage = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    // Set canvas dimensions for social media sharing
    canvas.width = 1200
    canvas.height = 630

    // Fill background with mint color to match the site image
    ctx.fillStyle = "#e0ffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw large quotation mark
    ctx.fillStyle = "#2d4f4f"
    ctx.font = "bold 200px serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText('"', canvas.width / 2, canvas.height / 2 - 50)

    // Draw quote text below the quotation mark
    const maxWidth = canvas.width * 0.8
    const lineHeight = 50
    const x = canvas.width / 2
    const y = canvas.height / 2 + 50

    // Adjust font size based on quote length
    const fontSize = quote.text.length > 100 ? 32 : quote.text.length > 50 ? 40 : 48
    ctx.font = `${fontSize}px ${typography.fontFamily.split(",")[0]}`
    ctx.fillStyle = "#2d4f4f"

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
    const quoteLines = wrapText(`${quote.text}`, x, y, maxWidth, lineHeight)

    // Draw author
    ctx.font = `italic 32px ${typography.fontFamily.split(",")[0]}`
    ctx.fillText(`— ${quote.author}`, x, y + lineHeight * quoteLines + 40)

    return canvas.toDataURL("image/png")
  }, [quote, typography])

  // Copy quote to clipboard
  const copyToClipboard = useCallback(async () => {
    setShareStatus("copying")

    try {
      await navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}\n\nShared from Inspiration Canvas`)
      setShareStatus("copied")

      // Reset status after 2 seconds
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setShareStatus("idle")
      }, 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
      setShareStatus("idle")
      alert("Could not copy to clipboard. Please try again.")
    }
  }, [quote])

  // Download image
  const downloadImage = useCallback(() => {
    setShareStatus("downloading")

    try {
      const imageData = generateImage()
      if (!imageData) {
        throw new Error("Could not generate image")
      }

      // Create a temporary link element to trigger download
      const link = document.createElement("a")
      link.href = imageData
      link.download = `quote-${quote.author.replace(/\s+/g, "-").toLowerCase()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setShareStatus("downloaded")

      // Reset status after 2 seconds
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setShareStatus("idle")
      }, 2000)
    } catch (error) {
      console.error("Failed to download image:", error)
      setShareStatus("idle")
      alert("Could not download image. Please try again.")
    }
  }, [quote, generateImage])

  // Open thumbnail modal
  const openThumbnailModal = useCallback(() => {
    setThumbnailModalOpen(true)
  }, [])

  // Calculate responsive font size based on window width and quote length
  const getResponsiveFontSize = () => {
    const baseFontSize = Number.parseFloat(typography.fontSize)
    const quoteLength = quote.text.length

    // Adjust font size based on screen width
    let responsiveSize = baseFontSize

    if (windowSize.width < 768) {
      responsiveSize = baseFontSize * 0.8
    }
    if (windowSize.width < 480) {
      responsiveSize = baseFontSize * 0.6
    }

    // Further reduce for very long quotes
    if (quoteLength > 200) {
      responsiveSize *= 0.7
    } else if (quoteLength > 100) {
      responsiveSize *= 0.85
    }

    return `${responsiveSize}rem`
  }

  const containerStyle = {
    backgroundColor: colorScheme.background, // Single background color
    color: colorScheme.text,
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative" as const,
    display: "flex",
    flexDirection: "column" as const,
    transition: "background-color 0.8s ease-in-out",
    margin: 0,
    padding: 0,
    border: "none",
  }

  const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    position: "relative" as const,
    overflow: "hidden",
    maxHeight: "calc(100vh - 60px)",
    margin: 0,
    border: "none",
    background: "none", // No background
  }

  const quoteContainerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: layout.alignment === "center" ? "center" : layout.alignment === "left" ? "flex-start" : "flex-end",
    justifyContent: layout.position === "center" ? "center" : layout.position === "top" ? "flex-start" : "flex-end",
    maxWidth: windowSize.width > 768 ? "800px" : "100%",
    width: "100%",
    padding: windowSize.width > 480 ? "2rem" : "1rem",
    marginBottom: "80px",
    border: "none",
    boxShadow: "none",
    background: "none", // No background
  }

  const quoteStyle = {
    fontFamily: typography.fontFamily,
    fontSize: getResponsiveFontSize(),
    fontWeight: typography.fontWeight,
    letterSpacing: typography.letterSpacing,
    lineHeight: typography.lineHeight,
    textAlign: layout.alignment as "center" | "left" | "right",
    transition: "all 0.8s ease-in-out",
    maxHeight: "60vh",
    overflow: "hidden",
    textOverflow: "ellipsis" as const,
    wordWrap: "break-word" as const,
    hyphens: "auto" as const,
    border: "none",
    boxShadow: "none",
    background: "none", // No background
  }

  const authorStyle = {
    fontFamily: typography.fontFamily,
    fontSize: `calc(${getResponsiveFontSize()} * 0.6)`,
    fontWeight: "normal",
    opacity: 0.8,
    marginTop: "1rem",
    textAlign: layout.alignment as "center" | "left" | "right",
    wordWrap: "break-word" as const,
    border: "none",
    boxShadow: "none",
    background: "none", // No background
  }

  const footerStyle = {
    padding: "1rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: windowSize.width > 480 ? "1rem" : "0.8rem",
    fontFamily: "Geist, sans-serif",
    transition: "all 0.8s ease-in-out",
    flexWrap: "wrap" as const,
    minHeight: "60px",
    position: "relative" as const,
    zIndex: 10,
    border: "none",
    boxShadow: "none",
    background: "none", // No background
    margin: 0,
  }

  const linkStyle = {
    color: colorScheme.text,
    backgroundColor: `${colorScheme.text}20`,
    padding: "0.2rem 0.4rem",
    borderRadius: "4px",
    textDecoration: "none",
    transition: "all 0.3s ease",
  }

  // Button container style for grouping buttons
  const buttonContainerStyle = {
    position: "fixed" as const,
    bottom: "80px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "16px",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  }

  const buttonStyle = {
    backgroundColor: `${colorScheme.text}20`,
    color: colorScheme.text,
    border: `2px solid ${colorScheme.text}40`,
    borderRadius: "50%",
    width: windowSize.width > 480 ? "60px" : "50px",
    height: windowSize.width > 480 ? "60px" : "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    outline: "none",
  }

  const buttonHoverStyle = {
    backgroundColor: `${colorScheme.text}30`,
    transform: "translateY(-2px)",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
  }

  // Hidden canvas for image generation
  const hiddenCanvasStyle = {
    display: "none",
    position: "absolute" as const,
    pointerEvents: "none" as const,
  }

  return (
    <>
      {/* Add dynamic meta tags for the current quote */}
      <Head>
        <meta property="og:title" content={`"${quote.text}" — ${quote.author}`} />
        <meta property="og:description" content="Inspiration Canvas - Beautiful quotes with dynamic styling" />
        <meta property="og:image" content="/api/og" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`"${quote.text}" — ${quote.author}`} />
        <meta name="twitter:description" content="Inspiration Canvas - Beautiful quotes with dynamic styling" />
        <meta name="twitter:image" content="/api/og" />
      </Head>

      <div style={containerStyle}>
        <div style={contentStyle}>
          <AnimatePresence mode="wait">
            <motion.div
              key={quote.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={quoteContainerStyle}
            >
              <div style={quoteStyle}>{quote.text}</div>
              <div style={authorStyle}>— {quote.author}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hidden canvas for image generation */}
        <canvas ref={canvasRef} style={hiddenCanvasStyle} />

        {/* Button container for all action buttons */}
        <div style={buttonContainerStyle}>
          {/* Copy button */}
          <motion.button
            style={buttonStyle}
            whileHover={buttonHoverStyle}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              copyToClipboard()
            }}
            aria-label="Copy quote to clipboard"
          >
            {shareStatus === "copying" ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                <span className="sr-only">Copying...</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke={colorScheme.text}
                    strokeWidth="2"
                    strokeDasharray="62.83"
                    strokeDashoffset="0"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 12 12"
                      to="360 12 12"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </motion.div>
            ) : shareStatus === "copied" ? (
              <Check size={windowSize.width > 480 ? 24 : 20} />
            ) : (
              <Copy size={windowSize.width > 480 ? 24 : 20} />
            )}
          </motion.button>

          {/* Refresh button */}
          <motion.button
            style={buttonStyle}
            whileHover={buttonHoverStyle}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              refreshExperience()
            }}
            aria-label="Get fresh quote"
          >
            <RefreshCw
              size={windowSize.width > 480 ? 24 : 20}
              style={{
                transition: "transform 0.5s ease",
                transform: isRefreshing ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </motion.button>

          {/* Download button */}
          <motion.button
            style={buttonStyle}
            whileHover={buttonHoverStyle}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              downloadImage()
            }}
            aria-label="Download quote as image"
          >
            {shareStatus === "downloading" ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                <span className="sr-only">Downloading...</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke={colorScheme.text}
                    strokeWidth="2"
                    strokeDasharray="62.83"
                    strokeDashoffset="0"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 12 12"
                      to="360 12 12"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </motion.div>
            ) : shareStatus === "downloaded" ? (
              <Check size={windowSize.width > 480 ? 24 : 20} />
            ) : (
              <Download size={windowSize.width > 480 ? 24 : 20} />
            )}
          </motion.button>

          {/* Thumbnail button */}
          <motion.button
            style={buttonStyle}
            whileHover={buttonHoverStyle}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              openThumbnailModal()
            }}
            aria-label="Create thumbnail"
          >
            <ImageIcon size={windowSize.width > 480 ? 24 : 20} />
          </motion.button>
        </div>

        <footer style={footerStyle}>
          <span>Built with love and music by </span>
          <a href="https://x.com/damilare_oo" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            Damilare
          </a>
          <a
            href="https://open.spotify.com/playlist/11bkSXneY1GEq0UIVFPjLh?si=78d932820d894639"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Damilare's Spotify playlist"
            style={{ display: "flex", alignItems: "center", marginLeft: "4px" }}
          >
            <SpotifyIcon color={colorScheme.text} size={windowSize.width > 480 ? 20 : 16} />
          </a>
        </footer>
      </div>

      {/* Thumbnail Modal */}
      <ThumbnailModal
        quote={quote.text}
        author={quote.author}
        backgroundColor={colorScheme.background}
        textColor={colorScheme.text}
        fontFamily={typography.fontFamily}
        isOpen={thumbnailModalOpen}
        onClose={() => setThumbnailModalOpen(false)}
      />
    </>
  )
}
