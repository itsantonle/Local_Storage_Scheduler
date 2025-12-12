"use client"

import type React from "react"

/**
 * Schedule Table Dialog Component
 * Form for adding/editing schedule tables
 */

import { useEffect, useState } from "react"
import type { ScheduleTable } from "@/lib/types"
import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Calendar, Trash2 } from "lucide-react"

interface ScheduleTableDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  schedule?: ScheduleTable // If provided, we're editing
}

export function ScheduleTableDialog({ open, onOpenChange, schedule }: ScheduleTableDialogProps) {
  const { addScheduleTable, updateScheduleTable, deleteScheduleTable } = useApp()
  const isEditing = !!schedule

  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  useEffect(() => {
    if (open) {
      setName(schedule?.name || "")
      setError("")
    }
  }, [open, schedule])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Schedule name is required")
      return
    }

    if (isEditing) {
      updateScheduleTable(schedule.id, { name: name.trim() })
    } else {
      addScheduleTable(name.trim())
    }

    onOpenChange(false)
  }

  const handleDelete = () => {
    if (schedule) {
      deleteScheduleTable(schedule.id)
      setShowDeleteDialog(false)
      onOpenChange(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {isEditing ? "Edit Schedule" : "Create New Schedule"}
            </DialogTitle>
            <DialogDescription>
              {isEditing ? "Update your schedule table name." : "Enter a name for your new schedule table."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="scheduleName">
                Schedule Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="scheduleName"
                placeholder="e.g., First Semester 2024"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError("")
                }}
                className={error ? "border-destructive" : ""}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <DialogFooter className="gap-2">
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground mr-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              )}
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Schedule</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{schedule?.name}"? This will permanently remove all time slots and
              assignments in this schedule.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Schedule
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
