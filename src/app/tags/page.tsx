import Link from "next/link"
import { getAllTags, getPostsByTag } from "@/lib/posts"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "标签",
  description: "文章标签",
}

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">标签</h1>

      <div className="mb-12 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <a
            key={tag.name}
            href={`#${tag.name}`}
            className="rounded-md bg-secondary px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            {tag.name} ({tag.count})
          </a>
        ))}
      </div>

      {tags.map((tag) => {
        const posts = getPostsByTag(tag.name)
        return (
          <section key={tag.name} id={tag.name} className="mb-12 scroll-mt-20">
            <h2 className="mb-4 text-xl font-semibold">{tag.name}</h2>
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
        )
      })}
    </div>
  )
}
