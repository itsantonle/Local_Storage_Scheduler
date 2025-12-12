/**
 * Logo Component
 * Bubbly animated SVG logo for the app
 */

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {/* Bubbly SVG Logo */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Main bubble */}
          <circle cx="24" cy="24" r="20" fill="hsl(var(--primary))" className="animate-pulse" />

          {/* Small bubbles */}
          <circle cx="14" cy="14" r="6" fill="hsl(var(--primary))" opacity="0.8" />
          <circle cx="34" cy="16" r="5" fill="hsl(var(--primary))" opacity="0.7" />
          <circle cx="32" cy="34" r="4" fill="hsl(var(--primary))" opacity="0.6" />

          {/* Calendar icon inside */}
          <rect x="16" y="18" width="16" height="14" rx="2" fill="white" opacity="0.9" />
          <line x1="19" y1="16" x2="19" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="29" y1="16" x2="29" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="23" x2="30" y2="23" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <line x1="18" y1="27" x2="26" y2="27" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        </svg>

        {/* Floating mini bubble animation */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-bounce" />
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">Local Storage Scheduler</h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-0.5">Your schedule, your data, your control</p>
      </div>
    </div>
  )
}
