const DEFAULT_DOWNLOAD_BASE_URL = "https://downloads.myonlyheart.xyz"

export const downloadConfig = {
  baseUrl: (process.env.NEXT_PUBLIC_DOWNLOAD_BASE_URL || DEFAULT_DOWNLOAD_BASE_URL).replace(
    /\/+$/,
    "",
  ),
  bucketName: "myonlyheart-downloads",
  useR2: process.env.NEXT_PUBLIC_DOWNLOAD_USE_R2 === "true",
} as const

export function buildDownloadUrl(objectKey: string): string {
  const encodedKey = objectKey
    .replace(/^\/+/, "")
    .split("/")
    .map(encodeURIComponent)
    .join("/")
  return `${downloadConfig.baseUrl}/${encodedKey}`
}
