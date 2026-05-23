import Link from "next/link"
import { getArchivePosts } from "@/lib/posts"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "归档",
  description: "文章归档",
}

export default function ArchivePage() {
  const archives = getArchivePosts()

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">归档</h1>

      {archives.map(({ year, posts }) => (
        <section key={year} className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">{year}</h2>
          <ul className="space-y-2">
            {posts.map((post) => (
              <li key={post.slug} className="flex items-center gap-4">
                <time className="shrink-0 text-sm text-muted-foreground">{post.date}</time>
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
