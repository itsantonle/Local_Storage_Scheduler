/**
 * Core type definitions for the Local Storage Scheduler app
 * These types define the data structures used throughout the application
 */

// Subject color options
export const SUBJECT_COLORS = [
  "#FF6B35", // Orange
  "#F7931E", // Light Orange
  "#FFA07A", // Light Salmon
  "#FF8C42", // Mango
  "#FFB84D", // Yellow Orange
  "#4ECDC4", // Teal
  "#95E1D3", // Mint
  "#6C5CE7", // Purple
  "#A29BFE", // Light Purple
  "#FF6B9D", // Pink
] as const

export type SubjectColor = (typeof SUBJECT_COLORS)[number]

// Subject definition
export interface Subject {
  id: string
  name: string
  stubCode: string // Short code for the subject (e.g., "CS101")
  color: SubjectColor
  defaultTeacher?: string // Optional default teacher
  defaultRoom?: string // Optional default room
}

// Time slot for schedule assignments
export interface TimeSlot {
  id: string
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
  startTime: string // Format: "HH:mm" (24-hour)
  endTime: string // Format: "HH:mm" (24-hour)
  subjectId: string | null // null if no subject assigned
  room?: string
  teacher?: string
  notes?: string
}

// Schedule Table (e.g., "First Sem", "Second Sem")
export interface ScheduleTable {
  id: string
  name: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
  slots: TimeSlot[]
}

// Export format options
export interface ExportFormatOptions {
  includeRoom: boolean
  includeTeacher: boolean
  includeStubCode: boolean
  includeNotes: boolean
  spacing: "compact" | "normal" | "spacious"
  timeFormat: "12h" | "24h"
}

// Accessibility settings
export interface AccessibilitySettings {
  fontSize: "small" | "medium" | "large" | "extra-large"
  highContrast: boolean
  reducedMotion: boolean
}

// App settings
export interface AppSettings {
  accessibility: AccessibilitySettings
  defaultScheduleId: string | null
}

// Complete app state (for localStorage)
export interface AppState {
  subjects: Subject[]
  scheduleTables: ScheduleTable[]
  settings: AppSettings
  version: string // For future compatibility
}

// Default settings
export const DEFAULT_SETTINGS: AppSettings = {
  accessibility: {
    fontSize: "medium",
    highContrast: false,
    reducedMotion: false,
  },
  defaultScheduleId: null,
}

// Default export format
export const DEFAULT_EXPORT_FORMAT: ExportFormatOptions = {
  includeRoom: true,
  includeTeacher: true,
  includeStubCode: true,
  includeNotes: false,
  spacing: "normal",
  timeFormat: "12h",
}
