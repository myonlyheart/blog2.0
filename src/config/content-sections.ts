import type { PostSection } from "@/types/post"

export interface ContentSectionConfig {
  id: PostSection
  label: string
  eyebrow: string
  description: string
  href: string
  accent: string
}

export const contentSections: readonly ContentSectionConfig[] = [
  {
    id: "mechanical",
    label: "机械工作技能",
    eyebrow: "Mechanical Practice",
    description: "机械设计、制图、建模、装配与工程经验的可复用方法。",
    href: "/sections/mechanical",
    accent: "from-sky-500/15 via-cyan-400/5 to-transparent",
  },
  {
    id: "thinking",
    label: "社会思考",
    eyebrow: "Social Notes",
    description: "从日常现象出发，记录关于社会、文化与个体经验的长期思考。",
    href: "/sections/thinking",
    accent: "from-amber-500/15 via-orange-400/5 to-transparent",
  },
  {
    id: "projects",
    label: "具体项目",
    eyebrow: "Selected Work",
    description: "完整项目记录，以及简历、CAD、SolidWorks 和代码文件下载。",
    href: "/projects",
    accent: "from-violet-500/15 via-fuchsia-400/5 to-transparent",
  },
] as const

export function getContentSection(id: string): ContentSectionConfig | undefined {
  return contentSections.find((section) => section.id === id)
}
