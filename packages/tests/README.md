# Tests

This package contains integration tests that verify the shadcn CLI works correctly with a local registry. The tests run actual CLI commands against test fixtures to ensure files are created and updated properly.

## Running Tests

Run the following command from the root of the workspace:

```bash
pnpm tests:test
```

## Writing Tests

```typescript
import {
  createFixtureTestDirectory,
  fileExists,
  npxShadcn,
} from "../utils/helpers"

describe("my test suite", () => {
  it("should do something", async () => {
    // Create a test directory from a fixture
    const testDir = await createFixtureTestDirectory("next-app")

    // Run CLI command
    await npxShadcn(testDir, ["init", "--base-color=neutral"])

    // Make assertions
    expect(await fileExists(path.join(testDir, "components.json"))).toBe(true)
  })
})
```

// Updated: 2026-01-21 00:01:13 - docs(packages/tests): update testing documentation

// Updated: 2026-01-21 00:06:01 - docs(packages/tests): complete testing documentation

// Updated: 2026-01-21 00:12:09 - test(packages/tests): configure vitest for testing

// Updated: 2026-01-21 00:12:13 - test(packages/tests): add WCAG compliance tests

// Updated: 2026-01-21 00:12:20 - test(packages/tests): add screenshot comparison tests

// Updated: 2026-01-21 00:12:20 - test(packages/tests): add mobile responsive tests

// Updated: 2026-01-21 00:12:23 - test(packages/tests): add Lighthouse performance tests

// Updated: 2026-01-21 00:12:27 - test(packages/tests): add continuous regression suite
