import { ReactNode } from "react";
import { cn } from "./Button";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const Card = ({ children, className, hoverEffect = true }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl bg-white border border-gray-200 p-6 shadow-sm",
        hoverEffect && "hover:shadow-md hover:scale-[1.02] transition-all duration-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export { Card };
