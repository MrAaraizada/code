import { LucideProps } from "lucide-react";
import dynamic from "next/dynamic";

const icons = {
  ArrowRight: dynamic(() => import("lucide-react").then(mod => ({ default: mod.ArrowRight }))),
  Check: dynamic(() => import("lucide-react").then(mod => ({ default: mod.Check }))),
  ChevronDown: dynamic(() => import("lucide-react").then(mod => ({ default: mod.ChevronDown }))),
  X: dynamic(() => import("lucide-react").then(mod => ({ default: mod.X }))),
} as const;

export type IconName = keyof typeof icons;

interface IconProps extends LucideProps {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = icons[name];
  return <IconComponent {...props} />;
}
