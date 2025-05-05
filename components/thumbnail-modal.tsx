"use client"

import { useState, useRef } from "react"
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
  const timeoutRef = useRef<NodeJS.Timeout>()

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
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "90%",
          maxHeight: "90%",
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
            top: "12px",
            right: "12px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#666",
          }}
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <h2
          style={{
            margin: "0 0 20px 0",
            color: "#333",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Quote Thumbnail
        </h2>

        <div
          style={{
            marginBottom: "20px",
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
            width={400}
            height={300}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "10px",
          }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              backgroundColor: "#f3f4f6",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              cursor: "pointer",
              color: "#374151",
              fontWeight: "medium",
              transition: "all 0.2s",
            }}
            onClick={copyThumbnail}
          >
            {copyStatus === "copied" ? (
              <>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              backgroundColor: "#4f46e5",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              color: "white",
              fontWeight: "medium",
              transition: "all 0.2s",
            }}
            onClick={downloadThumbnail}
          >
            <Download size={18} />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  )
}
