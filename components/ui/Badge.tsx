import { ReactNode } from "react";
import { cn } from "./Button";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "gray";
  className?: string;
}

const Badge = ({ children, variant = "primary", className }: BadgeProps) => {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-accent/10 text-accent border-accent/20",
    accent: "bg-green-100 text-green-700 border-green-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold font-inter",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export { Badge };
