"use client"

import type React from "react"

/**
 * Schedule Tab Component
 * Main container for schedule management - allows switching between schedules
 * and displays the schedule table grid
 */

import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Calendar } from "lucide-react"
import { ScheduleTableGrid } from "./schedule-table-grid"
import { ScheduleTableDialog } from "./schedule-table-dialog"

export function ScheduleTab() {
  const { scheduleTables, currentScheduleId, setCurrentSchedule, subjects } = useApp()
  const [showAddDialog, setShowAddDialog] = useState(false)

  const currentSchedule = scheduleTables.find((t) => t.id === currentScheduleId)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Schedule Tables
              </CardTitle>
              <CardDescription className="mt-1.5">
                Create and manage your schedule tables for different semesters
              </CardDescription>
            </div>
            <Button onClick={() => setShowAddDialog(true)} className="gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              New Schedule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {scheduleTables.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">No schedules yet. Create your first schedule to get started.</p>
              <Button onClick={() => setShowAddDialog(true)} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Your First Schedule
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Label className="text-sm font-medium min-w-[120px]">Current Schedule:</Label>
                <Select value={currentScheduleId || ""} onValueChange={setCurrentSchedule}>
                  <SelectTrigger className="w-full sm:max-w-[300px]">
                    <SelectValue placeholder="Select a schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    {scheduleTables.map((table) => (
                      <SelectItem key={table.id} value={table.id}>
                        {table.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {currentSchedule ? (
                <ScheduleTableGrid schedule={currentSchedule} subjects={subjects} />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Please select a schedule to view and edit</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <ScheduleTableDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}

function Label({ className, ...props }: React.HTMLAttributes<HTMLLabelElement>) {
  return <label className={className} {...props} />
}
