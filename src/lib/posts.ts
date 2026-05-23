import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import type { Post, PostMeta, TagInfo, CategoryInfo } from "@/types/post"

const postsDirectory = path.join(process.cwd(), "content/posts")

function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }
}

export function getAllPosts(): PostMeta[] {
  ensurePostsDirectory()

  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "")
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)
    const stats = readingTime(content)
    const wordCount = content.split(/\s+/).length

    return {
      title: data.title || slug,
      date: data.date || new Date().toISOString().split("T")[0],
      tags: data.tags || [],
      category: data.category || "未分类",
      summary: data.summary || "",
      cover: data.cover,
      slug,
      readingTime: stats.text,
      wordCount,
    } satisfies PostMeta
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  ensurePostsDirectory()

  const filePath = path.join(postsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)
  const stats = readingTime(content)
  const wordCount = content.split(/\s+/).length

  return {
    title: data.title || slug,
    date: data.date || new Date().toISOString().split("T")[0],
    tags: data.tags || [],
    category: data.category || "未分类",
    summary: data.summary || "",
    cover: data.cover,
    slug,
    readingTime: stats.text,
    wordCount,
    content,
  } satisfies Post
}

export function getAllSlugs(): string[] {
  ensurePostsDirectory()
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null
  next: PostMeta | null
} {
  const posts = getAllPosts()
  const currentIndex = posts.findIndex((p) => p.slug === slug)

  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  }
}

export function getAllTags(): TagInfo[] {
  const posts = getAllPosts()
  const tagMap = new Map<string, number>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
    })
  })

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag))
}

export function getAllCategories(): CategoryInfo[] {
  const posts = getAllPosts()
  const categoryMap = new Map<string, PostMeta[]>()

  posts.forEach((post) => {
    const existing = categoryMap.get(post.category) || []
    categoryMap.set(post.category, [...existing, post])
  })

  return Array.from(categoryMap.entries())
    .map(([name, posts]) => ({ name, count: posts.length, posts }))
    .sort((a, b) => b.count - a.count)
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category)
}

export function getArchivePosts(): { year: number; posts: PostMeta[] }[] {
  const posts = getAllPosts()
  const yearMap = new Map<number, PostMeta[]>()

  posts.forEach((post) => {
    const year = new Date(post.date).getFullYear()
    const existing = yearMap.get(year) || []
    yearMap.set(year, [...existing, post])
  })

  return Array.from(yearMap.entries())
    .map(([year, posts]) => ({ year, posts }))
    .sort((a, b) => b.year - a.year)
}
