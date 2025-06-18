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
