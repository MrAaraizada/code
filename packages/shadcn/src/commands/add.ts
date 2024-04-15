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
