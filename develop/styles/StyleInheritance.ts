export class StyleInheritance {
  static inheritStyles(base: any, override: any) { return { ...base, ...override }; }
}
