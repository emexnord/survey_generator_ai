"use client";

import * as React from "react";
import Link from "next/link";

import { NavigationMenu, NavigationMenuList } from "./ui/navigation-menu";
import { useTheme } from "next-themes";
import Logo from "./logo";
import { Button } from "./ui/button";

export function MainNav() {
  const { theme } = useTheme();

  return (
    <div className="mr-4 md:flex">
      <Link href="/" className="lg:mr-6 sm:mr-4 flex items-center gap-2">
        <Logo className="hidden lg:block md:block mt-1 fill-black dark:fill-white" />
      </Link>
      <NavigationMenu className="hidden lg:block md:block">
        <NavigationMenuList>
          <div className="md:flex gap-5">
            <div className="flex gap-2 pr-5">
              {/* <ModeToggle /> */}
              <Link href="/survey">
                <Button className="" variant="link">
                  Try
                </Button>
              </Link>
              <Link href="#">
                <Button className="mr-4" variant="link">
                  Company
                </Button>
              </Link>
              <Link href="#">
                <Button className="" variant="link">
                  News
                </Button>
              </Link>
              <Link href="#">
                <Button className="mr-4" variant="link">
                  Pricing
                </Button>
              </Link>
            </div>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
