"use client"

import { useState, useRef, useEffect } from "react"
import { ThumbnailGenerator } from "./thumbnail-generator"
import { Download, Copy, X } from "lucide-react"

interface ThumbnailModalProps {
  quote: string
  author: string
  backgroundColor: string
  textColor: string
  fontFamily: string
  isOpen: boolean
  onClose: () => void
}

export function ThumbnailModal({
  quote,
  author,
  backgroundColor,
  textColor,
  fontFamily,
  isOpen,
  onClose,
}: ThumbnailModalProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle")
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })
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

  if (!isOpen) return null

  const handleThumbnailGenerated = (dataUrl: string) => {
    setThumbnailUrl(dataUrl)
  }

  const downloadThumbnail = () => {
    if (!thumbnailUrl) return

    const link = document.createElement("a")
    link.href = thumbnailUrl
    link.download = `quote-thumbnail-${author.replace(/\s+/g, "-").toLowerCase()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyThumbnail = async () => {
    if (!thumbnailUrl) return

    try {
      // Convert data URL to blob
      const response = await fetch(thumbnailUrl)
      const blob = await response.blob()

      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])

      setCopyStatus("copied")

      // Reset status after 2 seconds
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setCopyStatus("idle")
      }, 2000)
    } catch (error) {
      console.error("Failed to copy thumbnail:", error)
      alert("Could not copy thumbnail. Please try downloading instead.")
    }
  }

  // Determine if we're on a small screen
  const isSmallScreen = windowSize.width < 480

  // Calculate appropriate thumbnail size for the screen
  const thumbnailWidth = isSmallScreen ? Math.min(300, windowSize.width - 60) : 400
  const thumbnailHeight = Math.floor(thumbnailWidth * 0.75) // Maintain 4:3 aspect ratio

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: isSmallScreen ? "10px" : "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: isSmallScreen ? "16px" : "24px",
          maxWidth: "95%",
          maxHeight: "95%",
          overflow: "auto",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          style={{
            position: "absolute",
            top: isSmallScreen ? "8px" : "12px",
            right: isSmallScreen ? "8px" : "12px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#666",
            padding: isSmallScreen ? "4px" : "8px",
            // Ensure minimum touch target size
            minWidth: "44px",
            minHeight: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={isSmallScreen ? 20 : 24} />
        </button>

        <h2
          style={{
            margin: "0 0 16px 0",
            color: "#333",
            fontSize: isSmallScreen ? "1.2rem" : "1.5rem",
            fontWeight: "bold",
            paddingRight: isSmallScreen ? "40px" : "0", // Make room for close button
          }}
        >
          Quote Thumbnail
        </h2>

        <div
          style={{
            marginBottom: isSmallScreen ? "16px" : "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ThumbnailGenerator
            quote={quote}
            author={author}
            backgroundColor={backgroundColor}
            textColor={textColor}
            fontFamily={fontFamily}
            onGenerated={handleThumbnailGenerated}
            width={thumbnailWidth}
            height={thumbnailHeight}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: isSmallScreen ? "8px" : "12px",
            marginTop: isSmallScreen ? "8px" : "10px",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: isSmallScreen ? "8px 12px" : "10px 16px",
              backgroundColor: "#f3f4f6",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              cursor: "pointer",
              color: "#374151",
              fontWeight: "medium",
              transition: "all 0.2s",
              fontSize: isSmallScreen ? "0.9rem" : "1rem",
              // Ensure minimum touch target size
              minHeight: "44px",
            }}
            onClick={copyThumbnail}
          >
            {copyStatus === "copied" ? (
              <>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={isSmallScreen ? 16 : 18} />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: isSmallScreen ? "8px 12px" : "10px 16px",
              backgroundColor: "#4f46e5",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              color: "white",
              fontWeight: "medium",
              transition: "all 0.2s",
              fontSize: isSmallScreen ? "0.9rem" : "1rem",
              // Ensure minimum touch target size
              minHeight: "44px",
            }}
            onClick={downloadThumbnail}
          >
            <Download size={isSmallScreen ? 16 : 18} />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  )
}
