"use client"

/**
 * How to Use Tab Component
 * Comprehensive guide for using the scheduler app
 */

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, Plus, Download, Upload, AlertTriangle, Keyboard, Settings } from "lucide-react"

export function HowToUseTab() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold mb-2">How to Use Local Storage Scheduler</h2>
        <p className="text-muted-foreground">
          A complete guide to managing your academic schedule without any sign-ups or cloud storage.
        </p>
      </div>

      {/* Quick Start */}
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Quick Start</h3>
            <p className="text-sm text-muted-foreground">Get up and running in 3 easy steps</p>
          </div>
        </div>

        <ol className="space-y-4 ml-11">
          <li className="flex gap-3">
            <Badge variant="outline" className="shrink-0 h-6">
              1
            </Badge>
            <div>
              <p className="font-medium">Add Your Subjects</p>
              <p className="text-sm text-muted-foreground">
                Go to the Subjects tab and create all your subjects with names, codes, and colors.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <Badge variant="outline" className="shrink-0 h-6">
              2
            </Badge>
            <div>
              <p className="font-medium">Create a Schedule Table</p>
              <p className="text-sm text-muted-foreground">
                In the Schedule tab, create a new schedule (e.g., "First Semester 2024").
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <Badge variant="outline" className="shrink-0 h-6">
              3
            </Badge>
            <div>
              <p className="font-medium">Add Time Slots</p>
              <p className="text-sm text-muted-foreground">
                Click the + button on any day to add classes with times, rooms, and teachers.
              </p>
            </div>
          </li>
        </ol>
      </Card>

      {/* Managing Subjects */}
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Managing Subjects</h3>
            <p className="text-sm text-muted-foreground">Create and organize your courses</p>
          </div>
        </div>

        <div className="ml-11 space-y-3 text-sm">
          <p>
            <strong>Adding Subjects:</strong> Click "Add Subject" and fill in the name, stub code (e.g., CS101), and
            choose a color. You can also set default teachers and rooms.
          </p>
          <p>
            <strong>Color Coding:</strong> Each subject gets a unique color that appears on your schedule, making it
            easy to see your classes at a glance.
          </p>
          <p>
            <strong>Editing/Deleting:</strong> Click on any subject card to edit its details or remove it. Deleting a
            subject will unassign it from all schedules.
          </p>
        </div>
      </Card>

      {/* Creating Schedules */}
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Creating Schedules</h3>
            <p className="text-sm text-muted-foreground">Build your weekly timetables</p>
          </div>
        </div>

        <div className="ml-11 space-y-3 text-sm">
          <p>
            <strong>Multiple Schedules:</strong> Create separate schedules for different semesters, terms, or
            alternative arrangements (e.g., "Fall 2024", "Spring 2024 Remote").
          </p>
          <p>
            <strong>Adding Time Slots:</strong> Click the + button on any day card. Enter the start and end times,
            select a subject, and optionally override the room, teacher, or add notes.
          </p>
          <p>
            <strong>Conflict Detection:</strong> If two classes overlap in time on the same day, they'll appear in red
            with a warning icon automatically.
          </p>
          <p>
            <strong>Editing Slots:</strong> Click any time slot to edit or delete it.
          </p>
        </div>
      </Card>

      {/* Data Management */}
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Download className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Data Management</h3>
            <p className="text-sm text-muted-foreground">Save and restore your schedules</p>
          </div>
        </div>

        <div className="ml-11 space-y-3 text-sm">
          <p className="flex items-start gap-2">
            <Download className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong>Export Data:</strong> Download all your subjects, schedules, and settings as a JSON file. Keep
              this as a backup or share it with other devices.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <Upload className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>
              <strong>Import Data:</strong> Load a previously exported JSON file to restore your schedules. This will
              replace all current data.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              <strong>Important:</strong> Your data is stored only in your browser. Always export backups regularly,
              especially before clearing browser data or switching devices.
            </span>
          </p>
        </div>
      </Card>

      {/* Text Generation */}
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Generating Schedule Text</h3>
            <p className="text-sm text-muted-foreground">Export formatted schedule text</p>
          </div>
        </div>

        <div className="ml-11 space-y-3 text-sm">
          <p>
            Click "Generate Text" on any schedule to create a formatted text version you can copy and paste. Customize
            what to include:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Subject codes, rooms, and teachers</li>
            <li>Notes and additional information</li>
            <li>12-hour or 24-hour time format</li>
            <li>Compact, normal, or spacious spacing</li>
          </ul>
        </div>
      </Card>

      {/* Keyboard Shortcuts */}
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Keyboard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Keyboard Shortcuts</h3>
            <p className="text-sm text-muted-foreground">Work faster with shortcuts</p>
          </div>
        </div>

        <div className="ml-11 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
            <span>Open Schedule Tab</span>
            <Badge variant="outline">Alt + 1</Badge>
          </div>
          <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
            <span>Open Subjects Tab</span>
            <Badge variant="outline">Alt + 2</Badge>
          </div>
          <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
            <span>Open Settings Tab</span>
            <Badge variant="outline">Alt + 3</Badge>
          </div>
          <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
            <span>Show All Shortcuts</span>
            <Badge variant="outline">Ctrl/Cmd + K</Badge>
          </div>
        </div>
      </Card>

      {/* Accessibility */}
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Accessibility Features</h3>
            <p className="text-sm text-muted-foreground">Customize for your needs</p>
          </div>
        </div>

        <div className="ml-11 space-y-3 text-sm">
          <p>Visit the Settings tab to adjust the interface for better accessibility:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>
              <strong>Text Size:</strong> Choose from 4 size levels (Small, Medium, Large, Extra Large)
            </li>
            <li>
              <strong>High Contrast:</strong> Increase contrast for better readability
            </li>
            <li>
              <strong>Reduced Motion:</strong> Minimize animations for those sensitive to movement
            </li>
          </ul>
        </div>
      </Card>
    </div>
  )
}
