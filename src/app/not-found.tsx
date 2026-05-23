import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-32 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        页面不存在或已被移除
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        返回首页
      </Link>
    </div>
  )
}
