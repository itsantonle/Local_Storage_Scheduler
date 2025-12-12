"use client"

/**
 * App Context Provider
 * Manages global state for the entire application using React Context
 * Handles subjects, schedule tables, settings, and localStorage synchronization
 */

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { AppState, Subject, ScheduleTable, AppSettings, TimeSlot } from "@/lib/types"
import {
  loadAppState,
  saveAppState,
  initializeAppState,
  exportToFile,
  importFromFile,
  clearAllData,
} from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"

interface AppContextType {
  // State
  subjects: Subject[]
  scheduleTables: ScheduleTable[]
  settings: AppSettings
  currentScheduleId: string | null

  // Subject actions
  addSubject: (subject: Omit<Subject, "id">) => void
  updateSubject: (id: string, updates: Partial<Subject>) => void
  deleteSubject: (id: string) => void

  // Schedule table actions
  addScheduleTable: (name: string) => void
  updateScheduleTable: (id: string, updates: Partial<ScheduleTable>) => void
  deleteScheduleTable: (id: string) => void
  setCurrentSchedule: (id: string | null) => void

  // Time slot actions
  addTimeSlot: (scheduleId: string, slot: Omit<TimeSlot, "id">) => void
  updateTimeSlot: (scheduleId: string, slotId: string, updates: Partial<TimeSlot>) => void
  deleteTimeSlot: (scheduleId: string, slotId: string) => void

  // Settings actions
  updateSettings: (updates: Partial<AppSettings>) => void

  // Import/Export actions
  exportData: (filename?: string) => void
  importData: (file: File) => Promise<void>
  clearData: () => void

