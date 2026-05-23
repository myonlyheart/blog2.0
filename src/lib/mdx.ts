import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeKatex from "rehype-katex"

interface Heading {
  id: string
  text: string
  level: number
}

function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm
  const headings: Heading[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].replace(/[`*_~\[\]]/g, "")
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w一-鿿-]/g, "")
    headings.push({ id, text, level })
  }

  return headings
}

export async function renderMDX(content: string) {
  const headings = extractHeadings(content)

  const { content: compiledContent } = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["anchor"],
              },
            },
          ],
          [
            rehypePrettyCode,
            {
              theme: {
                light: "github-light",
                dark: "github-dark-dimmed",
              },
              keepBackground: true,
            },
          ],
          rehypeKatex,
        ],
      },
    },
  })

  return { content: compiledContent, headings }
}
