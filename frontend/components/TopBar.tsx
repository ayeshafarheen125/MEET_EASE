"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function TopBar() {
  const [percent, setPercent] = useState<number | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const locationKey = `${pathname}${searchParams}`

  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stallTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastLocation = useRef(locationKey)
  const active = useRef(false)

  const start = () => {
    if (active.current) return
    active.current = true
    if (progressTimer.current) clearInterval(progressTimer.current)
    if (hideTimer.current) clearTimeout(hideTimer.current)
    if (stallTimer.current) clearTimeout(stallTimer.current)

    setPercent(15)

    // Smoothly rise toward ~85% while the work is genuinely happening.
    // Only the route-change event (below) can complete it to 100%.
    progressTimer.current = setInterval(() => {
      setPercent((p) => (p === null ? 15 : Math.min(85, p + Math.max(2, Math.round((85 - p) / 12)))))
    }, 350)

    // Safety: if nothing ever commits (same-page link, blocked nav), release.
    stallTimer.current = setTimeout(() => {
      if (active.current) finish()
    }, 15000)
  }

  const finish = () => {
    if (!active.current) return
    active.current = false
    if (progressTimer.current) {
      clearInterval(progressTimer.current)
      progressTimer.current = null
    }
    if (stallTimer.current) {
      clearTimeout(stallTimer.current)
      stallTimer.current = null
    }
    setPercent(100)
    hideTimer.current = setTimeout(() => {
      setPercent(null)
    }, 220)
  }

  // Real completion event: the new route actually committed.
  useEffect(() => {
    if (lastLocation.current === locationKey) return
    lastLocation.current = locationKey
    finish()
  }, [locationKey])

  // Immediate kick-off: any internal navigation click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a")
      if (!target) return
      const href = target.getAttribute("href")
      if (!href) return
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
      )
        return
      start()
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  // Cleanup everything on unmount.
  useEffect(() => {
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current)
      if (hideTimer.current) clearTimeout(hideTimer.current)
      if (stallTimer.current) clearTimeout(stallTimer.current)
    }
  }, [])

  if (percent === null) return null

  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-0.5 bg-white/10" role="progressbar" aria-valuenow={percent}>
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-[width] duration-300 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}