  // Helpers
  getSubjectById: (id: string) => Subject | undefined
  getScheduleById: (id: string) => ScheduleTable | undefined
  getCurrentSchedule: () => ScheduleTable | undefined
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(initializeAppState())
  const [currentScheduleId, setCurrentScheduleId] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { toast } = useToast()

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const loaded = loadAppState()
      setState(loaded)
      setCurrentScheduleId(loaded.settings.defaultScheduleId)
      setIsLoaded(true)
    } catch (error) {
      console.error("Failed to load app state:", error)
      toast({
        title: "Error Loading Data",
        description: "Failed to load your saved data. Starting fresh.",
        variant: "destructive",
      })
      setIsLoaded(true)
    }
  }, [toast])

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return

    try {
      saveAppState(state)
    } catch (error) {
      console.error("Failed to save app state:", error)
      toast({
        title: "Error Saving Data",
        description: "Failed to save your changes. Your storage might be full.",
        variant: "destructive",
      })
    }
  }, [state, isLoaded, toast])

  // Generate unique ID
  const generateId = useCallback(() => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }, [])

  // Subject actions
  const addSubject = useCallback(
    (subject: Omit<Subject, "id">) => {
      const newSubject: Subject = {
        ...subject,
        id: generateId(),
      }

      setState((prev) => ({
        ...prev,
        subjects: [...prev.subjects, newSubject],
      }))

      toast({
        title: "Subject Added",
        description: `${subject.name} has been added successfully.`,
      })
    },
    [generateId, toast],
  )

  const updateSubject = useCallback(
    (id: string, updates: Partial<Subject>) => {
      setState((prev) => ({
        ...prev,
        subjects: prev.subjects.map((subject) => (subject.id === id ? { ...subject, ...updates } : subject)),
      }))

      toast({
        title: "Subject Updated",
        description: "Subject has been updated successfully.",
      })
    },
    [toast],
  )

  const deleteSubject = useCallback(
    (id: string) => {
      const subject = state.subjects.find((s) => s.id === id)

      setState((prev) => ({
        ...prev,
        subjects: prev.subjects.filter((s) => s.id !== id),
        // Also remove subject assignments from all schedules
        scheduleTables: prev.scheduleTables.map((table) => ({
          ...table,
          slots: table.slots.map((slot) => (slot.subjectId === id ? { ...slot, subjectId: null } : slot)),
        })),
      }))

      toast({
        title: "Subject Deleted",
        description: `${subject?.name || "Subject"} has been removed.`,
      })
    },
    [state.subjects, toast],
  )

  // Schedule table actions
  const addScheduleTable = useCallback(
    (name: string) => {
      const newTable: ScheduleTable = {
        id: generateId(),
        name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slots: [],
      }

      setState((prev) => ({
        ...prev,
        scheduleTables: [...prev.scheduleTables, newTable],
      }))

      // Set as current if it's the first one
      if (state.scheduleTables.length === 0) {
        setCurrentScheduleId(newTable.id)
      }

      toast({
        title: "Schedule Created",
        description: `${name} has been created successfully.`,
      })
    },
    [generateId, state.scheduleTables.length, toast],
  )

  const updateScheduleTable = useCallback(
    (id: string, updates: Partial<ScheduleTable>) => {
      setState((prev) => ({
        ...prev,
        scheduleTables: prev.scheduleTables.map((table) =>
          table.id === id ? { ...table, ...updates, updatedAt: new Date().toISOString() } : table,
        ),
      }))

      toast({
        title: "Schedule Updated",
        description: "Schedule has been updated successfully.",
      })
    },
    [toast],
  )

  const deleteScheduleTable = useCallback(
    (id: string) => {
      const table = state.scheduleTables.find((t) => t.id === id)

      setState((prev) => ({
        ...prev,
        scheduleTables: prev.scheduleTables.filter((t) => t.id !== id),
      }))

      // Clear current schedule if it was deleted
      if (currentScheduleId === id) {
        setCurrentScheduleId(null)
      }

      toast({
        title: "Schedule Deleted",
        description: `${table?.name || "Schedule"} has been removed.`,
      })
    },
    [state.scheduleTables, currentScheduleId, toast],
  )

  const setCurrentSchedule = useCallback((id: string | null) => {
    setCurrentScheduleId(id)
  }, [])

  // Time slot actions
  const addTimeSlot = useCallback(
    (scheduleId: string, slot: Omit<TimeSlot, "id">) => {
      const newSlot: TimeSlot = {
        ...slot,
        id: generateId(),
      }

      setState((prev) => ({
        ...prev,
        scheduleTables: prev.scheduleTables.map((table) =>
          table.id === scheduleId
            ? {
                ...table,
                slots: [...table.slots, newSlot],
                updatedAt: new Date().toISOString(),
              }
            : table,
        ),
      }))

      toast({
        title: "Time Slot Added",
        description: "New time slot has been added to your schedule.",
      })
    },
    [generateId, toast],
  )

  const updateTimeSlot = useCallback((scheduleId: string, slotId: string, updates: Partial<TimeSlot>) => {
    setState((prev) => ({
      ...prev,
      scheduleTables: prev.scheduleTables.map((table) =>
        table.id === scheduleId
          ? {
              ...table,
              slots: table.slots.map((slot) => (slot.id === slotId ? { ...slot, ...updates } : slot)),
              updatedAt: new Date().toISOString(),
            }
          : table,
      ),
    }))
  }, [])

  const deleteTimeSlot = useCallback(
    (scheduleId: string, slotId: string) => {
      setState((prev) => ({
        ...prev,
        scheduleTables: prev.scheduleTables.map((table) =>
          table.id === scheduleId
            ? {
                ...table,
                slots: table.slots.filter((slot) => slot.id !== slotId),
                updatedAt: new Date().toISOString(),
              }
            : table,
        ),
      }))

      toast({
        title: "Time Slot Deleted",
        description: "Time slot has been removed from your schedule.",
      })
    },
    [toast],
  )

  // Settings actions
  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...updates },
    }))
  }, [])

  // Import/Export actions
  const exportData = useCallback(
    (filename?: string) => {
      try {
        exportToFile(state, filename)
        toast({
          title: "Data Exported",
          description: "Your schedule data has been exported successfully.",
        })
      } catch (error) {
        toast({
          title: "Export Failed",
          description: "Failed to export your data. Please try again.",
          variant: "destructive",
        })
      }
    },
    [state, toast],
  )

  const importData = useCallback(
    async (file: File) => {
      try {
        const imported = await importFromFile(file)
        setState(imported)
        setCurrentScheduleId(imported.settings.defaultScheduleId)

        toast({
          title: "Data Imported",
          description: "Your schedule data has been imported successfully.",
        })
      } catch (error) {
        toast({
          title: "Import Failed",
          description: error instanceof Error ? error.message : "Failed to import data. Please check the file.",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const clearData = useCallback(() => {
    clearAllData()
    const fresh = initializeAppState()
    setState(fresh)
    setCurrentScheduleId(null)

    toast({
      title: "Data Cleared",
      description: "All your data has been cleared.",
    })
  }, [toast])

  // Helper functions
  const getSubjectById = useCallback(
    (id: string) => {
      return state.subjects.find((s) => s.id === id)
    },
    [state.subjects],
  )

  const getScheduleById = useCallback(
    (id: string) => {
      return state.scheduleTables.find((t) => t.id === id)
    },
    [state.scheduleTables],
  )

  const getCurrentSchedule = useCallback(() => {
    if (!currentScheduleId) return undefined
    return state.scheduleTables.find((t) => t.id === currentScheduleId)
  }, [currentScheduleId, state.scheduleTables])

  const value: AppContextType = {
    subjects: state.subjects,
    scheduleTables: state.scheduleTables,
    settings: state.settings,
    currentScheduleId,
    addSubject,
    updateSubject,
    deleteSubject,
    addScheduleTable,
    updateScheduleTable,
    deleteScheduleTable,
    setCurrentSchedule,
    addTimeSlot,
    updateTimeSlot,
    deleteTimeSlot,
    updateSettings,
    exportData,
    importData,
    clearData,
    getSubjectById,
    getScheduleById,
    getCurrentSchedule,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
