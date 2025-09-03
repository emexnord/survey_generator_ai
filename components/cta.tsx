"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const words = ["Questions", "Insights"];

export default function OpenSourceSection({
  className,
}: {
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500); // changes every 2.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="open-source"
      className={cn("container py-8 md:py-12 lg:py-24", className)}
    >
      <div className="mx-auto flex max-w-xl flex-col  gap-4">
        <h2
          className={`${inter.className} font-semibold text-2xl leading-[1.1] sm:text-2xl md:text-6xl uppercase flex gap-3`}
        >
          <span>Smarter</span>
          <span className="relative h-[60px] inline-block">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute left-0 right-0"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h2>
      </div>
    </section>
  );
}
