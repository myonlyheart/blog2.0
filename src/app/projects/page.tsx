import type { Metadata } from "next"
import { ArrowRight, Box, Code2, Download, FileText, Ruler } from "lucide-react"
import { getPostsBySection } from "@/lib/posts"
import { formatFileSize, getResources } from "@/lib/resources"
import { PostCard } from "@/components/post-card"
import type { ResourceKind } from "@/types/resource"
export const metadata: Metadata = {
  title: "项目与文件",
  description: "项目记录、个人简历与公开工程文件下载",
}
const labels: Record<ResourceKind, string> = {
  resume: "个人简历",
  cad: "CAD 图纸",
  solidworks: "SolidWorks",
  code: "代码",
  document: "文档",
  other: "其他",
}
const icons = {
  resume: FileText,
  cad: Ruler,
  solidworks: Box,
  code: Code2,
  document: FileText,
  other: Download,
} as const
export default function ProjectsPage() {
  const posts = getPostsBySection("projects"),
    resources = getResources(),
    resume = resources.find((r) => r.kind === "resume")
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <header className="grid gap-8 rounded-xl border bg-gradient-to-br from-violet-500/10 via-background to-sky-500/10 p-8 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12">
        <div>
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Selected work</p>
          <h1 className="mt-3 text-4xl font-semibold">项目与公开文件</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            实际项目、工作方法和可下载成果。SolidWorks 装配项目优先提供完整压缩包。
          </p>
        </div>
        {resume ? (
          <a
            href={resume.publicUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm text-primary-foreground"
          >
            <Download className="h-4 w-4" />
            下载最新简历
          </a>
        ) : (
          <span className="rounded-lg border bg-background/70 px-4 py-3 text-sm text-muted-foreground">
            简历上传后显示
          </span>
        )}
      </header>
      <section className="py-14">
        <div className="mb-7 flex justify-between">
          <h2 className="text-2xl font-semibold">项目记录</h2>
          <span className="text-sm text-muted-foreground">{posts.length} 篇</span>
        </div>
        {posts.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
            项目文章正在整理中。
          </div>
        )}
      </section>
      <section id="downloads" className="scroll-mt-24 border-t pt-14">
        <h2 className="text-2xl font-semibold">文件下载</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          支持 PDF、DWG、PY、SLDPRT、SLDASM、SLDDRW、STEP、STL 与 ZIP。
        </p>
        {resources.length ? (
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => {
              const Icon = icons[r.kind]
              return (
                <article key={r.id} className="flex flex-col rounded-xl border bg-card p-5">
                  <div className="flex justify-between">
                    <span className="rounded-lg bg-muted p-2">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-md border px-2 py-1 text-xs text-muted-foreground">
                      {labels[r.kind]}
                    </span>
                  </div>
                  <h3 className="mt-5 font-semibold">{r.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
                  <p className="mt-5 text-xs text-muted-foreground">
                    {r.extension.toUpperCase()} · {formatFileSize(r.size)}
                  </p>
                  <a
                    href={r.publicUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium"
                  >
                    下载文件 <ArrowRight className="h-4 w-4" />
                  </a>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="mt-7 rounded-xl border border-dashed p-10 text-center">
            <p className="font-medium">暂时还没有公开文件</p>
            <p className="mt-2 text-sm text-muted-foreground">在发布台上传后会自动出现在这里。</p>
          </div>
        )}
      </section>
    </div>
  )
}
