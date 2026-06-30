import Link from "next/link"
import { ArrowRight, Cog, Download, FolderKanban, MessageCircleMore } from "lucide-react"
import { contentSections } from "@/config/content-sections"
import { siteConfig } from "@/config/site"
import { getAllPosts, getPostsBySection } from "@/lib/posts"
import { getResources } from "@/lib/resources"
import { PostCard } from "@/components/post-card"
const sectionIcons = {
  mechanical: Cog,
  thinking: MessageCircleMore,
  projects: FolderKanban,
} as const
export default function Home() {
  const posts = getAllPosts(),
    resources = getResources(),
    latestPosts = posts.slice(0, 6)
  return (
    <div className="container mx-auto max-w-6xl px-4 pb-20">
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-x-8 top-10 -z-10 h-72 rounded-full bg-gradient-to-r from-sky-500/10 via-violet-500/10 to-amber-500/10 blur-3xl" />
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-medium tracking-[0.24em] text-muted-foreground uppercase">
            Engineering · Projects · Notes
          </p>
          <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-6xl md:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground"
            >
              查看项目与文件 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/posts"
              className="inline-flex h-11 items-center rounded-lg border bg-background/70 px-5 text-sm font-medium backdrop-blur hover:bg-accent"
            >
              阅读全部文章
            </Link>
          </div>
        </div>
      </section>
      <section className="pb-16">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground">清晰分区，按兴趣进入</p>
            <h2 className="mt-1 text-2xl font-semibold">探索内容</h2>
          </div>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {posts.length} 篇文章 · {resources.length} 个公开文件
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-12">
          {contentSections.map((section, index) => {
            const Icon = sectionIcons[section.id]
            const count =
              getPostsBySection(section.id).length +
              (section.id === "projects" ? resources.length : 0)
            return (
              <Link
                key={section.id}
                href={section.href}
                className={`group relative overflow-hidden rounded-xl border bg-card p-7 transition-transform hover:-translate-y-0.5 ${index === 0 ? "md:col-span-7" : index === 1 ? "md:col-span-5" : "md:col-span-12"}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${section.accent}`} />
                <div className="relative flex min-h-48 flex-col justify-between gap-8">
                  <div className="flex justify-between">
                    <Icon className="h-6 w-6" />
                    <span className="rounded-md border bg-background/70 px-2.5 py-1 text-xs text-muted-foreground">
                      {count} 项内容
                    </span>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
                      {section.eyebrow}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">{section.label}</h3>
                    <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                      {section.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium">
                      进入分区 <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
      <section className="border-t py-16">
        <div className="mb-8 flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Recently published</p>
            <h2 className="mt-1 text-2xl font-semibold">最新文章</h2>
          </div>
          <Link href="/posts" className="flex items-center gap-1 text-sm text-muted-foreground">
            查看全部 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-5 rounded-xl border bg-muted/35 p-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Download className="h-4 w-4" />
            公开资源
          </div>
          <h2 className="mt-2 text-xl font-semibold">简历、工程图纸、SolidWorks 与代码</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            文件由发布台维护，上传后自动进入项目下载中心。
          </p>
        </div>
        <Link
          href="/projects#downloads"
          className="inline-flex h-10 items-center justify-center rounded-lg border bg-background px-4 text-sm font-medium"
        >
          前往下载中心
        </Link>
      </section>
    </div>
  )
}
