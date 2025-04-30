// Different layout configurations
const layouts = [
  // Centered
  { alignment: "center", spacing: "normal", position: "center" },
  // Left aligned
  { alignment: "left", spacing: "wide", position: "center" },
  // Right aligned
  { alignment: "right", spacing: "wide", position: "center" },
  // Top centered
  { alignment: "center", spacing: "normal", position: "top" },
  // Bottom centered
  { alignment: "center", spacing: "normal", position: "bottom" },
  // Top left
  { alignment: "left", spacing: "wide", position: "top" },
  // Top right
  { alignment: "right", spacing: "wide", position: "top" },
  // Bottom left
  { alignment: "left", spacing: "wide", position: "bottom" },
  // Bottom right
  { alignment: "right", spacing: "wide", position: "bottom" },
  // Compact centered
  { alignment: "center", spacing: "compact", position: "center" },
  // Extra wide left
  { alignment: "left", spacing: "wide", position: "center" },
  // Extra wide right
  { alignment: "right", spacing: "wide", position: "center" },
  // Asymmetric top
  { alignment: "left", spacing: "normal", position: "top" },
  // Asymmetric bottom
  { alignment: "right", spacing: "normal", position: "bottom" },
  // Dramatic center
  { alignment: "center", spacing: "wide", position: "center" },
]

export function generateLayout() {
  const randomIndex = Math.floor(Math.random() * layouts.length)
  return layouts[randomIndex]
}
