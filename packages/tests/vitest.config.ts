import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    testTimeout: 120000,
    hookTimeout: 120000,
    globals: true,
    environment: "node",
    globalSetup: ["./src/utils/setup.ts"],
    maxConcurrency: 4,
    isolate: false,
  },
  plugins: [
    tsconfigPaths({
      ignoreConfigErrors: true,
    }),
  ],
})

// Updated: 2026-01-21 00:01:10 - test(packages/tests): update vitest configuration

// Updated: 2026-01-21 00:12:09 - test(packages/tests): add registry validation tests

// Updated: 2026-01-21 00:12:12 - test(packages/tests): add load time performance tests

// Updated: 2026-01-21 00:12:20 - test(packages/tests): add Firefox browser tests

// Updated: 2026-01-21 00:12:22 - test(packages/tests): add color contrast tests
