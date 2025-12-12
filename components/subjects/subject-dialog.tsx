"use client"

import type React from "react"

/**
 * Subject Dialog Component
 * Form for adding/editing subjects
 */

import { useEffect, useState } from "react"
import type { Subject } from "@/lib/types"
import { SUBJECT_COLORS } from "@/lib/types"
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
import { BookOpen } from "lucide-react"

interface SubjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subject?: Subject // If provided, we're editing
}

export function SubjectDialog({ open, onOpenChange, subject }: SubjectDialogProps) {
  const { addSubject, updateSubject } = useApp()
  const isEditing = !!subject

  const [formData, setFormData] = useState({
    name: "",
    stubCode: "",
    color: SUBJECT_COLORS[0],
    defaultTeacher: "",
    defaultRoom: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Reset form when dialog opens/closes or subject changes
  useEffect(() => {
    if (open) {
      if (subject) {
        setFormData({
          name: subject.name,
          stubCode: subject.stubCode,
          color: subject.color,
          defaultTeacher: subject.defaultTeacher || "",
          defaultRoom: subject.defaultRoom || "",
        })
      } else {
        setFormData({
          name: "",
          stubCode: "",
          color: SUBJECT_COLORS[0],
          defaultTeacher: "",
          defaultRoom: "",
        })
      }
      setErrors({})
    }
  }, [open, subject])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Subject name is required"
    }

    if (!formData.stubCode.trim()) {
      newErrors.stubCode = "Subject code is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const subjectData = {
      name: formData.name.trim(),
      stubCode: formData.stubCode.trim().toUpperCase(),
      color: formData.color,
      defaultTeacher: formData.defaultTeacher.trim() || undefined,
      defaultRoom: formData.defaultRoom.trim() || undefined,
    }

    if (isEditing) {
      updateSubject(subject.id, subjectData)
    } else {
      addSubject(subjectData)
    }

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            {isEditing ? "Edit Subject" : "Add New Subject"}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the subject details below." : "Fill in the details to add a new subject."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Subject Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., Calculus"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stubCode">
              Subject Code <span className="text-destructive">*</span>
            </Label>
            <Input
              id="stubCode"
              placeholder="e.g., MATH101"
              value={formData.stubCode}
              onChange={(e) => setFormData({ ...formData, stubCode: e.target.value })}
              className={errors.stubCode ? "border-destructive" : ""}
            />
            {errors.stubCode && <p className="text-sm text-destructive">{errors.stubCode}</p>}
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="grid grid-cols-5 gap-2">
              {SUBJECT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`h-10 rounded-md transition-all hover:scale-110 ${
                    formData.color === color ? "ring-2 ring-ring ring-offset-2 ring-offset-background" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setFormData({ ...formData, color })}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultTeacher">Default Teacher (Optional)</Label>
            <Input
              id="defaultTeacher"
              placeholder="e.g., Dr. Smith"
              value={formData.defaultTeacher}
              onChange={(e) => setFormData({ ...formData, defaultTeacher: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultRoom">Default Room (Optional)</Label>
            <Input
              id="defaultRoom"
              placeholder="e.g., Room 301"
              value={formData.defaultRoom}
              onChange={(e) => setFormData({ ...formData, defaultRoom: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? "Update Subject" : "Add Subject"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
