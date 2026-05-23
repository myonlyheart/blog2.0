import { getAllPosts } from "@/lib/posts"
import { PostCard } from "@/components/post-card"
import { Pagination } from "@/components/pagination"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "文章",
  description: "所有博客文章",
}

const POSTS_PER_PAGE = 10

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function PostsPage({ searchParams }: Props) {
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page || "1", 10))
  const posts = getAllPosts()
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">所有文章</h1>
      <div className="space-y-6">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="text-muted-foreground">暂无文章</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}
