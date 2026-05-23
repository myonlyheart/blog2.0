import Link from "next/link"
import { siteConfig } from "@/config/site"

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:h-16 md:flex-row">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <Link
            href="/rss.xml"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            RSS
          </Link>
          <Link
            href="/sitemap.xml"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  )
}
