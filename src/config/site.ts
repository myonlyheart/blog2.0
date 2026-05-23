export const siteConfig = {
  name: "MyOnlyHeart",
  description: "个人博客 - 技术、思考与生活",
  url: "https://myonlyheart.xyz",
  ogImage: "https://myonlyheart.xyz/og.jpg",
  links: {
    github: "https://github.com/myonlyheart",
  },
  navItems: [
    { label: "首页", href: "/" },
    { label: "文章", href: "/posts" },
    { label: "分类", href: "/categories" },
    { label: "标签", href: "/tags" },
    { label: "归档", href: "/archive" },
    { label: "友链", href: "/links" },
    { label: "关于", href: "/about" },
  ],
} as const

export type SiteConfig = typeof siteConfig
