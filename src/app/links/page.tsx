import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "友链",
  description: "友情链接",
}

interface FriendLink {
  name: string
  url: string
  description: string
}

const links: FriendLink[] = [
  // 在此添加友链
]

export default function LinksPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">友链</h1>
      <p className="mb-8 text-muted-foreground">欢迎交换友链！</p>

      {links.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border p-6 transition-colors hover:bg-accent/50"
            >
              <h2 className="font-semibold">{link.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{link.description}</p>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">暂无友链，欢迎交换！</p>
      )}
    </div>
  )
}
