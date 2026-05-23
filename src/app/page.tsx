import Link from "next/link"
import { siteConfig } from "@/config/site"
import { getAllPosts } from "@/lib/posts"
import { PostCard } from "@/components/post-card"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const posts = getAllPosts()
  const latestPosts = posts.slice(0, 6)

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center space-y-8 py-16 text-center">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="mx-auto max-w-[600px] text-lg leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            href="/posts"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            开始阅读
          </Link>
          <Link
            href="/about"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            关于我
          </Link>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">最新文章</h2>
            <Link
              href="/posts"
              className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              查看全部
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
