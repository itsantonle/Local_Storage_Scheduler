"use client"

import { AppProvider } from "@/contexts/app-context"
import { MainLayout } from "@/components/layout/main-layout"

export default function Page() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  )
}
