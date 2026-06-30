export const siteConfig = {
  name: "MyOnlyHeart",
  description: "机械工作技能、具体项目与社会思考的个人博客",
  url: "https://blog.myonlyheart.xyz",
  ogImage: "https://blog.myonlyheart.xyz/og.jpg",
  links: { github: "https://github.com/myonlyheart" },
  giscus: { repo: "myonlyheart/blog2.0", repoId: "", category: "General", categoryId: "" },
  navItems: [
    { label: "首页", href: "/" },
    { label: "机械技能", href: "/sections/mechanical" },
    { label: "社会思考", href: "/sections/thinking" },
    { label: "项目与下载", href: "/projects" },
    { label: "文章", href: "/posts" },
    { label: "关于", href: "/about" },
  ],
} as const
export type SiteConfig = typeof siteConfig
