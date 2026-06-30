import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { contentSections, getContentSection } from "@/config/content-sections"
import { getPostsBySection } from "@/lib/posts"
import { PostCard } from "@/components/post-card"
export function generateStaticParams() {
  return contentSections.filter((s) => s.id !== "projects").map((s) => ({ section: s.id }))
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>
}): Promise<Metadata> {
  const { section: id } = await params
  const section = getContentSection(id)
  return section && section.id !== "projects"
    ? { title: section.label, description: section.description }
    : {}
}
export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section: id } = await params
  const section = getContentSection(id)
  if (!section || section.id === "projects") notFound()
  const posts = getPostsBySection(section.id)
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Link>
      <header
        className={`relative mt-8 overflow-hidden rounded-xl border bg-gradient-to-br p-8 sm:p-12 ${section.accent}`}
      >
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
          {section.eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-semibold">{section.label}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
          {section.description}
        </p>
      </header>
      <section className="mt-12">
        <div className="mb-6 flex justify-between">
          <h2 className="text-xl font-semibold">全部内容</h2>
          <span className="text-sm text-muted-foreground">{posts.length} 篇</span>
        </div>
        {posts.length ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
            这个分区正在整理中。
          </div>
        )}
      </section>
    </div>
  )
}
