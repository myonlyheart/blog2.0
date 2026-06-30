import { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"
import { getAllPosts } from "@/lib/posts"
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))
  const paths = [
    "",
    "/posts",
    "/sections/mechanical",
    "/sections/thinking",
    "/projects",
    "/categories",
    "/tags",
    "/archive",
    "/about",
  ]
  return [
    ...paths.map((pathname, index) => ({
      url: `${siteConfig.url}${pathname}`,
      lastModified: new Date(),
      changeFrequency: (index < 2 ? "daily" : "weekly") as "daily" | "weekly",
      priority: index === 0 ? 1 : pathname === "/projects" ? 0.9 : 0.6,
    })),
    ...postEntries,
  ]
}
