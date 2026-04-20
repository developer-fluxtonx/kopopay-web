import React from "react";
import * as Icons from "lucide-react";

type IconName = keyof typeof Icons;

export function getIcon(name: string): React.ComponentType<any> {
  const key = name as IconName;
  // Fallback to a simple placeholder if icon not found
  return (Icons[key] as React.ComponentType<any>) ?? Icons.Package;
}

export default getIcon;
