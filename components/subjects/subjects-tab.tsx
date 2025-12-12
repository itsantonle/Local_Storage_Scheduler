"use client"

/**
 * Subjects Tab Component
 * Main container for subject management interface
 */

import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { SubjectList } from "./subject-list"
import { SubjectDialog } from "./subject-dialog"

export function SubjectsTab() {
  const { subjects } = useApp()
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manage Subjects</CardTitle>
              <CardDescription className="mt-1.5">Add, edit, or remove subjects for your schedules</CardDescription>
            </div>
            <Button onClick={() => setShowAddDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Subject
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {subjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No subjects yet. Add your first subject to get started.</p>
              <Button onClick={() => setShowAddDialog(true)} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Subject
              </Button>
            </div>
          ) : (
            <SubjectList subjects={subjects} />
          )}
        </CardContent>
      </Card>

      <SubjectDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}
