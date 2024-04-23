import { Registry } from "./schema";

export const registry: Registry = {
  "button": {
    name: "button",
    type: "component",
    description: "Displays a button or a component that looks like a button.",
    files: ["registry/default/ui/button.tsx"],
    dependencies: ["@radix-ui/react-slot"],
    registryDependencies: ["utils"]
  }
};
