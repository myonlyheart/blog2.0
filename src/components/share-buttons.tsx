"use client"

import { Share2, LinkIcon, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank"
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">分享：</span>
      <Button variant="ghost" size="icon" onClick={shareTwitter} aria-label="分享到 Twitter">
        <Share2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={copyLink} aria-label="复制链接">
        {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
      </Button>
    </div>
  )
}
