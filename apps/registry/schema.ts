export interface RegistryEntry {
  name: string;
  type: "component" | "block" | "example";
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: string[];
  source?: string;
  category?: string;
  subcategory?: string;
}

export interface Registry {
  [key: string]: RegistryEntry;
}
