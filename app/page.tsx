import React from "react";
import { BentoDemo } from "../components/bento-features";
import GridPattern from "../components/ui/animted-grid";
import { CTA } from "../components/cta";
import Hero from "@/components/Hero";
import FloatingInput from "@/components/floating-input";

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="relative w-full h-screen">
        <GridPattern
          width={70} // Set horizontal line spacing
          height={70} // Set vertical line spacing
        />

        <section className="relative w-full h-[85dvh] z-10 pl-5">
          <Hero />
        </section>
      </div>

      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-10"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h3 className="text-center text-sm font-semibold text-white pb-2">
            FEATURES
          </h3>
        </div>
        <BentoDemo />
      </section>

      <CTA />
      <FloatingInput />
    </div>
  );
}
