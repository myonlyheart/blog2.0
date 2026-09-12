# 当前下载架构审计

## 当前下载页面文件

`src/app/projects/page.tsx`，路由为 `/projects`，下载区域锚点为 `#downloads`。

## 当前卡片组件

下载卡片直接位于 `src/app/projects/page.tsx`。本次保留了原卡片结构、图标、分类标签、响应式网格和“下载文件 →”交互，没有拆分或重做 UI。

## 当前下载数据

`content/resources.json` 是统一资源清单；`src/lib/resources.ts` 负责读取、校验、排序和生成下载 URL；`src/types/resource.ts` 定义资源字段。

## 当前文件存储位置

现有两个资源仍保留阿里云 OSS `publicUrl` 作为迁移回退。清单中的 `objectKey` 保持不变，可在 R2 中复用原路径：

- `resources/2026/007dd5ce-9e60-4c05-8f7e-7c707aa4a704--.zip`
- `resources/2026/c7f3d364-e4f5-445e-836e-8c422c751455--.zip`

R2 Bucket 为 `myonlyheart-downloads`，Custom Domain 为 `downloads.myonlyheart.xyz`。

## 当前下载 URL 生成方式

`src/config/downloads.ts` 集中定义公开下载域名。默认仍使用旧 `publicUrl`；当 R2 对象上传并验证后，在 Vercel 设置：

```text
NEXT_PUBLIC_DOWNLOAD_USE_R2=true
NEXT_PUBLIC_DOWNLOAD_BASE_URL=https://downloads.myonlyheart.xyz
```

之后按钮直接生成 R2 URL，不经过 Vercel API Route。

## post.myonlyheart.xyz

线上页面是独立的 Next.js「MyOnlyHeart 文章发布台」，并非公开的旧 `myonlyheart/blog` 静态仓库。源码已从现有 Vercel 部署恢复；资源上传和删除改用 R2 的 S3 兼容 API，文章发布逻辑保持不变。新资源会同时写入 `objectKey` 和指向下载域名的 `publicUrl`。

## 需要修改的文件

- `src/types/resource.ts`
- `src/lib/resources.ts`
- `src/config/downloads.ts`
- `src/app/projects/page.tsx`
- `post.myonlyheart.xyz` 发布台的资源上传、删除、界面提示和服务端环境变量

## 不需要修改的文件

- Header、Footer、主题与全局样式
- 首页、文章系统、RSS、登录与其他业务路由
- Vercel 文件传输或 API Route（禁止用其代理大文件）
- Cloudflare Pages、Workers、数据库和 `.com` 域名
