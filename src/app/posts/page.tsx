import { getAllPosts } from "@/lib/posts"
import { PostCard } from "@/components/post-card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "文章",
  description: "所有博客文章",
}

export default function PostsPage() {
  const posts = getAllPosts()

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">所有文章</h1>
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="text-muted-foreground">暂无文章</p>
        )}
      </div>
    </div>
  )
}
