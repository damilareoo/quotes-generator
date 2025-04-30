import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Revalidate the OG image path
    revalidatePath("/api/og")

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    return NextResponse.json({ revalidated: false, message: "Error revalidating", error }, { status: 500 })
  }
}
