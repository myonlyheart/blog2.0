# Cloudflare R2 下载迁移状态与上线步骤

## Cloudflare 已完成

- [x] 创建 Bucket：`myonlyheart-downloads`（Standard，APAC）。
- [x] 绑定 Custom Domain：`downloads.myonlyheart.xyz`。
- [x] 启用自定义域名公开访问，最低 TLS 版本为 1.2。
- [x] 未启用 `r2.dev` 作为生产地址。
- [x] 未创建 Worker 或数据库。
- [x] CORS 仅允许 `post.myonlyheart.xyz` 以 `PUT` 上传对象。
- [x] 为发布台创建只作用于 `myonlyheart-downloads` 的 Object Read & Write 凭证。
- [x] 通过 `migration/r2-health.txt` 验证自定义域名返回 HTTP 200。

## 文件迁移

请把原始发布包上传到以下精确 Object Key：

```text
resources/2026/007dd5ce-9e60-4c05-8f7e-7c707aa4a704--.zip
resources/2026/c7f3d364-e4f5-445e-836e-8c422c751455--.zip
```

对应测试 URL：

```text
https://downloads.myonlyheart.xyz/resources/2026/007dd5ce-9e60-4c05-8f7e-7c707aa4a704--.zip
https://downloads.myonlyheart.xyz/resources/2026/c7f3d364-e4f5-445e-836e-8c422c751455--.zip
```

当前旧 OSS URL 对自动迁移请求返回 HTTP 403，本机和已连接 Google Drive 中也没有找到这两个 ZIP。因此旧 `publicUrl` 仍保留为回退，没有删除旧资源，也没有上传伪造文件。

## 启用 R2 下载

1. 上传两个原始 ZIP。
2. 在浏览器中直接访问上面的 R2 URL，确认文件名与大小正确。
3. 在 Vercel 的 `blog2.0` 项目中设置：

   ```text
   NEXT_PUBLIC_DOWNLOAD_USE_R2=true
   NEXT_PUBLIC_DOWNLOAD_BASE_URL=https://downloads.myonlyheart.xyz
   ```

4. 重新部署。
5. 从 `https://blog.myonlyheart.xyz/projects#downloads` 点击“下载文件 →”测试。
6. 在手机端和桌面端各测试一次。
7. 使用 200 MB 以上的版本化文件验证完整下载。

## 校验与备份

正式发布前在 Windows 运行：

```powershell
Get-FileHash ".\mechanical-arm.zip" -Algorithm SHA256
Get-FileHash ".\barrett.zip" -Algorithm SHA256
```

把同一发布包备份到 Google Drive：

```text
MyOnlyHeart/Releases/Mechanical-Arm/v1/
MyOnlyHeart/Releases/Barrett/v1/
```

Google Drive 仅作为长期备份，不作为公开 CDN。

## post.myonlyheart.xyz 同步状态

发布台已改为：

- 浏览器使用 15 分钟有效的预签名 URL 直传 R2，文件不经过 Vercel 函数。
- `objectKey`：继续使用随机 UUID 对象路径，避免文件名冲突。
- `publicUrl`：直接指向 `downloads.myonlyheart.xyz`，新资源无需等待全局开关即可下载。
- `fileName`、`size`、`extension`、`uploadedAt`：继续兼容现有博客资源清单。
- 下架新资源时同步删除 R2 对象并更新 GitHub 清单。

发布台不得把 Cloudflare Token、R2 Access Key 或 Secret Key 写入浏览器环境变量；上传凭据只能保存在受保护的服务端环境变量中。
