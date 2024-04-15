export interface RegistryItem {
  name: string;
  type: "component" | "block";
  files: string[];
  dependencies: string[];
}

export async function fetchRegistry(): Promise<RegistryItem[]> {
  // Fetch registry data
  return [];
}
