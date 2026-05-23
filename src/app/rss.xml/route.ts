import { getAllPosts } from "@/lib/posts"
import { generateRSSFeed } from "@/lib/rss"

export async function GET() {
  const posts = getAllPosts()
  const rss = generateRSSFeed(posts)

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
