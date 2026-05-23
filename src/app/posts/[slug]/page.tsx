import { notFound } from "next/navigation"
import Link from "next/link"
import { getPostBySlug, getAllSlugs, getAdjacentPosts } from "@/lib/posts"
import { renderMDX } from "@/lib/mdx"
import { TOC } from "@/components/toc"
import { ReadingProgress } from "@/components/reading-progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { content, headings } = await renderMDX(post.content)
  const { prev, next } = getAdjacentPosts(slug)

  return (
    <>
      <ReadingProgress />
      <div className="container mx-auto max-w-6xl px-4 py-16">
      <div className="flex gap-12">
        <article className="min-w-0 flex-1">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.date}>{post.date}</time>
              <span>{post.readingTime}</span>
              <span>{post.wordCount} 字</span>
              <span className="rounded-md bg-secondary px-2 py-1">{post.category}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags#${tag}`}
                  className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground transition-colors hover:bg-secondary/80"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none">{content}</div>

          <nav className="mt-16 flex justify-between border-t border-border pt-8">
            {prev ? (
              <Link
                href={`/posts/${prev.slug}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>{prev.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/posts/${next.slug}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>{next.title}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>

        <aside className="hidden w-56 shrink-0 xl:block">
          <TOC headings={headings} />
        </aside>
      </div>
    </div>
    </>
  )
}
