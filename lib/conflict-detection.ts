/**
 * Conflict Detection Utility
 * Detects time conflicts in schedule slots
 */

import type { TimeSlot } from "./types"

export interface TimeConflict {
  slotId: string
  conflictsWith: string[] // Array of conflicting slot IDs
}

/**
 * Convert time string (HH:mm) to minutes since midnight for easy comparison
 */
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

/**
 * Check if two time slots overlap
 */
function doSlotsOverlap(slot1: TimeSlot, slot2: TimeSlot): boolean {
  // Must be same day
  if (slot1.day !== slot2.day) return false

  // Don't compare a slot with itself
  if (slot1.id === slot2.id) return false

  const start1 = timeToMinutes(slot1.startTime)
  const end1 = timeToMinutes(slot1.endTime)
  const start2 = timeToMinutes(slot2.startTime)
  const end2 = timeToMinutes(slot2.endTime)

  // Check for overlap: slot1 starts before slot2 ends AND slot1 ends after slot2 starts
  return start1 < end2 && end1 > start2
}

/**
 * Detect all conflicts in a list of time slots
 * Returns a map of slot IDs to their conflicts
 */
export function detectConflicts(slots: TimeSlot[]): Map<string, TimeConflict> {
  const conflicts = new Map<string, TimeConflict>()

  // Compare each slot with every other slot
  for (let i = 0; i < slots.length; i++) {
    const slot1 = slots[i]
    const conflictingIds: string[] = []

    for (let j = 0; j < slots.length; j++) {
      if (i === j) continue

      const slot2 = slots[j]
      if (doSlotsOverlap(slot1, slot2)) {
        conflictingIds.push(slot2.id)
      }
    }

    if (conflictingIds.length > 0) {
      conflicts.set(slot1.id, {
        slotId: slot1.id,
        conflictsWith: conflictingIds,
      })
    }
  }

  return conflicts
}

/**
 * Check if a specific slot has conflicts
 */
export function hasConflict(slotId: string, conflicts: Map<string, TimeConflict>): boolean {
  return conflicts.has(slotId)
}

/**
 * Get formatted conflict message for a slot
 */
export function getConflictMessage(slotId: string, conflicts: Map<string, TimeConflict>): string | null {
  const conflict = conflicts.get(slotId)
  if (!conflict) return null

  const count = conflict.conflictsWith.length
  return `This slot conflicts with ${count} other ${count === 1 ? "class" : "classes"}`
}
