import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import type { Post, PostMeta, PostSection, TagInfo, CategoryInfo } from "@/types/post"

const postsDirectory = path.join(process.cwd(), "content/posts")

function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }
}

const sectionKeywords: Record<PostSection, string[]> = {
  projects: [
    "项目",
    "project",
    "网站",
    "工作室",
    "studio",
    "agent",
    "代码",
    "coding",
    "github",
    "desktop",
    "app",
  ],
  mechanical: ["机械", "cad", "solidworks", "sw", "建模", "图纸", "工程", "齿轮", "装配"],
  thinking: ["社会", "思考", "哲学", "审美", "阶级", "现象", "文化", "生活"],
}

function normalizeSection(
  value: unknown,
  title: string,
  category: string,
  tags: string[],
): PostSection {
  if (value === "mechanical" || value === "thinking" || value === "projects") return value

  const haystack = [title, category, ...tags].join(" ").toLowerCase()
  for (const section of ["projects", "mechanical", "thinking"] as const) {
    if (sectionKeywords[section].some((keyword) => haystack.includes(keyword))) return section
  }

  return "thinking"
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

    const title = data.title || slug
    const category = data.category || "未分类"
    const tags = data.tags || []

    return {
      title,
      date: data.date || new Date().toISOString().split("T")[0],
      tags,
      category,
      section: normalizeSection(data.section, title, category, tags),
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

  const title = data.title || slug
  const category = data.category || "未分类"
  const tags = data.tags || []

  return {
    title,
    date: data.date || new Date().toISOString().split("T")[0],
    tags,
    category,
    section: normalizeSection(data.section, title, category, tags),
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

export function getPostsBySection(section: PostSection): PostMeta[] {
  return getAllPosts().filter((post) => post.section === section)
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
