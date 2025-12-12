"use client"

/**
 * Subject List Component
 * Displays all subjects in a grid layout with edit/delete actions
 */

import { useState } from "react"
import type { Subject } from "@/lib/types"
import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"
import { SubjectDialog } from "./subject-dialog"
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

interface SubjectListProps {
  subjects: Subject[]
}

export function SubjectList({ subjects }: SubjectListProps) {
  const { deleteSubject } = useApp()
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null)
  const [deletingSubject, setDeletingSubject] = useState<Subject | null>(null)

  const handleDelete = () => {
    if (deletingSubject) {
      deleteSubject(deletingSubject.id)
      setDeletingSubject(null)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            className="relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
            style={{
              borderLeft: `4px solid ${subject.color}`,
            }}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{subject.name}</h3>
                  <p className="text-sm text-muted-foreground">{subject.stubCode}</p>
                </div>
                <div
                  className="h-8 w-8 rounded-full flex-shrink-0 ml-2"
                  style={{ backgroundColor: subject.color }}
                  aria-label={`Subject color: ${subject.color}`}
                />
              </div>

              {(subject.defaultTeacher || subject.defaultRoom) && (
                <div className="text-sm text-muted-foreground space-y-1 mt-3 mb-4">
                  {subject.defaultTeacher && (
                    <p>
                      <span className="font-medium">Teacher:</span> {subject.defaultTeacher}
                    </p>
                  )}
                  {subject.defaultRoom && (
                    <p>
                      <span className="font-medium">Room:</span> {subject.defaultRoom}
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 bg-transparent"
                  onClick={() => setEditingSubject(subject)}
                >
                  <Pencil className="h-3 w-3" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                  onClick={() => setDeletingSubject(subject)}
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {editingSubject && (
        <SubjectDialog open={true} onOpenChange={(open) => !open && setEditingSubject(null)} subject={editingSubject} />
      )}

      <AlertDialog open={!!deletingSubject} onOpenChange={(open) => !open && setDeletingSubject(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subject</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingSubject?.name}"? This will remove the subject from all schedules
              where it's assigned.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Subject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
