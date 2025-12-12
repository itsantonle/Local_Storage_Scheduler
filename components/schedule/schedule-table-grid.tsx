"use client"

/**
 * Schedule Table Grid Component
 * Displays weekly schedule with time-based layout and conflict detection
 * Shows time slots spanning their actual duration with visual conflict warnings
 */

import { useState, useMemo } from "react"
import type { ScheduleTable, Subject, TimeSlot } from "@/lib/types"
import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Pencil, FileText, AlertTriangle } from "lucide-react"
import { TimeSlotDialog } from "./time-slot-dialog"
import { ScheduleTableDialog } from "./schedule-table-dialog"
import { ExportScheduleDialog } from "./export-schedule-dialog"
import { detectConflicts, hasConflict, getConflictMessage } from "@/lib/conflict-detection"
import { Badge } from "@/components/ui/badge"

interface ScheduleTableGridProps {
  schedule: ScheduleTable
  subjects: Subject[]
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const

// Time range for display (6 AM to 10 PM)
const START_HOUR = 6
const END_HOUR = 22
const HOUR_HEIGHT = 60 // pixels per hour

export function ScheduleTableGrid({ schedule, subjects }: ScheduleTableGridProps) {
  const { getSubjectById } = useApp()
  const [showAddSlotDialog, setShowAddSlotDialog] = useState(false)
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null)
  const [selectedDay, setSelectedDay] = useState<(typeof DAYS)[number] | null>(null)
  const [showEditSchedule, setShowEditSchedule] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)

  const conflicts = useMemo(() => detectConflicts(schedule.slots), [schedule.slots])
  const conflictCount = conflicts.size

  // Group slots by day
  const slotsByDay = DAYS.map((day) => ({
    day,
    slots: schedule.slots.filter((slot) => slot.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime)),
  }))

  const handleAddSlot = (day: (typeof DAYS)[number]) => {
    setSelectedDay(day)
    setShowAddSlotDialog(true)
  }

  const handleEditSlot = (slot: TimeSlot) => {
    setEditingSlot(slot)
  }

  const getSlotStyle = (slot: TimeSlot) => {
    const [startHour, startMin] = slot.startTime.split(":").map(Number)
    const [endHour, endMin] = slot.endTime.split(":").map(Number)

    const startMinutes = (startHour - START_HOUR) * 60 + startMin
    const endMinutes = (endHour - START_HOUR) * 60 + endMin
    const duration = endMinutes - startMinutes

    return {
      top: `${(startMinutes / 60) * HOUR_HEIGHT}px`,
      height: `${(duration / 60) * HOUR_HEIGHT}px`,
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="text-lg font-semibold">{schedule.name}</h3>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-sm text-muted-foreground">
              {schedule.slots.filter((s) => s.subjectId).length} time slots scheduled
            </p>
            {conflictCount > 0 && (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="h-3 w-3" />
                {conflictCount} {conflictCount === 1 ? "Conflict" : "Conflicts"}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowExportDialog(true)} className="gap-2">
            <FileText className="h-4 w-4" />
            Generate Text
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowEditSchedule(true)}>
            <Pencil className="h-3 w-3 mr-2" />
            Edit Name
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {slotsByDay.map(({ day, slots }) => (
          <Card key={day} className="p-3 overflow-hidden">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
              <h4 className="font-semibold text-sm">{day.slice(0, 3)}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAddSlot(day)}
                className="h-7 w-7 p-0 hover:bg-primary/10"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add time slot for {day}</span>
              </Button>
            </div>

            {/* Time grid with slots positioned by actual time */}
            <div className="relative" style={{ minHeight: `${(END_HOUR - START_HOUR) * HOUR_HEIGHT}px` }}>
              {/* Hour markers */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => {
                  const hour = START_HOUR + i
                  return (
                    <div
                      key={hour}
                      className="absolute left-0 right-0 border-t border-dashed border-border/30"
                      style={{ top: `${i * HOUR_HEIGHT}px` }}
                    >
                      <span className="text-[10px] text-muted-foreground/50 ml-1">
                        {hour === 12 ? "12 PM" : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Time slots positioned absolutely */}
              {slots.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">No classes</p>
                </div>
              ) : (
                slots.map((slot) => {
                  const subject = slot.subjectId ? getSubjectById(slot.subjectId) : null
                  const isConflict = hasConflict(slot.id, conflicts)
                  const conflictMessage = getConflictMessage(slot.id, conflicts)
                  const style = getSlotStyle(slot)

                  return (
                    <button
                      key={slot.id}
                      onClick={() => handleEditSlot(slot)}
                      className={`absolute left-0 right-0 text-left px-2 py-1.5 rounded-md border transition-all cursor-pointer hover:shadow-md hover:z-10 ${
                        isConflict
                          ? "bg-destructive/10 border-destructive hover:bg-destructive/20"
                          : "bg-card border-border hover:bg-accent"
                      }`}
                      style={{
                        ...style,
                        borderLeftWidth: "3px",
                        borderLeftColor: isConflict ? "hsl(var(--destructive))" : subject?.color || "transparent",
                      }}
                      title={conflictMessage || undefined}
                    >
                      {isConflict && (
                        <div className="flex items-center gap-1 mb-1">
                          <AlertTriangle className="h-3 w-3 text-destructive" />
                          <span className="text-[10px] text-destructive font-medium">Conflict</span>
                        </div>
                      )}

                      {subject ? (
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs truncate leading-tight">{subject.name}</p>
                          <p className="text-[10px] text-muted-foreground leading-tight">
                            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                          </p>
                          {slot.room && (
                            <p className="text-[10px] text-muted-foreground truncate leading-tight">{slot.room}</p>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-0.5">
                          <p className="font-medium text-xs text-muted-foreground">Unassigned</p>
                          <p className="text-[10px] text-muted-foreground">
                            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                          </p>
                        </div>
                      )}
                    </button>
                  )
                })
              )}
            </div>
          </Card>
        ))}
      </div>

      <TimeSlotDialog
        open={showAddSlotDialog}
        onOpenChange={setShowAddSlotDialog}
        scheduleId={schedule.id}
        defaultDay={selectedDay || undefined}
      />

      {editingSlot && (
        <TimeSlotDialog
          open={true}
          onOpenChange={(open) => !open && setEditingSlot(null)}
          scheduleId={schedule.id}
          slot={editingSlot}
        />
      )}

      {showEditSchedule && (
        <ScheduleTableDialog
          open={true}
          onOpenChange={(open) => !open && setShowEditSchedule(false)}
          schedule={schedule}
        />
      )}

      {showExportDialog && (
        <ExportScheduleDialog open={true} onOpenChange={setShowExportDialog} schedule={schedule} subjects={subjects} />
      )}
    </div>
  )
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number)
  const period = hours >= 12 ? "PM" : "AM"
  const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`
}
