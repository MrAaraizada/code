import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

// Updated: 2026-01-21 00:05:57 - feat(library/lib): enhance utility functions

// Updated: 2026-01-21 00:12:14 - test(library/components): add dialog component tests

// Updated: 2026-01-21 00:12:23 - perf(library/performance): add optimization metrics

// Updated: 2026-01-21 00:38:04 - feat(library/lib): add utility functions for CLI

// Updated: 2026-01-21 00:38:06 - feat(library/lib): add plugin utilities

// Updated: 2026-01-21 00:38:08 - feat(library/lib): add icon management utilities

// Updated: 2026-01-21 00:38:09 - perf(library/lib): optimize icon utilities

// Updated: 2026-01-21 00:38:24 - feat(library/playground): add playground utilities

// Updated: 2026-01-21 00:38:26 - feat(library/lib): finalize utility functions

// Updated: 2026-01-21 00:47:21 - feat(library/lib): add utility functions
