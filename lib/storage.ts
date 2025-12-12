/**
 * Local Storage management utilities
 * Handles all data persistence, import/export, and validation
 */

import { type AppState, DEFAULT_SETTINGS } from "./types"

const STORAGE_KEY = "local-storage-scheduler-data"
const STORAGE_VERSION = "1.0.0"

/**
 * Initialize app state with default values
 */
export function initializeAppState(): AppState {
  return {
    subjects: [],
    scheduleTables: [],
    settings: DEFAULT_SETTINGS,
    version: STORAGE_VERSION,
  }
}

/**
 * Load app state from localStorage
 * Returns default state if no data exists or if data is invalid
 */
export function loadAppState(): AppState {
  try {
    if (typeof window === "undefined") {
      return initializeAppState()
    }

    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return initializeAppState()
    }

    const parsed = JSON.parse(stored)

    // Validate the structure
    if (!isValidAppState(parsed)) {
      console.warn("Invalid app state in localStorage, using defaults")
      return initializeAppState()
    }

    return parsed
  } catch (error) {
    console.error("Error loading app state:", error)
    return initializeAppState()
  }
}

/**
 * Save app state to localStorage
 */
export function saveAppState(state: AppState): void {
  try {
    if (typeof window === "undefined") return

    const data = {
      ...state,
      version: STORAGE_VERSION,
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving app state:", error)
    throw new Error("Failed to save data. Your storage might be full.")
  }
}

/**
 * Validate app state structure
 */
function isValidAppState(data: any): data is AppState {
  if (!data || typeof data !== "object") return false

  // Check required top-level properties
  if (!Array.isArray(data.subjects)) return false
  if (!Array.isArray(data.scheduleTables)) return false
  if (!data.settings || typeof data.settings !== "object") return false

  // Validate subjects array
  for (const subject of data.subjects) {
    if (!subject.id || !subject.name || !subject.stubCode || !subject.color) {
      return false
    }
  }

  // Validate schedule tables array
  for (const table of data.scheduleTables) {
    if (!table.id || !table.name || !Array.isArray(table.slots)) {
      return false
    }
  }

  return true
}

/**
 * Export app state as JSON file
 */
export function exportToFile(state: AppState, filename?: string): void {
  try {
    const dataStr = JSON.stringify(state, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = filename || `schedule-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Error exporting to file:", error)
    throw new Error("Failed to export data")
  }
}

/**
 * Import app state from JSON file
 */
export async function importFromFile(file: File): Promise<AppState> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const parsed = JSON.parse(content)

        if (!isValidAppState(parsed)) {
          reject(new Error("Invalid JSON structure. The file does not match the expected format."))
          return
        }

        resolve(parsed)
      } catch (error) {
        reject(new Error("Invalid JSON file. Please check the file and try again."))
      }
    }

    reader.onerror = () => {
      reject(new Error("Failed to read file"))
    }

    reader.readAsText(file)
  })
}

/**
 * Clear all data from localStorage
 */
export function clearAllData(): void {
  try {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Error clearing data:", error)
  }
}
