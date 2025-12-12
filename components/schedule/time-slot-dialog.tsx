"use client"

import type React from "react"

/**
 * Time Slot Dialog Component
 * Form for adding/editing time slots in a schedule
 */

import { useEffect, useState } from "react"
import type { TimeSlot } from "@/lib/types"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Clock, Trash2 } from "lucide-react"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const

interface TimeSlotDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  scheduleId: string
  slot?: TimeSlot // If provided, we're editing
  defaultDay?: (typeof DAYS)[number]
}

export function TimeSlotDialog({ open, onOpenChange, scheduleId, slot, defaultDay }: TimeSlotDialogProps) {
  const { addTimeSlot, updateTimeSlot, deleteTimeSlot, subjects, getSubjectById } = useApp()
  const isEditing = !!slot

  const [formData, setFormData] = useState({
    day: defaultDay || DAYS[0],
    startTime: "09:00",
    endTime: "10:00",
    subjectId: "defaultSubjectId", // Updated default value to be a non-empty string
    room: "",
    teacher: "",
    notes: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Auto-fill teacher and room from subject defaults
  useEffect(() => {
    if (formData.subjectId) {
      const subject = getSubjectById(formData.subjectId)
      if (subject && !isEditing) {
        setFormData((prev) => ({
          ...prev,
          teacher: subject.defaultTeacher || prev.teacher,
          room: subject.defaultRoom || prev.room,
        }))
      }
    }
  }, [formData.subjectId, getSubjectById, isEditing])

  useEffect(() => {
    if (open) {
      if (slot) {
        setFormData({
          day: slot.day,
          startTime: slot.startTime,
          endTime: slot.endTime,
          subjectId: slot.subjectId || "defaultSubjectId", // Updated default value to be a non-empty string
          room: slot.room || "",
          teacher: slot.teacher || "",
          notes: slot.notes || "",
        })
      } else {
        setFormData({
          day: defaultDay || DAYS[0],
          startTime: "09:00",
          endTime: "10:00",
          subjectId: "defaultSubjectId", // Updated default value to be a non-empty string
          room: "",
          teacher: "",
          notes: "",
        })
      }
      setErrors({})
    }
  }, [open, slot, defaultDay])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.startTime >= formData.endTime) {
      newErrors.time = "End time must be after start time"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const slotData = {
      day: formData.day,
      startTime: formData.startTime,
      endTime: formData.endTime,
      subjectId: formData.subjectId || null,
      room: formData.room.trim() || undefined,
      teacher: formData.teacher.trim() || undefined,
      notes: formData.notes.trim() || undefined,
    }

    if (isEditing) {
      updateTimeSlot(scheduleId, slot.id, slotData)
    } else {
      addTimeSlot(scheduleId, slotData)
    }

    onOpenChange(false)
  }

  const handleDelete = () => {
    if (slot) {
      deleteTimeSlot(scheduleId, slot.id)
      setShowDeleteDialog(false)
      onOpenChange(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              {isEditing ? "Edit Time Slot" : "Add Time Slot"}
            </DialogTitle>
            <DialogDescription>
              {isEditing ? "Update the time slot details." : "Add a new time slot to your schedule."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="day">
                  Day <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.day} onValueChange={(value) => setFormData({ ...formData, day: value as any })}>
                  <SelectTrigger id="day">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={formData.subjectId}
                  onValueChange={(value) => setFormData({ ...formData, subjectId: value })}
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="defaultSubjectId">None</SelectItem>{" "}
                    {/* Updated value to be a non-empty string */}
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: subject.color }}
                          />
                          {subject.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">
                  Start Time <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">
                  End Time <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
            </div>

            {errors.time && <p className="text-sm text-destructive">{errors.time}</p>}

            <div className="space-y-2">
              <Label htmlFor="room">Room</Label>
              <Input
                id="room"
                placeholder="e.g., Room 301"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teacher">Teacher</Label>
              <Input
                id="teacher"
                placeholder="e.g., Dr. Smith"
                value={formData.teacher}
                onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
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
              <Button type="submit">{isEditing ? "Update" : "Add"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Time Slot</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this time slot? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
