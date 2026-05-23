# MyOnlyHeart Blog

个人博客系统，基于 Next.js 15 + Tailwind CSS + shadcn/ui

## 项目结构

```
src/
├── app/          # App Router 页面
├── components/   # React 组件
├── config/       # 站点配置
├── content/      # MDX 内容（实际在 content/）
├── hooks/        # 自定义 Hooks
├── lib/          # 工具函数
├── styles/       # 样式文件
└── types/        # TypeScript 类型
```

## 内容管理

文章放在 `content/posts/` 目录，使用 MDX 格式：

```mdx
---
title: "标题"
date: "2026-05-23"
tags: ["标签1", "标签2"]
category: "分类"
summary: "摘要"
cover: "封面图URL（可选）"
---
```

## 命令

```bash
npm run dev      # 开发服务器
npm run build    # 构建
npm run start    # 生产服务器
npm run lint     # ESLint 检查
```

## 部署

1. 创建 GitHub 仓库并推送代码
2. 在 Vercel 导入项目
3. 在 Cloudflare 添加 DNS 记录指向 Vercel
4. 配置 Giscus 评论（需要 GitHub Discussions）

## 域名

- 主域名：myonlyheart.xyz
- DNS：Cloudflare
- 部署：Vercel
