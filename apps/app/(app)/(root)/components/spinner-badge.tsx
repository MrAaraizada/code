import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Spinner } from "@/registry/new-york-v4/ui/spinner"

export function SpinnerBadge() {
  return (
    <div className="flex items-center gap-2">
      <Badge>
        <Spinner />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner />
        Loading
      </Badge>
    </div>
  )
}

// Updated: 2026-01-21 00:38:24 - feat(apps/app): add spinner badge
