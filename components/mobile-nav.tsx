"use client";

import { cn } from "../lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import Logo from "./logo";
import Link, { LinkProps } from "next/link";

function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <MobileLink
      href="/"
      className="flex items-center lg:hidden sm:block md:hidden"
      onOpenChange={setOpen}
    >
      <Logo className="dark:fill-white" />
    </MobileLink>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
export default MobileNav;
