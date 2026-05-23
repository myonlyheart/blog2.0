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

for (const file of files) {
  const content = fs.readFileSync(path.join(draftsDir, file), "utf8")
  const slug = file.replace(/\.txt$/, "")

  // 解析格式：
  // 标题: xxx
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
    const match = line.match(/^(标题|日期|标签|分类|摘要)\s*[:：]\s*(.+)$/)
    if (match) {
      meta[match[1]] = match[2].trim()
    }
  }

  const title = meta["标题"] || slug
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
