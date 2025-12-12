"use client"

import type React from "react"

/**
 * Data Management Banner Component
 * Prominent banner for importing/exporting data
 * Displayed at the top to emphasize data control
 */

import { useRef, useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Upload, AlertCircle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function DataManagementBanner() {
  const { exportData, importData, subjects, scheduleTables } = useApp()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showWarning, setShowWarning] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)

  const handleImportClick = () => {
    // Warn if there's existing data
    if (subjects.length > 0 || scheduleTables.length > 0) {
      setShowWarning(true)
    } else {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPendingFile(file)
      if (subjects.length > 0 || scheduleTables.length > 0) {
        setShowWarning(true)
      } else {
        await importData(file)
        setPendingFile(null)
      }
      e.target.value = ""
    }
  }

  const confirmImport = async () => {
    if (pendingFile) {
      await importData(pendingFile)
      setPendingFile(null)
    } else {
      fileInputRef.current?.click()
    }
    setShowWarning(false)
  }

  const hasData = subjects.length > 0 || scheduleTables.length > 0

  return (
    <>
      <Card className="bg-primary/5 border-primary/20 p-4 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <AlertCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Data Management</h3>
              <p className="text-sm text-muted-foreground">
                {hasData
                  ? "Your data is stored locally. Export to save a backup or import to restore."
                  : "Get started by importing existing data or creating new schedules below."}
              </p>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Button
              onClick={handleImportClick}
              variant="default"
              size="lg"
              className="flex-1 md:flex-initial gap-2 bg-primary hover:bg-primary/90"
            >
              <Upload className="h-4 w-4" />
              Import Data
            </Button>

            {hasData && (
              <Button onClick={() => exportData()} variant="outline" size="lg" className="flex-1 md:flex-initial gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            )}
          </div>
        </div>
      </Card>

      <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileChange} className="hidden" />

      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Import will replace existing data</AlertDialogTitle>
            <AlertDialogDescription>
              You currently have {subjects.length} subject(s) and {scheduleTables.length} schedule(s). Importing will
              replace all existing data. Make sure to export your current data first if you want to keep it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingFile(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmImport} className="bg-primary hover:bg-primary/90">
              Continue Import
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
