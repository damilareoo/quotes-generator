// Sample Spotify tracks from a hypothetical playlist
// In a real app, you would fetch these from the Spotify API
const tracks = [
  { id: "1", url: "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT" },
  { id: "2", url: "https://open.spotify.com/track/0HUTL8i4y4MiGCPB5fQHio" },
  { id: "3", url: "https://open.spotify.com/track/5qHagClDJLW0SIxpRgbUhl" },
  { id: "4", url: "https://open.spotify.com/track/6DCZcSspjsKoFjzjrWoCdn" },
  { id: "5", url: "https://open.spotify.com/track/0ct6r3EGTcMLPtrXHDvVjc" },
  { id: "6", url: "https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg" },
  { id: "7", url: "https://open.spotify.com/track/6SpLc7EXZIPpy0sVko0aoU" },
  { id: "8", url: "https://open.spotify.com/track/0pqnGHJpmpxLKifKRmU6WP" },
  { id: "9", url: "https://open.spotify.com/track/0V3wPSX9ygBnCm8psDIegu" },
  { id: "10", url: "https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3" },
]

export async function getRandomTrack() {
  // In a real app, you would fetch from the Spotify API
  // For now, we'll use our local collection
  const randomIndex = Math.floor(Math.random() * tracks.length)
  return tracks[randomIndex]
}
