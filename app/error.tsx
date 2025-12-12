"use client"

/**
 * Error Boundary Component
 * Catches and displays errors gracefully
 */

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive mb-2">
            <AlertCircle className="h-6 w-6" />
            <CardTitle>Something went wrong</CardTitle>
          </div>
          <CardDescription>An unexpected error occurred in the application.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-md">
            <p className="text-sm font-mono text-muted-foreground break-words">{error.message || "Unknown error"}</p>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={reset} className="flex-1">
            Try Again
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()} className="flex-1">
            Reload Page
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
