import { Feed } from "feed"
import { siteConfig } from "@/config/site"
import type { PostMeta } from "@/types/post"

export function generateRSSFeed(posts: PostMeta[]): string {
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "zh-CN",
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}`,
    updated: new Date(),
    feedLinks: {
      rss2: `${siteConfig.url}/rss.xml`,
    },
    author: {
      name: siteConfig.name,
      link: siteConfig.url,
    },
  })

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.url}/posts/${post.slug}`,
      link: `${siteConfig.url}/posts/${post.slug}`,
      description: post.summary,
      date: new Date(post.date),
      category: post.tags.map((tag) => ({ name: tag })),
    })
  })

  return feed.rss2()
}
