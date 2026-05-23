import Link from "next/link"
import { siteConfig } from "@/config/site"

export default function Home() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <section className="flex flex-col items-center justify-center space-y-8 py-16 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/posts"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            开始阅读
          </Link>
          <Link
            href="/about"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            关于我
          </Link>
        </div>
      </section>

      <section className="py-16">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">最新文章</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border p-6 transition-colors hover:bg-accent/50">
            <p className="text-sm text-muted-foreground">准备中...</p>
            <p className="mt-2 text-sm text-muted-foreground">
              文章即将在此展示
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
