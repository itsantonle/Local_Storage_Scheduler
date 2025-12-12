"use client"

/**
 * Main Layout Component
 * Top-level layout that orchestrates all major sections of the app
 */

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubjectsTab } from "@/components/subjects/subjects-tab"
import { ScheduleTab } from "@/components/schedule/schedule-tab"
import { SettingsTab } from "@/components/settings/settings-tab"
import { HowToUseTab } from "@/components/guide/how-to-use-tab"
import { Header } from "@/components/layout/header"
import { DataManagementBanner } from "@/components/layout/data-management-banner"
import { KeyboardShortcuts } from "@/components/layout/keyboard-shortcuts"
import { Calendar, BookOpen, Settings, HelpCircle } from "lucide-react"

export function MainLayout() {
  const [activeTab, setActiveTab] = useState("schedule")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <DataManagementBanner />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px] mb-6">
            <TabsTrigger value="schedule" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="subjects" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Subjects</span>
            </TabsTrigger>
            <TabsTrigger value="guide" className="gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Guide</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="mt-0">
            <ScheduleTab />
          </TabsContent>

          <TabsContent value="subjects" className="mt-0">
            <SubjectsTab />
          </TabsContent>

          <TabsContent value="guide" className="mt-0">
            <HowToUseTab />
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </main>

      <KeyboardShortcuts onTabChange={setActiveTab} />
    </div>
  )
}
