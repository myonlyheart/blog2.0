export interface PostMeta {
  title: string
  date: string
  tags: string[]
  category: string
  section: PostSection
  summary: string
  cover?: string
  slug: string
  readingTime: string
  wordCount: number
}

export type PostSection = "mechanical" | "thinking" | "projects"

export interface Post extends PostMeta {
  content: string
}

export interface TagInfo {
  name: string
  count: number
}

export interface CategoryInfo {
  name: string
  count: number
  posts: PostMeta[]
}
