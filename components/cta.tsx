import * as React from "react";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export function CTA({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section id="open-source" className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-full flex-col items-center justify-center gap-4 text-center">
        <h2
          className={`${inter.className} font-semibold text-2xl leading-[1.1] sm:text-2xl md:text-6xl uppercase`}
        >
          Smart Questions, Smarter Insights.
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Let&apos;s Try Now -{" "}
          <a href="/login" className="underline">
            Get Started
          </a>
          .{" "}
        </p>
      </div>
    </section>
  );
}
