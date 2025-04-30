// Color schemes inspired by coolors.co
// Each scheme ensures good contrast for accessibility
const colorSchemes = [
  // Elegant dark
  { background: "#121212", text: "#ffffff" },
  // Calm blue
  { background: "#f0f8ff", text: "#1a365d" },
  // Warm sunset
  { background: "#fffaf0", text: "#702459" },
  // Forest green
  { background: "#f0fff4", text: "#22543d" },
  // Purple dream
  { background: "#faf5ff", text: "#44337a" },
  // Coral reef
  { background: "#1a202c", text: "#f7fafc" },
  // Mint fresh
  { background: "#e6fffa", text: "#234e52" },
  // Golden hour
  { background: "#2d3748", text: "#fefcbf" },
  // Cherry blossom
  { background: "#fff5f7", text: "#702459" },
  // Ocean blue
  { background: "#ebf8ff", text: "#2a4365" },
  // Bold red
  { background: "#fff5f5", text: "#c53030" },
  // Emerald
  { background: "#064e3b", text: "#d1fae5" },
  // Lavender
  { background: "#5b21b6", text: "#ede9fe" },
  // Sunshine
  { background: "#fef3c7", text: "#92400e" },
  // Slate
  { background: "#f8fafc", text: "#334155" },
  // Midnight
  { background: "#030712", text: "#e5e7eb" },
  // Rose
  { background: "#4c0519", text: "#fecdd3" },
  // Teal
  { background: "#042f2e", text: "#99f6e4" },
  // Amber
  { background: "#78350f", text: "#fef3c7" },
  // Sky
  { background: "#0c4a6e", text: "#bae6fd" },
  // Lime
  { background: "#365314", text: "#d9f99d" },
  // Fuchsia
  { background: "#701a75", text: "#f5d0fe" },
  // Cyan
  { background: "#164e63", text: "#a5f3fc" },
  // Indigo
  { background: "#312e81", text: "#e0e7ff" },
  // Violet
  { background: "#4c1d95", text: "#ede9fe" },
]

export function generateColorScheme() {
  const randomIndex = Math.floor(Math.random() * colorSchemes.length)
  return colorSchemes[randomIndex]
}
