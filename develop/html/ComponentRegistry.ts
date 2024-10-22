export class ComponentRegistry {
  private static components = new Map();
  static register(name: string, component: any) {}
  static get(name: string) { return null; }
}
