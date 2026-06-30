export type ResourceKind = "resume" | "cad" | "solidworks" | "code" | "document" | "other"

export interface ProjectResource {
  id: string
  title: string
  description: string
  kind: ResourceKind
  project: string
  fileName: string
  extension: string
  size: number
  version?: string
  publicUrl: string
  uploadedAt: string
}

export interface ResourceManifest {
  version: 1
  resources: ProjectResource[]
}
