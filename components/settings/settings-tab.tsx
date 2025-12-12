'use client'

/**
 * Settings Tab Component
 * Main container for app settings and accessibility options
 */

import { useApp } from '@/contexts/app-context'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { SettingsIcon, Eye, Zap } from 'lucide-react'
import { useEffect } from 'react'

export function SettingsTab() {
  const { settings, updateSettings } = useApp()

  // Apply font size to root element
  useEffect(() => {
    const root = document.documentElement
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'extra-large': '20px',
    }

    root.style.fontSize = fontSizeMap[settings.accessibility.fontSize]
  }, [settings.accessibility.fontSize])

  // Apply high contrast
  useEffect(() => {
    const root = document.documentElement
    if (settings.accessibility.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
  }, [settings.accessibility.highContrast])

  // Apply reduced motion
  useEffect(() => {
    const root = document.documentElement
    if (settings.accessibility.reducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }
  }, [settings.accessibility.reducedMotion])

  const updateAccessibility = (key: string, value: any) => {
    updateSettings({
      accessibility: {
        ...settings.accessibility,
        [key]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Accessibility
          </CardTitle>
          <CardDescription>
            Customize the display to suit your needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">Text Size</Label>
            <RadioGroup
              value={settings.accessibility.fontSize}
              onValueChange={(value) => updateAccessibility('fontSize', value)}
            >
              <div className="flex items-center space-x-3 py-2">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small" className="cursor-pointer font-normal">
                  Small
                </Label>
              </div>
              <div className="flex items-center space-x-3 py-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="cursor-pointer font-normal">
                  Medium (Default)
                </Label>
              </div>
              <div className="flex items-center space-x-3 py-2">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large" className="cursor-pointer font-normal">
                  Large
                </Label>
              </div>
              <div className="flex items-center space-x-3 py-2">
                <RadioGroupItem value="extra-large" id="extra-large" />
                <Label
                  htmlFor="extra-large"
                  className="cursor-pointer font-normal"
                >
                  Extra Large
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-border">
            <div className="space-y-1">
              <Label
                htmlFor="highContrast"
                className="cursor-pointer text-base font-medium"
              >
                High Contrast Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better visibility
              </p>
            </div>
            <Switch
              id="highContrast"
              checked={settings.accessibility.highContrast}
              onCheckedChange={(checked) =>
                updateAccessibility('highContrast', checked)
              }
            />
          </div>

          <div className="flex items-center justify-between py-3 border-t border-border">
            <div className="space-y-1">
              <Label
                htmlFor="reducedMotion"
                className="cursor-pointer text-base font-medium"
              >
                Reduce Motion
              </Label>
              <p className="text-sm text-muted-foreground">
                Minimize animations and transitions
              </p>
            </div>
            <Switch
              id="reducedMotion"
              checked={settings.accessibility.reducedMotion}
              onCheckedChange={(checked) =>
                updateAccessibility('reducedMotion', checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5 text-primary" />
            General Settings
          </CardTitle>
          <CardDescription>App preferences and configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="py-3">
            <h4 className="font-medium mb-2">Data Storage</h4>
            <p className="text-sm text-muted-foreground mb-4">
              All your data is stored locally in your browser. No account or
              internet connection required.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="gap-2"
              >
                Refresh App
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Keyboard Shortcuts
          </CardTitle>
          <CardDescription>Quick shortcuts to navigate faster</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <ShortcutRow shortcut="Alt + 1" description="Go to Schedule tab" />
            <ShortcutRow shortcut="Alt + 2" description="Go to Subjects tab" />
            <ShortcutRow shortcut="Alt + 3" description="Go to Settings tab" />
            <ShortcutRow
              shortcut={isMac() ? '⌘ + K' : 'Ctrl + K'}
              description="Open shortcuts dialog"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
          <CardDescription>Local Storage Scheduler v1.0.0</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            A powerful, offline-first schedule management app designed for
            students. Your data stays with you - no signups, no cloud storage,
            complete control.
          </p>
          <h3> Made with ❤️ itsantonle on github</h3>
        </CardContent>
      </Card>
    </div>
  )
}

function ShortcutRow({
  shortcut,
  description,
}: {
  shortcut: string
  description: string
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">{description}</span>
      <kbd className="px-2 py-1 text-xs font-semibold bg-muted text-muted-foreground rounded border border-border">
        {shortcut}
      </kbd>
    </div>
  )
}

function isMac() {
  if (typeof window === 'undefined') return false
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform)
}
