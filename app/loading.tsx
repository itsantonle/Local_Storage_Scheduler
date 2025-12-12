/**
 * Loading Component
 * Displays a loading state with a spinner
 */

import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <Spinner className="h-8 w-8 mx-auto text-primary" />
        <p className="text-sm text-muted-foreground">Loading your schedule...</p>
      </div>
    </div>
  )
}
