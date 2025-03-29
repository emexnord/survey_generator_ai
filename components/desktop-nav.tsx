"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import ThemeSwitch from "./theme-changer";
import { usePathname } from "next/navigation";
import { useSession } from "@/providers/SessionProviderClient";
import { SignIn, SignOut } from "@/lib/auth-actions";

function DesktopNav() {
  const pathname = usePathname();

  const session = useSession();
  // console.log("session", session);
  return (
    <nav>
      <div className="md:flex gap-5">
        <div className="flex gap-2 pr-5 items-center">
          <div className="flex justify-center items-center pr-2 cursor-pointer">
            <ThemeSwitch />
          </div>
          {pathname === "/" ? (
            <Link href="/survey">
              <Button variant="outline">Try Gen</Button>
            </Link>
          ) : session == null ? (
            <Button type="submit" variant="outline" onClick={() => SignIn()}>
              Login
            </Button>
          ) : (
            <Button type="submit" variant="outline" onClick={() => SignOut()}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default DesktopNav;
