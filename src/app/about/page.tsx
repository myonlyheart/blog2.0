import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "关于",
  description: "关于我",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">关于</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p>欢迎来到 MyOnlyHeart！</p>
        <p>这是一个使用 Next.js 构建的个人博客，记录技术、思考与生活。</p>
        <h2>技术栈</h2>
        <ul>
          <li>Next.js 15 + TypeScript</li>
          <li>Tailwind CSS + shadcn/ui</li>
          <li>MDX 内容系统</li>
          <li>Vercel 部署</li>
        </ul>
        <h2>联系</h2>
        <p>可以通过 GitHub 联系我。</p>
      </div>
    </div>
  )
}
