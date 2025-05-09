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

    // No need to revalidate OG image anymore since we're using a static image

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

    // More aggressive scaling for mobile devices
    if (windowSize.width < 768) {
      responsiveSize = baseFontSize * 0.75
    }
    if (windowSize.width < 480) {
      responsiveSize = baseFontSize * 0.55
    }
    if (windowSize.width < 360) {
      responsiveSize = baseFontSize * 0.45
    }

    // Further reduce for very long quotes
    if (quoteLength > 200) {
      responsiveSize *= 0.65
    } else if (quoteLength > 100) {
      responsiveSize *= 0.8
    }

    // Ensure minimum readable font size (16px equivalent)
    const minSize = windowSize.width < 360 ? 0.9 : 1
    return `${Math.max(responsiveSize, minSize)}rem`
  }

  // Determine if we should use a more compact layout for small screens
  const useCompactLayout = windowSize.width < 480

  const containerStyle = {
    backgroundColor: colorScheme.background,
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

  // Update the contentStyle to ensure proper spacing
  const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    position: "relative" as const,
    overflow: "hidden",
    // Adjust max height to ensure content fits on mobile with proper spacing
    maxHeight: useCompactLayout ? "calc(100vh - 130px)" : "calc(100vh - 60px)",
    margin: 0,
    border: "none",
    background: "none",
  }

  // Update the quoteContainerStyle to ensure proper spacing from buttons
  const quoteContainerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: layout.alignment === "center" ? "center" : layout.alignment === "left" ? "flex-start" : "flex-end",
    justifyContent: layout.position === "center" ? "center" : layout.position === "top" ? "flex-start" : "flex-end",
    maxWidth: windowSize.width > 768 ? "800px" : "100%",
    width: "100%",
    // Adjust padding for mobile
    padding: useCompactLayout ? "1rem" : windowSize.width > 480 ? "2rem" : "1.5rem",
    // Adjust bottom margin to ensure buttons are visible
    marginBottom: useCompactLayout ? "130px" : "100px",
    border: "none",
    boxShadow: "none",
    background: "none",
    // Add max-height to ensure content doesn't overflow
    maxHeight: useCompactLayout ? "calc(100vh - 180px)" : "calc(100vh - 140px)",
    overflowY: "auto" as const,
    // Hide scrollbar but allow scrolling
    scrollbarWidth: "none" as const,
    msOverflowStyle: "none" as const,
  }

  const quoteStyle = {
    fontFamily: typography.fontFamily,
    fontSize: getResponsiveFontSize(),
    fontWeight: typography.fontWeight,
    letterSpacing: typography.letterSpacing,
    lineHeight: typography.lineHeight,
    textAlign: layout.alignment as "center" | "left" | "right",
    transition: "all 0.8s ease-in-out",
    // Ensure text doesn't overflow
    maxHeight: useCompactLayout ? "calc(70vh - 160px)" : "60vh",
    overflow: "hidden",
    textOverflow: "ellipsis" as const,
    wordWrap: "break-word" as const,
    hyphens: "auto" as const,
    border: "none",
    boxShadow: "none",
    background: "none",
    // Improve readability with minimum line height
    minHeight: "1em",
  }

  const authorStyle = {
    fontFamily: typography.fontFamily,
    // Ensure author text is readable but proportional to quote text
    fontSize: `calc(${getResponsiveFontSize()} * 0.7)`,
    fontWeight: "normal",
    opacity: 0.8,
    marginTop: useCompactLayout ? "0.5rem" : "1rem",
    textAlign: layout.alignment as "center" | "left" | "right",
    wordWrap: "break-word" as const,
    border: "none",
    boxShadow: "none",
    background: "none",
    // Ensure minimum readable size
    minFontSize: useCompactLayout ? "0.8rem" : "1rem",
  }

  // Update the footerStyle to ensure it stays at the bottom with proper spacing
  const footerStyle = {
    padding: useCompactLayout ? "0.75rem 0.5rem" : "1rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    // Adjust font size for better readability on mobile
    fontSize: useCompactLayout ? "0.75rem" : windowSize.width > 480 ? "1rem" : "0.8rem",
    fontFamily: "Geist, sans-serif",
    transition: "all 0.8s ease-in-out",
    flexWrap: "wrap" as const,
    // Ensure consistent height on mobile
    minHeight: useCompactLayout ? "50px" : "60px",
    position: "fixed" as const,
    bottom: 0,
    zIndex: 10,
    border: "none",
    boxShadow: "none",
    // Add a semi-transparent background that matches the main background
    background: `${colorScheme.background}F0`,
    backdropFilter: "blur(5px)",
    margin: 0,
  }

  const linkStyle = {
    color: colorScheme.text,
    backgroundColor: `${colorScheme.text}20`,
    // Increase padding for better touch targets
    padding: useCompactLayout ? "0.2rem 0.3rem" : "0.2rem 0.4rem",
    borderRadius: "4px",
    textDecoration: "none",
    transition: "all 0.3s ease",
  }

  // Update the buttonContainerStyle to increase the distance from the footer
  const buttonContainerStyle = {
    position: "fixed" as const,
    // Adjust position to ensure visibility and better spacing from footer
    bottom: useCompactLayout ? "70px" : "80px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    // Reduce gap on smaller screens
    gap: useCompactLayout ? "12px" : "16px",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  }

  // Update the buttonStyle to ensure proper sizing on mobile
  const buttonStyle = {
    backgroundColor: `${colorScheme.text}20`,
    color: colorScheme.text,
    border: `2px solid ${colorScheme.text}40`,
    borderRadius: "50%",
    // Adjust button size for better touch targets on mobile
    width: useCompactLayout ? "48px" : windowSize.width > 480 ? "60px" : "50px",
    height: useCompactLayout ? "48px" : windowSize.width > 480 ? "60px" : "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    outline: "none",
    // Ensure minimum touch target size (44px is recommended)
    minWidth: "44px",
    minHeight: "44px",
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
              <Check size={useCompactLayout ? 18 : windowSize.width > 480 ? 24 : 20} />
            ) : (
              <Copy size={useCompactLayout ? 18 : windowSize.width > 480 ? 24 : 20} />
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
              size={useCompactLayout ? 18 : windowSize.width > 480 ? 24 : 20}
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
              <Check size={useCompactLayout ? 18 : windowSize.width > 480 ? 24 : 20} />
            ) : (
              <Download size={useCompactLayout ? 18 : windowSize.width > 480 ? 24 : 20} />
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
            <ImageIcon size={useCompactLayout ? 18 : windowSize.width > 480 ? 24 : 20} />
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
            <SpotifyIcon color={colorScheme.text} size={useCompactLayout ? 16 : windowSize.width > 480 ? 20 : 18} />
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
