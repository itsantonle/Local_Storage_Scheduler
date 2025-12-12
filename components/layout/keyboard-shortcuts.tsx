"use client"

/**
 * Keyboard Shortcuts Component
 * Displays a floating button that shows available keyboard shortcuts
 * and handles keyboard navigation
 */

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Keyboard } from "lucide-react"

interface KeyboardShortcutsProps {
  onTabChange: (tab: string) => void
}

export function KeyboardShortcuts({ onTabChange }: KeyboardShortcutsProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // Ctrl/Cmd + K to open shortcuts dialog
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setOpen(true)
        return
      }

      // Alt + number keys for tab switching
      if (e.altKey) {
        switch (e.key) {
          case "1":
            e.preventDefault()
            onTabChange("schedule")
            break
          case "2":
            e.preventDefault()
            onTabChange("subjects")
            break
          case "3":
            e.preventDefault()
            onTabChange("guide")
            break
          case "4":
            e.preventDefault()
            onTabChange("settings")
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [onTabChange])

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-card border-primary/30 hover:border-primary"
            aria-label="Keyboard shortcuts"
          >
            <Keyboard className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
            <DialogDescription>Quick shortcuts to navigate the app faster</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h4 className="font-medium mb-2 text-sm text-muted-foreground">Navigation</h4>
              <div className="space-y-2">
                <ShortcutItem shortcut="Alt + 1" description="Go to Schedule tab" />
                <ShortcutItem shortcut="Alt + 2" description="Go to Subjects tab" />
                <ShortcutItem shortcut="Alt + 3" description="Go to Guide tab" />
                <ShortcutItem shortcut="Alt + 4" description="Go to Settings tab" />
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-sm text-muted-foreground">General</h4>
              <div className="space-y-2">
                <ShortcutItem shortcut={isMac() ? "⌘ + K" : "Ctrl + K"} description="Open this dialog" />
                <ShortcutItem shortcut="Esc" description="Close dialogs" />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function ShortcutItem({ shortcut, description }: { shortcut: string; description: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">{description}</span>
      <kbd className="px-2 py-1 text-xs font-semibold bg-muted text-muted-foreground rounded border border-border">
        {shortcut}
      </kbd>
    </div>
  )
}

function isMac() {
  if (typeof window === "undefined") return false
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform)
}
