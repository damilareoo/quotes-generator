// Typography styles
const typographyStyles = [
  // Modern sans
  {
    fontFamily: "Geist, sans-serif",
    fontSize: "2rem",
    fontWeight: "normal",
    letterSpacing: "normal",
    lineHeight: "1.5",
  },
  // Bold statement
  {
    fontFamily: "Geist, sans-serif",
    fontSize: "2.5rem",
    fontWeight: "bold",
    letterSpacing: "-0.05em",
    lineHeight: "1.2",
  },
  // Elegant serif
  {
    fontFamily: "Georgia, serif",
    fontSize: "2.2rem",
    fontWeight: "normal",
    letterSpacing: "0.02em",
    lineHeight: "1.6",
  },
  // Minimal mono
  {
    fontFamily: "GeistMono-Regular, monospace",
    fontSize: "1.8rem",
    fontWeight: "normal",
    letterSpacing: "0.05em",
    lineHeight: "1.7",
  },
  // Light and airy
  {
    fontFamily: "Inter, sans-serif",
    fontSize: "2.4rem",
    fontWeight: "200",
    letterSpacing: "0.01em",
    lineHeight: "1.4",
  },
  // Condensed bold
  {
    fontFamily: "Geist, sans-serif",
    fontSize: "2.2rem",
    fontWeight: "800",
    letterSpacing: "-0.03em",
    lineHeight: "1.3",
  },
  // Classic book
  { fontFamily: "Georgia, serif", fontSize: "2rem", fontWeight: "normal", letterSpacing: "normal", lineHeight: "1.8" },
  // Technical mono
  {
    fontFamily: "GeistMono-Regular, monospace",
    fontSize: "1.6rem",
    fontWeight: "400",
    letterSpacing: "0",
    lineHeight: "1.6",
  },
  // Dramatic display
  { fontFamily: "Geist, sans-serif", fontSize: "3rem", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.1" },
  // Subtle light
  {
    fontFamily: "Inter, sans-serif",
    fontSize: "1.8rem",
    fontWeight: "300",
    letterSpacing: "0.03em",
    lineHeight: "1.6",
  },
  // Headline
  { fontFamily: "Geist, sans-serif", fontSize: "3.5rem", fontWeight: "900", letterSpacing: "-0.05em", lineHeight: "1" },
  // Elegant thin
  {
    fontFamily: "Inter, sans-serif",
    fontSize: "2.8rem",
    fontWeight: "100",
    letterSpacing: "0.02em",
    lineHeight: "1.3",
  },
  // Vintage serif
  {
    fontFamily: "Georgia, serif",
    fontSize: "2.4rem",
    fontWeight: "normal",
    letterSpacing: "0.01em",
    lineHeight: "1.5",
  },
  // Compact mono
  {
    fontFamily: "GeistMono-Regular, monospace",
    fontSize: "1.4rem",
    fontWeight: "normal",
    letterSpacing: "0.1em",
    lineHeight: "1.8",
  },
  // Modern condensed
  {
    fontFamily: "Geist, sans-serif",
    fontSize: "2.6rem",
    fontWeight: "600",
    letterSpacing: "-0.04em",
    lineHeight: "1.2",
  },
  // Poetic serif
  {
    fontFamily: "Georgia, serif",
    fontSize: "2.2rem",
    fontWeight: "normal",
    letterSpacing: "0.03em",
    lineHeight: "1.7",
  },
  // Futuristic sans
  {
    fontFamily: "Inter, sans-serif",
    fontSize: "2.4rem",
    fontWeight: "500",
    letterSpacing: "0.04em",
    lineHeight: "1.4",
  },
  // Monumental
  { fontFamily: "Geist, sans-serif", fontSize: "4rem", fontWeight: "800", letterSpacing: "-0.03em", lineHeight: "1" },
  // Whisper thin
  {
    fontFamily: "Inter, sans-serif",
    fontSize: "2.2rem",
    fontWeight: "100",
    letterSpacing: "0.05em",
    lineHeight: "1.6",
  },
  // Code display
  {
    fontFamily: "GeistMono-Regular, monospace",
    fontSize: "1.8rem",
    fontWeight: "400",
    letterSpacing: "0.02em",
    lineHeight: "1.5",
  },
]

export function generateTypography() {
  const randomIndex = Math.floor(Math.random() * typographyStyles.length)
  return typographyStyles[randomIndex]
}
