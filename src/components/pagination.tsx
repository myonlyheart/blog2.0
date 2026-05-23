import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
}

export function Pagination({ currentPage, totalPages, basePath = "/posts" }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border transition-colors hover:bg-accent"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm transition-colors ${
            page === currentPage
              ? "bg-primary text-primary-foreground"
              : "border border-border hover:bg-accent"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border transition-colors hover:bg-accent"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  )
}
