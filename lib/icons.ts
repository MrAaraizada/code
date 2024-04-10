export const iconMap = {
  "arrow-right": "\e001",
  "arrow-left": "\e002",
  "chevron-down": "\e003",
  "close": "\e005",
} as const;

export type IconName = keyof typeof iconMap;

export function getIconCode(name: IconName): string {
  return iconMap[name];
}
