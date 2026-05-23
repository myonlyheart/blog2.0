import Link from "next/link"
import { getAllCategories } from "@/lib/posts"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "分类",
  description: "文章分类",
}

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">分类</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.name}
            className="rounded-lg border border-border p-6 transition-colors hover:bg-accent/50"
          >
            <h2 className="text-lg font-semibold">{category.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{category.count} 篇文章</p>
            <ul className="mt-4 space-y-2">
              {category.posts.slice(0, 3).map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
