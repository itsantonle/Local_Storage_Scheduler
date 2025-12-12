/**
 * Schedule text generation utilities
 * Handles generating formatted schedule text with various options
 */

import type { ScheduleTable, Subject, ExportFormatOptions, TimeSlot } from "./types"

const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const

/**
 * Convert 24-hour time to 12-hour format
 */
function formatTime12h(time: string): string {
  const [hours, minutes] = time.split(":").map(Number)
  const period = hours >= 12 ? "PM" : "AM"
  const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`
}

/**
 * Format time range based on format option
 */
function formatTimeRange(start: string, end: string, format: "12h" | "24h"): string {
  if (format === "12h") {
    return `${formatTime12h(start)} - ${formatTime12h(end)}`
  }
  return `${start} - ${end}`
}

/**
 * Get spacing characters based on spacing option
 */
function getSpacing(spacing: "compact" | "normal" | "spacious"): { line: string; section: string } {
  switch (spacing) {
    case "compact":
      return { line: "", section: "\n" }
    case "spacious":
      return { line: "\n", section: "\n\n\n" }
    default:
      return { line: "", section: "\n\n" }
  }
}

/**
 * Generate formatted schedule text
 */
export function generateScheduleText(
  schedule: ScheduleTable,
  subjects: Subject[],
  options: ExportFormatOptions,
): string {
  const spacing = getSpacing(options.spacing)
  let output = `Schedule: ${schedule.name}\n`
  output += `Generated: ${new Date().toLocaleString()}\n`
  output += `${spacing.section}`

  // Group slots by day
  const slotsByDay = new Map<string, TimeSlot[]>()
  for (const slot of schedule.slots) {
    if (!slot.subjectId) continue // Skip empty slots

    const daySlots = slotsByDay.get(slot.day) || []
    daySlots.push(slot)
    slotsByDay.set(slot.day, daySlots)
  }

  // Sort each day's slots by start time
  for (const [day, slots] of slotsByDay) {
    slots.sort((a, b) => a.startTime.localeCompare(b.startTime))
  }

  // Generate output for each day
  for (const day of DAYS_ORDER) {
    const daySlots = slotsByDay.get(day)
    if (!daySlots || daySlots.length === 0) continue

    output += `${day}\n`
    output += "=".repeat(day.length) + "\n"

    for (const slot of daySlots) {
      const subject = subjects.find((s) => s.id === slot.subjectId)
      if (!subject) continue

      // Subject name
      output += `${subject.name}`

      // Stub code
      if (options.includeStubCode) {
        output += ` (${subject.stubCode})`
      }

      output += spacing.line + "\n"

      // Time
      output += `  Time: ${formatTimeRange(slot.startTime, slot.endTime, options.timeFormat)}`
      output += spacing.line + "\n"

      // Room
      if (options.includeRoom && slot.room) {
        output += `  Room: ${slot.room}`
        output += spacing.line + "\n"
      }

      // Teacher
      if (options.includeTeacher && slot.teacher) {
        output += `  Teacher: ${slot.teacher}`
        output += spacing.line + "\n"
      }

      // Notes
      if (options.includeNotes && slot.notes) {
        output += `  Notes: ${slot.notes}`
        output += spacing.line + "\n"
      }

      output += "\n"
    }

    output += spacing.section
  }

  return output.trim()
}

/**
 * Generate a simple inline format (more compact)
 */
export function generateInlineSchedule(schedule: ScheduleTable, subjects: Subject[]): string {
  const slotsByDay = new Map<string, TimeSlot[]>()

  for (const slot of schedule.slots) {
    if (!slot.subjectId) continue
    const daySlots = slotsByDay.get(slot.day) || []
    daySlots.push(slot)
    slotsByDay.set(slot.day, daySlots)
  }

  for (const [_, slots] of slotsByDay) {
    slots.sort((a, b) => a.startTime.localeCompare(b.startTime))
  }

  let output = `${schedule.name}\n\n`

  for (const day of DAYS_ORDER) {
    const daySlots = slotsByDay.get(day)
    if (!daySlots || daySlots.length === 0) continue

    output += `${day}: `

    const entries = daySlots
      .map((slot) => {
        const subject = subjects.find((s) => s.id === slot.subjectId)
        if (!subject) return ""

        return `${subject.name} (${formatTime12h(slot.startTime)}, ${slot.room || "No Room"})`
      })
      .filter(Boolean)

    output += entries.join(", ")
    output += "\n"
  }

  return output.trim()
}
