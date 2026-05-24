import fs from "fs"
import path from "path"

const draftsDir = path.join(process.cwd(), "content/drafts")
const postsDir = path.join(process.cwd(), "content/posts")

if (!fs.existsSync(draftsDir)) {
  fs.mkdirSync(draftsDir, { recursive: true })
}

const files = fs.readdirSync(draftsDir).filter((f) => f.endsWith(".txt"))

if (files.length === 0) {
  console.log("content/drafts/ 目录下没有 .txt 文件")
  process.exit(0)
}

/** 从标题自动生成 ASCII slug */
function generateSlug(title: string): string {
  // 常见中文词 → 英文映射
  const mappings: Record<string, string> = {
    "项目总结": "project-summary",
    "示例文章": "sample-post",
    "教程": "tutorial",
    "指南": "guide",
    "入门": "getting-started",
    "部署": "deployment",
    "配置": "configuration",
    "安装": "installation",
    "使用": "usage",
    "介绍": "introduction",
    "你好世界": "hello-world",
  }

  // 尝试匹配完整映射
  for (const [cn, en] of Object.entries(mappings)) {
    if (title.includes(cn)) {
      return en
    }
  }

  // 回退：提取 ASCII 字符，转小写，空格变连字符
  const ascii = title
    .replace(/[^\x00-\x7F]+/g, "") // 移除非 ASCII
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")

  return ascii || `post-${Date.now()}`
}

for (const file of files) {
  const content = fs.readFileSync(path.join(draftsDir, file), "utf8")
  const originalSlug = file.replace(/\.txt$/, "")

  // 解析格式：
  // 标题: xxx
  // slug: xxx (可选)
  // 日期: 2026-05-23
  // 标签: 标签1, 标签2
  // 分类: xxx
  // 摘要: xxx
  // ---
  // 正文
  const lines = content.split("\n")
  const meta: Record<string, string> = {}
  let bodyStart = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line === "---" || line === "") {
      bodyStart = i + 1
      break
    }
    const match = line.match(/^(标题|slug|日期|标签|分类|摘要)\s*[:：]\s*(.+)$/)
    if (match) {
      meta[match[1]] = match[2].trim()
    }
  }

  const title = meta["标题"] || originalSlug
  const slug = meta["slug"] || generateSlug(title)
  const date = meta["日期"] || new Date().toISOString().split("T")[0]
  const tags = meta["标签"]
    ? meta["标签"].split(/[,，]/).map((t) => t.trim())
    : []
  const category = meta["分类"] || "未分类"
  const summary = meta["摘要"] || ""

  const body = lines.slice(bodyStart).join("\n").trim()

  const mdx = `---
title: "${title}"
date: "${date}"
tags: [${tags.map((t) => `"${t}"`).join(", ")}]
category: "${category}"
summary: "${summary}"
---

${body}
`

  const mdxPath = path.join(postsDir, `${slug}.mdx`)
  fs.writeFileSync(mdxPath, mdx, "utf8")
  console.log(`已转换: ${file} → posts/${slug}.mdx`)
}

console.log(`\n转换完成！共处理 ${files.length} 篇文章`)
console.log("运行 git add + commit + push 发布")
