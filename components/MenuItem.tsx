"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";

interface MenuItemProps {
  onClick?: () => void;
  label: string;
  icon?: LucideIcon;
  color?: string; // Tailwind color class or hex
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
  icon: Icon,
  color = "text-black",
}) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center px-4 py-2 cursor-pointer rounded-md text-sm hover:bg-neutral-100 transition font-medium"
    >
      {Icon && <Icon className={`mr-2 h-4 w-4 ${color}`} />}
      <p className={`leading-none ${color}`}>{label}</p>
    </div>
  );
};

export default MenuItem;
