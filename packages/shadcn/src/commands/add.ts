export interface ComponentConfig {
  name: string;
  dependencies: string[];
  files: string[];
  registry: string;
}

export async function addComponent(name: string): Promise<void> {
  console.log(`Installing component: ${name}`);
  // Component installation logic
}

// Updated: 2026-01-21 00:12:08 - test(packages/shadcn): add CLI test command
