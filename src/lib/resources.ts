import fs from "node:fs"
import path from "node:path"
import type { ProjectResource, ResourceManifest } from "@/types/resource"

const manifestPath = path.join(process.cwd(), "content/resources.json")

export function getResources(): ProjectResource[] {
  if (!fs.existsSync(manifestPath)) return []

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8")) as ResourceManifest
    if (manifest.version !== 1 || !Array.isArray(manifest.resources)) return []
    return manifest.resources
      .filter((resource) => Boolean(resource.id && resource.title && resource.publicUrl))
      .sort((left, right) => right.uploadedAt.localeCompare(left.uploadedAt))
  } catch {
    return []
  }
}

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "未知大小"
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / 1024 / 1024).toFixed(bytes >= 100 * 1024 * 1024 ? 0 : 1)} MB`
}
