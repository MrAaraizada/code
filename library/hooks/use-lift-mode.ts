import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

const configAtom = atomWithStorage<string[]>("lift-mode", [])

export function useLiftMode(name: string) {
  const [chunks, setChunks] = useAtom(configAtom)

  function toggleLiftMode(name: string) {
    setChunks((prev) => {
      return prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    })
  }

  return {
    isLiftMode: chunks.includes(name),
    toggleLiftMode,
  }
}

// Updated: 2026-01-20 23:51:17 - feat(library/hooks): add project configuration hooks
