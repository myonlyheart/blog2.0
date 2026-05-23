import Link from "next/link"
import type { PostMeta } from "@/types/post"

interface PostCardProps {
  post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-lg border border-border p-6 transition-colors hover:bg-accent/50">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={post.date}>{post.date}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h2 className="mt-2 text-xl font-semibold tracking-tight group-hover:text-primary">
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-muted-foreground">{post.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  )
}
