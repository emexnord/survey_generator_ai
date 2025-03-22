"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "../lib/utils";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { useTheme } from "next-themes";
import Logo from "./logo";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Features",
    href: "/#features",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
];

export function MainNav() {
  const { theme } = useTheme();

  return (
    <div className="mr-4 md:flex">
      <Link href="/" className="lg:mr-6 sm:mr-4 flex items-center gap-2">
        <Logo className="hidden lg:block md:block mt-1 fill-black dark:fill-white" />
      </Link>
      <NavigationMenu className="hidden lg:block md:block">
        <NavigationMenuList></NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
