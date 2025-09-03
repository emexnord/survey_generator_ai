import type { IconType } from "react-icons/lib";
import { cn } from "../lib/utils";
import type { ReactNode } from "react";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[24rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  cta,
}: {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: IconType;
  description: string;
  href?: string;
  cta?: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl cursor-pointer max-w-[400px]",
      "bg-card border border-border/50 backdrop-blur-sm",
      "shadow-lg hover:shadow-2xl transition-all duration-500 ease-out",
      "transform-gpu hover:scale-[1.02] hover:-translate-y-2",
      // Enhanced hover effects with gradient overlay
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-accent/5 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
      className
    )}
  >
    {/* Background with enhanced overlay */}
    <div className="absolute inset-0 overflow-hidden">
      {background}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/40 group-hover:from-background/70 group-hover:via-background/50 group-hover:to-background/30 transition-all duration-500" />
    </div>

    {/* Content container with improved spacing and typography */}
    <div className="relative z-10 flex flex-col justify-between h-full p-8">
      {/* Icon with enhanced animation */}
      <div className="flex-shrink-0 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <Icon className="relative h-14 w-14 text-primary transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-6 drop-shadow-lg" />
        </div>
      </div>

      {/* Text content with improved hierarchy */}
      <div className="flex-grow">
        <h3 className="font-serif text-2xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-base group-hover:text-foreground/80 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* CTA with enhanced styling */}
      {cta && (
        <div className="mt-6 pt-4 border-t border-border/30">
          <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-accent transition-colors duration-300">
            {cta}
            <svg
              className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      )}
    </div>

    {/* Subtle border glow effect */}
    <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/20 transition-all duration-500" />
  </div>
);

export { BentoCard, BentoGrid };
