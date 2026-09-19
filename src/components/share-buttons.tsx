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
  const [message, setMessage] = useState("")
  const [showLink, setShowLink] = useState(false)

  const copyLink = async () => {
    setCopied(false)
    setShowLink(false)
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setMessage("链接已复制，可以粘贴给好友，也可以使用浏览器菜单分享。")
    } catch {
      setShowLink(true)
      setMessage("无法自动复制，请长按或选中下面的链接复制，也可以使用浏览器菜单分享。")
    }
  }

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">分享：</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={shareTwitter}
        aria-label="分享到 Twitter / X"
        title="分享到 Twitter / X"
      >
        <Share2 className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={copyLink} aria-label="复制链接">
        {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
      </Button>
      <p role="status" className={message ? "w-full text-sm text-muted-foreground" : "sr-only"}>
        {message}
      </p>
      {showLink && (
        <input
          type="text"
          readOnly
          value={url}
          aria-label="文章链接，可选中复制"
          onFocus={(event) => event.currentTarget.select()}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      )}
    </div>
  )
}
