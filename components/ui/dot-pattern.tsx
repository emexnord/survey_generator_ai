"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";

export function DotPatternBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full fill-none">
      <DotPattern
        cr={1.5}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  );
}
