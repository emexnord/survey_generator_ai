import { useId } from "react";
import { cn } from "../../lib/utils";

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: string;
  className?: string;
  [key: string]: unknown;
}

export function GridPattern({
  width = 40,
  height = 40,
  x = 0,
  y = 0,
  strokeDasharray = "0",
  className,
  ...props
}: GridPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-none",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          {/* Horizontal Line */}
          <line
            x1="0"
            x2={width}
            y1="0.5"
            y2="0.5"
            className="stroke-gray-200 dark:stroke-gray-900"
            strokeWidth="1"
            strokeDasharray={strokeDasharray}
          />
          {/* Vertical Line */}
          <line
            x1="0.5"
            x2="0.5"
            y1="0"
            y2={height}
            className="stroke-gray-200 dark:stroke-gray-900"
            strokeWidth="1"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default GridPattern;
