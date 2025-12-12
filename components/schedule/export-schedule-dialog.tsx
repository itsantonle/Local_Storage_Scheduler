"use client"

/**
 * Export Schedule Dialog Component
 * Allows users to generate formatted schedule text with various options
 */

import { useState } from "react"
import type { ScheduleTable, Subject, ExportFormatOptions } from "@/lib/types"
import { DEFAULT_EXPORT_FORMAT } from "@/lib/types"
import { generateScheduleText, generateInlineSchedule } from "@/lib/schedule-generator"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Download, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExportScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  schedule: ScheduleTable
  subjects: Subject[]
}

export function ExportScheduleDialog({ open, onOpenChange, schedule, subjects }: ExportScheduleDialogProps) {
  const { toast } = useToast()
  const [formatOptions, setFormatOptions] = useState<ExportFormatOptions>(DEFAULT_EXPORT_FORMAT)
  const [formatType, setFormatType] = useState<"detailed" | "inline">("detailed")

  const generatedText =
    formatType === "detailed"
      ? generateScheduleText(schedule, subjects, formatOptions)
      : generateInlineSchedule(schedule, subjects)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText)
      toast({
        title: "Copied!",
        description: "Schedule text has been copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDownload = () => {
    try {
      const blob = new Blob([generatedText], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${schedule.name.replace(/\s+/g, "-").toLowerCase()}-schedule.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Downloaded!",
        description: "Schedule has been downloaded as a text file.",
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the file. Please try again.",
        variant: "destructive",
      })
    }
  }

  const updateOption = (key: keyof ExportFormatOptions, value: any) => {
    setFormatOptions((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Generate Schedule Text
          </DialogTitle>
          <DialogDescription>Customize and export your schedule in text format</DialogDescription>
        </DialogHeader>

        <Tabs value={formatType} onValueChange={(v) => setFormatType(v as any)} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="detailed">Detailed Format</TabsTrigger>
            <TabsTrigger value="inline">Inline Format</TabsTrigger>
          </TabsList>

          <TabsContent value="detailed" className="space-y-4 mt-4">
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-sm">Format Options</h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="includeRoom" className="cursor-pointer text-sm">
                    Include Room
                  </Label>
                  <Switch
                    id="includeRoom"
                    checked={formatOptions.includeRoom}
                    onCheckedChange={(checked) => updateOption("includeRoom", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="includeTeacher" className="cursor-pointer text-sm">
                    Include Teacher
                  </Label>
                  <Switch
                    id="includeTeacher"
                    checked={formatOptions.includeTeacher}
                    onCheckedChange={(checked) => updateOption("includeTeacher", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="includeStubCode" className="cursor-pointer text-sm">
                    Include Subject Code
                  </Label>
                  <Switch
                    id="includeStubCode"
                    checked={formatOptions.includeStubCode}
                    onCheckedChange={(checked) => updateOption("includeStubCode", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="includeNotes" className="cursor-pointer text-sm">
                    Include Notes
                  </Label>
                  <Switch
                    id="includeNotes"
                    checked={formatOptions.includeNotes}
                    onCheckedChange={(checked) => updateOption("includeNotes", checked)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Time Format</Label>
                <RadioGroup value={formatOptions.timeFormat} onValueChange={(v) => updateOption("timeFormat", v)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="12h" id="12h" />
                    <Label htmlFor="12h" className="cursor-pointer font-normal text-sm">
                      12-hour (9:00 AM)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="24h" id="24h" />
                    <Label htmlFor="24h" className="cursor-pointer font-normal text-sm">
                      24-hour (09:00)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Spacing</Label>
                <RadioGroup value={formatOptions.spacing} onValueChange={(v) => updateOption("spacing", v)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="compact" />
                    <Label htmlFor="compact" className="cursor-pointer font-normal text-sm">
                      Compact
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal" className="cursor-pointer font-normal text-sm">
                      Normal
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="spacious" id="spacious" />
                    <Label htmlFor="spacious" className="cursor-pointer font-normal text-sm">
                      Spacious
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="inline" className="mt-4">
            <p className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg">
              Inline format provides a compact, single-line per day view of your schedule. Perfect for quick sharing or
              copying into messages.
            </p>
          </TabsContent>
        </Tabs>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Generated Schedule</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 bg-transparent">
                <Copy className="h-3 w-3" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2 bg-transparent">
                <Download className="h-3 w-3" />
                Download
              </Button>
            </div>
          </div>
          <Textarea
            value={generatedText}
            readOnly
            className="font-mono text-xs min-h-[300px] resize-none bg-muted/50"
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
